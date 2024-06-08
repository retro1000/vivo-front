import React from 'react';
import { useState, useEffect, useRef } from "react";

import axios from 'axios'

import { Checkbox, MenuItem, InputLabel, Select, FormControl, Stack, Box, styled, Tabs, Tab, Typography, TextField, Button, Grid, IconButton, Icon } from "@mui/material";
import { LoadingButton } from '@mui/lab';
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import { ReactQuillEditior, FileUpload, MultiFileUpload, FormDialog, Breadcrumb, SimpleCard, CustomExpansionPanel, SearchableSelectMultiple, CustomVariationExpansionPanel } from "app/components";
// import { CustomExpansionPanel } from "app/components";

import { useNotistack } from 'app/hooks/useNotistack';
import { useBase64 } from 'app/hooks/useBase64';
import { useAxios } from 'app/hooks/useAxios';

import { backendApi } from 'config';

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));


function CustomTabPanelLinkedProducts(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


function CustomTabPanelVariations(props) {

    const [bulkOption, setBulkOption] = useState('');
    const [bulkOptionFormOn, setBulkOptionFormOn] = useState(false);
    const [variationErrors, setVariationErrors] = useState({})
    const [loading, setLoading] = useState(false);
    
    const fields = [
      {key:"varImage", id:"variationImage", type:"file", value: ""},
      {key:"cost", id:"unitCost", type:"number", label:"Unit cost", placeholder:"Enter unit cost", value: ""},
      {key:"price", id:"unitPrice", type:"number", label:"Unit price", placeholder:"Enter unit price", value: ""},
      {key:"discount", id:"discount", type:"number", label:"Discount", placeholder:"Enter discount", value: ""},
      {key:"availStock", id:"availableStockAmount", type:"number", label:"Available stock amount", placeholder:"Enter available stock amont", value: ""},
      {key:"penStock", id:"pendingStockAmount", type:"number", label:"Pending stock amount", placeholder:"Enter pending stock amont", value: ""},
      {key:"orderType", id:"backendOrderType", type:"radio", label:"Backend order type", value: "ALLOWED_ALL", options:[{value:'ALLOWED_ALL', label:"Allowed"}, {value:'ALLOWED_ADMIN', label:"Admin only"}, {value:'NOT_ALLOWED', label:"Not allowed"}]},
    ];

    const { api, FileToBase64, variationIds, setVariationIds, triggerNotifications, updateVariations, setUpdateVariations, updateVariableAttributeList, attributes, variables, setVariables, variationIdentifier, setVariationIdentifier, variableAttributeList, value, index, variations, setVariations} = props;

    const generateVariations = (list) => {
      const generate = (lists) => {
        if(lists.length === 1) {
          return lists[0].map(item => [item]);
        }else{
          const firstList = lists[0];
          const remainingLists = lists.slice(1);
          const combinationsOfRemaining = generate(remainingLists);
          const result = [];
          
          for(const item of firstList) {
            for(const combination of combinationsOfRemaining) {
              const newCombination = [...combination];
              newCombination.push(item);
              result.push(newCombination);
            }
          }
        
          return result;
        }
      }

      const val = list.length===0 ? [] : list.filter(val => val.state === 'update' && val.attributeVariables.length !== 0);
      const sets = (val!==undefined && Array.isArray(val) && val.length!==0 ? val.map(itm=>(itm.attributeVariables.map(lst=>({attributeId: itm.attributeId, attributeVariableId: lst.variableId})))) : []);
      if(sets.length===0) return [];
      return generate(sets);
    }

    const handleGenerateVariations = () => {
      const combinations = generateVariations(variableAttributeList);
      if(combinations.length===0) setVariations([]);
      else{
        const newList = [];
        combinations.forEach((combination, index)=>{
          const newIdentifier = variationIdentifier + index + 1;
          newList.push(
            {
              variationId: undefined,
              variationIdentifier: newIdentifier,
              state: 'create',
              variationAttributes: combination,
              unitCost: 0,
              unitPrice: 0,
              availableStockAmount: 0,
              pendingStockAmount: 0,
              discount: 0,
              backendOrderType: 'ALLOWED_ALL',
              variationImage: '',
              checked: false
            }
          );
        });
        setVariationIdentifier(variationIdentifier+combinations.length);
        setVariations(newList);
      }
      setUpdateVariations([])
    }

    const addVariationManual = () => {
      if(variableAttributeList.length>0){
        const newList = [...variations];
          const newIdentifier = variationIdentifier + 1;
          newList.unshift(
            {
              variationId: undefined,
              variationIdentifier: newIdentifier,
              state: 'create',
              variationAttributes: variableAttributeList.filter(itm=>itm.state==='update' && itm.attributeVariables.length>0)?.map(itm=>({attributeId: itm.attributeId, attributeVariableId: undefined})),
              unitCost: 0,
              unitPrice: 0,
              availableStockAmount: 0,
              pendingStockAmount: 0,
              discount: 0,
              backendOrderType: 'ALLOWED_ALL',
              variationImage: '',
              checked: false
            }
          );
        setVariationIdentifier(variationIdentifier+1);
        setVariations(newList);
      }
    }

    const upsertVariations = async () => {
      const handleSuccessfull = (results, messages) => {
        const newList = [...variations];

        results.forEach(result=>{
          const variation = newList.find(itm=>itm.variationIdentifier===result.variationIdentifier)
          if(variation){
            messages.push({text: `Variation with variation id ${result.variationId} is ${variation.state==='create'?'created':'update'}.`, variant: 'success'})
            variation.variationId = result.variationId
            variation.state = 'update'
          }
        })
        setVariations(newList)
        setUpdateVariations([])
      }

      const handleErrors = (errors, messages) => {
        const newObj = {...variationErrors}

        Object.keys(errors).forEach(key=>{
          const error = errors[key]
          if(typeof error==='string') messages.push({text: error, variant: 'error'})
          if(typeof error==='object'){
            const {variationAttributes, variationImage, ...rest} = error
            if(variationAttributes!==undefined) messages.push({text: variationAttributes, variant: 'error'})
            if(variationImage!==undefined) messages.push({text: variationImage, variant: 'error'})
            if(rest!==undefined){
              messages.push({text: `Invalid inputs entered in variation #${key}.`, variant: 'error'})
              newObj[key] = rest
            }
          }
        })
        setVariationErrors(newObj)
        setUpdateVariations([])
      }

      const convertVariations = async (variations, state, excludeKeys) => {
        return Promise.all(
          variations
            .filter(itm => itm.state === state)
            .map(async lst => {
              try {
                const result = await Object.keys(lst).reduce(async (accPromise, key) => {
                  const acc = await accPromise;
                  if (!excludeKeys.includes(key)) {
                    if (key === 'variationImage') {
                      acc[key] = await FileToBase64(lst[key]);
                    } else {
                      acc[key] = lst[key];
                    }
                  }
                  return acc;
                }, Promise.resolve({}));
                return result;
              } catch (error) {
                return null;
              }
            })
        ).then(results => results.filter(result => result !== null));
      };

      if(updateVariations.length!==0){
        const requests = [
          {
            url: '/product/variation/create',
            method: 'post',
            data: {variations: await convertVariations(updateVariations, 'create', ['state', 'expanded', 'checked', 'variationId'])},
            handler: response => {
                      if(response.status===201){
                        handleSuccessfull(response.data.result, messages)
                        const newList = [...variationIds]
                        response.result.forEach(itm=>newList.push(itm.variationId))
                        setVariationIds(newList)
                      }
                    },
            error: error => {
                      if(error.response.status===400 || error.response.status===409){
                          if(typeof error.response.data==='string') messages.push({text: error.response.data, variant: 'error'})
                          if(typeof error.response.data==='object' && error.response.data.errors){
                            handleErrors(error.response.data.errors, messages)
                          }
                          if(typeof error.response.data==='object' && error.response.data.result){
                            handleSuccessfull(error.response.data.result, messages)
                          }
                      }
                      if(error.response.status===500) messages.push({text:'Error occured during creating variations.', variant: 'error'})
                  }
          },
          {
            url: '/product/variation/update',
            method: 'post',
            data: {variations: await convertVariations(updateVariations, 'update', ['state', 'expanded', 'checked'])},
            handler: response => {
                    if(response.status===200) handleSuccessfull(response.data.result, messages)
                  },
            error: error => {
                    if(error.response.status===400 || error.response.status===409){
                      if(typeof error.response.data==='string') messages.push({text: error.response.data, variant: 'error'})
                      if(typeof error.response.data==='object' && error.response.data.errors){
                        handleErrors(error.response.data.errors, messages)
                      }
                      if(typeof error.response.data==='object' && error.response.data.result){
                        handleSuccessfull(error.response.data.result, messages)
                      }
                    }
                    if(error.response.status===500) messages.push({text:'Error occured during updating variations.', variant: 'error'})
                  }
          }
        ]

        const messages = []

        try{
          setLoading(true)
          const axiosRequests = requests.map(request=>{
            if(request.data!==undefined && request.data.variations.length>0){
              return api({
                method: request.method,
                url: request.url,
                data: request.data
              })
              .then(request.handler)
              .catch(request.error)
            }
            return null;
          })
          ?.filter(axiosRequest=>axiosRequest!==null);

          await Promise.all(axiosRequests);
        }catch(error){

        }finally{
          setLoading(false)
          if(messages.length!==0) triggerNotifications(messages, 50)
        }        
      }
    }
    
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Stack spacing={2}>
                {
                  (
                    updateVariableAttributeList.length === 0 &&
                    variableAttributeList.length!==0 && 
                    (() => {
                      const val = variableAttributeList.filter(val => val.state === 'update' && val.attributeVariables.length !== 0);
                      return val!==undefined && Array.isArray(val) && val.length!==0;
                    })()
                  ) ?
                  (
                    <React.Fragment>
                      <Typography>Generate all possible variations or add variations manually.</Typography>
                      <Grid sx={{display: 'flex', alignContent: 'center', alignItems: 'center', gap: '0.7em'}}>
                        <Button variant="contained" color="primary" onClick={handleGenerateVariations} >Generate variations</Button>
                        <Button variant="contained" color="primary" onClick={addVariationManual}>Add manually</Button>
                        <FormControl sx={{width: '220px'}} disabled={variations.filter(val=>val.checked).length===0}>
                          <InputLabel id="bulk-options">Bulk options</InputLabel>
                            <Select
                              // size='small'
                              labelId='bulk-options'
                              value={bulkOption}
                              label='bulk-options'
                              onChange={(event)=>{
                                setBulkOption(event.target.value);
                                setBulkOptionFormOn(true)
                              }}
                            >
                              <MenuItem value='cost'>Add unit cost</MenuItem>
                              <MenuItem value='price'>Add unit price</MenuItem>
                              <MenuItem value='discount'>Add discount</MenuItem>
                              <MenuItem value='availStock'>Add available stock amonut</MenuItem>
                              <MenuItem value='penStock'>Add pending stock amount</MenuItem>
                              <MenuItem value='varImage'>Add variation image</MenuItem>
                              <MenuItem value='orderType'>Update backend order type</MenuItem>
                              <MenuItem value='all'>Update all</MenuItem>
                            </Select>
                        </FormControl>
                      </Grid>
                      <FormDialog
                        open={bulkOptionFormOn}
                        title="Bulk Options"
                        message={"Assign values to selected variations at once"}
                        fields={(() => {
                          if(bulkOption==='all') return fields;
                          else return fields.filter(itm=>itm.key===bulkOption)
                        })()}
                        setOpen={setBulkOptionFormOn}
                        setVariations={(val) => {
                          const newList = [...variations]
                          newList.filter(lst=>lst.checked)?.forEach(lst=>{
                            for(let key in val){
                              lst[key] = val[key]
                            }
                          });

                          setVariations(newList);
                          setBulkOption('')
                        }}
                      />
                      <CustomVariationExpansionPanel variationErrors={variationErrors} variableAttributeList={variableAttributeList} updateVariations={updateVariations} setUpdateVariations={setUpdateVariations} attributes={attributes} variables={variables} list={variations} setVariations={setVariations} isDeleteOn={true}></CustomVariationExpansionPanel>
                      {/* <Button sx={{width: '160px'}} variant="contained" color="primary" disabled={updateVariations.length === 0} startIcon={<Icon sx={{fontSize: '0.75em'}}>save</Icon>} onClick={upsertVariations}>Save variations</Button> */}
                      <LoadingButton
                        sx={{width: '160px'}}
                        loading={loading}
                        loadingPosition="start"
                        startIcon={<Icon sx={{fontSize: '0.75em'}}>save</Icon>}
                        variant="contained"
                        color="primary"
                        disabled={updateVariations.length === 0}
                        onClick={upsertVariations}
                      >
                        Save variations
                      </LoadingButton>
                    </React.Fragment>
                  ) :
                  (
                    <Grid sx={{display: 'flex', width: '100%', height: '40dvh', flexDirection: 'column', gap: '0.8em'}} alignItems={'center'} justifyContent={'center'}>
                      <Icon sx={{fontSize: '5.5em', color: 'gray', fontWeight: 'small'}}>info_outline</Icon>
                      <Typography>{`${updateVariableAttributeList.length!==0 ? 'Save unsaved attribute changes' : 'Add some attributes'} in the Attributes tab to generate variations.`}</Typography>
                    </Grid>
                  )
                }
            </Stack>
          </Box>
        )}
      </div>
    );
  }

  function CustomTabPanelAttributes(props) {

    const CustomTextField = styled(TextField)({
      '& .MuiInputBase-root': {
        height: '35px', // Set the desired height of the input
      },
      '& .MuiInputLabel-root': {
        lineHeight: '35px', // Align the label properly
      },
      '& .MuiOutlinedInput-input': {
        padding: '8.5px 14px', // Adjust padding to fit the height
      },
      '& .MuiAutocomplete-endAdornment': {
        top: 'calc(50% - 14px)', // Center the adornment (dropdown arrow)
      },
      '& .MuiFormLabel-root.MuiInputLabel-root.MuiInputLabel-formControl.MuiInputLabel-animated.MuiInputLabel-shrink.MuiInputLabel-sizeMedium.MuiInputLabel-outlined.MuiFormLabel-colorPrimary.MuiFormLabel-filled.MuiInputLabel-root.MuiInputLabel-formControl.MuiInputLabel-animated.MuiInputLabel-shrink.MuiInputLabel-sizeMedium.MuiInputLabel-outlined.css-1ud382n-MuiFormLabel-root-MuiInputLabel-root': {
          top: '-4px'
      },
      '& .MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputAdornedEnd.MuiAutocomplete-input.MuiAutocomplete-inputFocused.css-136wu1w-MuiInputBase-input-MuiOutlinedInput-input': {
          marginTop: '-8px'
      }
    });

    const { api, triggerNotifications, updateVariableAttributeList, setUpdateVariableAttributeList, variables, setVariables, setAttributeIdentifier, attributeIdentifier, value, index, variableAttributeList, attributes, selectedAttributes, setSelectedAttributes, setVariableAttributeList } = props;
    const [loading, setLoading] = useState(false)

    const editVariableAttributeList = (index, val, key) => {
      setVariableAttributeList(prevList => {
        const newList = [...prevList]; 
        newList[index][key] = val; 
        return newList;  
      });
    }

    const removeFromVariableAttributeList = (id) => {
      const newList = [...variableAttributeList];
      setVariableAttributeList(newList.filter(lst=>lst.identifier!==id));
    }

    const addNewVariableAttribute = () => {
        const newList = [...variableAttributeList];
        setAttributeIdentifier(attributeIdentifier+1)
        newList.unshift({attributeId: undefined, attributeName: '', identifier: attributeIdentifier, state: 'create', attributeVariables: '', expanded: true})
        setVariableAttributeList(newList);
    }

    const addExistingAttribute = () => {
      const addAttributeVariable = (attribute) => {
        if(attribute){
          const list = [...variableAttributeList]
          setAttributeIdentifier(attributeIdentifier+1)
          list.unshift({attributeId: attribute.attributeId, attributeName: attribute.attributeName, identifier: attributeIdentifier, state: 'update', attributeVariables: [], expanded: true})
          setVariableAttributeList(list)
        }
      }

      let attribute = variables.length!==0 ? variables.find(itm=>itm.attributeId===selectedAttributes.value) : undefined

      if(!attribute){
        api.get(`/product/attribute/get/${selectedAttributes.value}`)
          .then((res) => {
            if(res.status===200){
              const newList = [...variables]
              attribute = {attributeId: res.data.attributeId, attributeName: res.data.attributeName, variableList: res.data.attributeVariables.map(itm=>({variableId: itm.attributeVariableId, variableName: itm.attributeVariableName}))}
              newList.push(attribute)
              setVariables(newList)
              addAttributeVariable(attribute)
            }
          })
          .catch((err) => {
            if(err.response.status===500) triggerNotifications([{text: 'Internal server error. Please try again!!!', variant:'error'}])
          })
      }else{
        addAttributeVariable(attribute)
      }
    }

    const upsertAttributes = () => {
      const handleSuccessfull = (results, messages) => {
        const newList = [...variableAttributeList];
        const newVar = [...variables]

        results.forEach(result=>{
          const attribute = newList.find(itm=>itm.identifier===parseInt(result.identifier))
          if(attribute){
            messages.push({text: `${attribute.attributeName} attribute is created.`, variant: 'success'})
            attribute.attributeId = result.attributeId
            attribute.attributeVariables = result.attributeVariables.map(itm=>{
              messages.push({text: `${itm.attributeVariableName} attribute variable is added to the ${attribute.attributeName} attribute.`, variant: 'success'})
              return {variableId: itm.attributeVariableId, variableName: itm.attributeVariableName}
            })
            attribute.state = 'update'
          }
          newVar.push({attributeId: result.attributeId, attributeName: result.attributeName, variableList: result.attributeVariables.map(itm=>({variableId: itm.attributeVariableId, variableName: itm.attributeVariableName}))})
        })
        setVariables(newVar)
        setVariableAttributeList(newList)
        setUpdateVariableAttributeList([])
      }

      if(updateVariableAttributeList.length!==0){
        const newList = updateVariableAttributeList
            .filter(itm=>itm.state==='create')
            ?.map(itm=>({attribute: itm.attributeName, identifier: itm.identifier, variables: itm.attributeVariables}));

        const messages = []
        newList.length!==0 && axios.post(`${backendApi}/product/attribute/create`, newList)
          .then((res) => {
            if(res.status===201){
              handleSuccessfull(res.data.result, messages)
            }
          })
          .catch((err) => {
            if(err.response.status===400 || err.response.status===409){
              if(typeof err.response.data==='string') messages.push({text: err.response.data, variant: 'error'})
              if(typeof err.response.data==='object' && err.response.data.errors){
                const errors = err.response.data.errors;
                Object.keys(errors).forEach(key=>{
                  if(errors[key].attribute!==undefined) messages.push({text: errors[key].attribute[0], variant: 'error'})
                  if(errors[key].variables!==undefined) errors[key].variables.forEach(val=>messages.push({text: val, variant: 'error'}))
                })
              }
              if(typeof err.response.data==='object' && err.response.data.result){
                handleSuccessfull(err.response.data.result, messages)
              }
            }
          })
          .finally(() => {
            if(messages.length!==0) triggerNotifications(messages, 50)
          })
      }
    }

    const getOptions = () => {
      const newList = variableAttributeList.filter(val=>val.state==='update')?.map(val=>val.attributeId)
      return attributes.filter(itm=>(!newList.includes(itm.value)))
    }

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Stack spacing={2}>
              <Stack spacing={2}>
                <Typography>Create new attribute with variables for the product or find existing attribute and customize existing variables in it for the product.</Typography>
                <Grid sx={{display: 'flex', alignContent: 'center', alignItems: 'center', gap: '0.7em'}}>
                  <SearchableSelectMultiple label={"Attributes"} multiple={false} options={getOptions()} setSelectedValues={setSelectedAttributes} selectedValues={selectedAttributes} sx={{width: '20%', maxWidth: '200px', minWidth: '150px'}}></SearchableSelectMultiple>
                  <IconButton className="button" color="primary" aria-label="Add existing attribute" disabled={selectedAttributes===null || selectedAttributes.length===0} onClick={addExistingAttribute}>
                    <Icon>add_box</Icon>
                  </IconButton>
                  <Button variant="contained" color="primary" onClick={addNewVariableAttribute}>Create new attribute</Button>
                </Grid>
              </Stack>
              <CustomExpansionPanel updateVariableAttributeList={updateVariableAttributeList} setUpdateVariableAttributeList={setUpdateVariableAttributeList} removeFromVariableAttributeList={removeFromVariableAttributeList} variables={variables} editVariableAttributeList={editVariableAttributeList} list={variableAttributeList} isDeleteOn = {true}></CustomExpansionPanel>
              {/* <Button sx={{width: '160px'}} variant="contained" color="primary" startIcon={<Icon sx={{fontSize: '0.75em'}}>save</Icon>} disabled={updateVariableAttributeList.length === 0} onClick={upsertAttributes}>Save attributes</Button> */}
              <LoadingButton
                  sx={{width: '160px'}}
                  loading={loading}
                  loadingPosition="start"
                  startIcon={<Icon sx={{fontSize: '0.75em'}}>save</Icon>}
                  variant="contained"
                  color="primary"
                  disabled={updateVariableAttributeList.length === 0}
                  onClick={upsertAttributes}
                >
                  Save attributes
              </LoadingButton>
            </Stack>
          </Box>
        )}
      </div>
    );
  }
  
  // Accessibility Props
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const SmallCheckbox = styled(Checkbox)(({ theme }) => ({
    padding: '5px', // Adjust the padding as needed
    '& .MuiSvgIcon-root': {
      fontSize: '16px', // Adjust the icon size as needed
    },
  }));

function UpsertProduct() {

    const [value, setValue] = useState(0);

    const [attributes, setAttributes] = useState([]);
    
    const [attributeIdentifier, setAttributeIdentifier] = useState(1);
    const [variationIdentifier, setVariationIdentifier] = useState(1);

    // const [variableAttributeList, setVariableAttributeList] = useState([{attributeId: 2, attributeName: 'Size', identifier: 1, state: 'update', attributeVariables: [], expanded: false}, {attributeId: 1, attributeName: 'Color', identifier: 2, state: 'update', attributeVariables: [{variableId: 1, variableName: 'Red'}], expanded: false}]);
    const [variableAttributeList, setVariableAttributeList] = useState([]);
    const [selectedAttributes, setSelectedAttributes] = useState(null);

    const [variables, setVariables] = useState([]);

    const [variations, setVariations] = useState([])

    // const [categories, setCategories] = useState([{id:1, value: 'Phone', subCategories: [{id:1, value: 'iPhone 7'}, {id:2, value: 'iPhone 8'}]}, {id:2, value: 'air pod', subCategories: [{id:3, value: 'air pod pro'}]}]);
    const [categories, setCategories] = useState([]);

    const [selectedCategories, setSelectedCategories] = useState([]);

    const [productImages, setProductImages] = useState([]);

    const [productImage, setProductImage] = useState('')

    const [updateVariableAttributeList, setUpdateVariableAttributeList] = useState([])

    const [updateVariations, setUpdateVariations] = useState([])

    const [productTitle, setProductTitle] = useState('')

    const [productSubTitle, setProductSubTitle] = useState('')

    const [productDescription, setProductDescription] = useState('')

    const [productShortDescription, setProductShortDescription] = useState('')

    const [variationIds, setVariationIds] = useState([])

    const [productErrors, setProductErrors] = useState({})

    const { triggerNotifications } = useNotistack()
    const { FileToBase64 } = useBase64()
    const { api } = useAxios()

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
      const getAttributes = async () => {
        await api.get('/product/attribute/view')
          .then((res) => {
            if(res.status===200) setAttributes(res.data.map(itm=>({label: itm.attributeName, value: itm.attributeId})))
          })
          .catch((err) => {

          })
      }

      const getCategories = async () => {
        await api.get('/category/view')
          .then((res) => {
            if(res.status===200) setCategories(res.data.map(itm=>({id: itm.categoryId, value: itm.categoryName, subCategories: itm.subCategories.map(val=>({id: val.subCategoryId, value: val.subCategoryName}))})))
          })
          .catch((err) => {

          })
      }

      getAttributes()
      getCategories()

    }, [])

    const upsertProduct = async () => {

      const formData = new FormData()
      formData.append('productImage', productImage)
      productImages.forEach(image => formData.append('otherImages', image))
      formData.append('data', JSON.stringify({
        productTitle: productTitle,
        productSubTitle: productSubTitle,
        productShortDescription: productShortDescription,
        productDescription: productDescription,
        categories: selectedCategories,
        variations: variationIds
      }))
      
      const messages = []
      productImage!=='' && await axios.api('product/create', formData, {
        headers:{
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((res) => {
          if(res.status===201) messages.push({text: res.data, variant: 'success'})
        })
        .catch((err) => {
          if(err.response.status===500) messages.push({text: err.response.data, variant: 'error'})
          if(err.response.status===400){
            const errors = err.response.data;
            Object.keys(errors).forEach(key => {
              const newError = {...productErrors}
              if(key!=='productImage' && key!=='productImages') newError.key = errors[key]
              messages.push({text: errors[key], variant: 'error'})
            })
          }
        })
        .finally(() => {
          if(messages.length>0) triggerNotifications(messages, 50)
        })
    }

    return (
        <Container>
        <Box className="breadcrumb">
            <Breadcrumb routeSegments={[{ name: "Product", path: "/Product/list" }, { name: "Create" }]} />
        </Box>

        <Stack spacing={3}>
          <Grid sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}} gap={'1.5em'}>
            <SimpleCard sx={{width: '75%'}} title="Product details">
              <Stack flexWrap={'wrap'} spacing={3}>
                <TextField
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                  label='Product title'
                  placeholder='Enter product title'
                >
                </TextField>
                <TextField
                  value={productSubTitle}
                  onChange={(e) => setProductSubTitle(e.target.value)}
                  label='Product sub title'
                  placeholder='Enter product sub title'
                >
                </TextField>
                <TextField
                  value={productShortDescription}
                  onChange={(e) => setProductShortDescription(e.target.value)}
                  label='Product short description'
                  placeholder='Enter product short description'
                  multiline
                  rows={5}
                >
                </TextField>
              </Stack>
            </SimpleCard>
            <SimpleCard sx={{width: '20%', minWidth: '200px'}} title="Category details">
            <Stack direction={'column'}>
                {
                  categories && categories.length>0 ? (
                    categories.map(category => (
                      <React.Fragment>
                        <Grid sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}} gap={'0.2em'}>
                            <SmallCheckbox 
                              checked={selectedCategories.filter(cat=>cat.id===category.id).length!==0}
                              onClick={(event)=>{
                                let newList = [...selectedCategories]
                                if(newList.length===0 || newList.filter(cat=>cat.id===category.id).length===0) newList.push({id:category.id, subCategories:[]});
                                else newList = newList.filter(cat=>cat.id!==category.id)
                                setSelectedCategories(newList);
                              }}
                              >
                              </SmallCheckbox>
                            <Typography>{category.value}</Typography>
                        </Grid>
                        <Grid sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
                          {category.subCategories && category.subCategories.length > 0 ? (
                            category.subCategories.map(subCategory => (
                              <Grid key={subCategory.id} sx={{marginLeft: '0.8em', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}} gap={'0.2em'}>
                                <SmallCheckbox 
                                  size={'small'} 
                                  checked={selectedCategories.some(cat => cat.id === category.id && cat.subCategories.some(subCat => subCat.id === subCategory.id))}
                                  onClick={(event) => {
                                    const newList = [...selectedCategories];
                                    const categoryIndex = newList.findIndex(cat => cat.id === category.id);
                                    if (categoryIndex === -1)  newList.push({ id: category.id, subCategories: [{ id: subCategory.id }] });
                                    else {
                                      const subCategoryIndex = newList[categoryIndex].subCategories.findIndex(subCat => subCat.id === subCategory.id);
                                      if (subCategoryIndex === -1) newList[categoryIndex].subCategories.push({ id: subCategory.id });
                                      else {
                                        newList[categoryIndex].subCategories.splice(subCategoryIndex, 1);
                                        if(newList[categoryIndex].subCategories.length===0) newList.splice(categoryIndex, 1);
                                      }
                                    }
                                    setSelectedCategories(newList);
                                  }}
                                />
                                <Typography>{subCategory.value}</Typography>
                              </Grid>
                            ))
                          ) : ('')}
                        </Grid>
                      </React.Fragment>
                    ))
                  ):('')
                }
              </Stack>
            </SimpleCard>
          </Grid>
          <SimpleCard sx={{width: '75%'}} title="Product description">
              <Stack flexWrap={'wrap'} spacing={3}>
              <ReactQuillEditior
                  editorHtml={productDescription}
                  setEditorHtml={setProductDescription}
                  label='Product description'
                  placeholder='Enter product description'
                >
                </ReactQuillEditior>
              </Stack>
            </SimpleCard>

          <SimpleCard sx={{width: '75%'}} title="Product images">
            <Stack gap={'0.8em'}>
              <Typography>Product image</Typography>
              <FileUpload 
                required={true}
                sx={{width: 250}}
                height={250}
                width={250}
                file={productImage}
                setFile={(val) => {
                  setProductImage(val)
                }}
                id={'product-image-input'}
              />
              <Typography sx={{marginTop: '2.2em'}}>Image gallery</Typography>
              <MultiFileUpload
                enableAdd={true}
                fileCount={7}
                required={false}
                files={productImages}
                setFiles={(val) => {
                  setProductImages(val)
                }}
                id={'product-images-multi'}
                close={true}
              >
              </MultiFileUpload>
            </Stack>
          </SimpleCard>
          <SimpleCard sx={{width: '100%', height: 'max-content'}} title={"Product data"}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                      <Tab label="Attributes" {...a11yProps(0)} />
                      <Tab label="Variations" {...a11yProps(1)} />
                      <Tab label="Linked Products" {...a11yProps(2)} />
                  </Tabs>
              </Box>
              <Grid sx={{maxHeight: '600px', overflowY: 'scroll', marginTop: '1em'}}>
                <CustomTabPanelAttributes api={api} triggerNotifications={triggerNotifications} updateVariableAttributeList={updateVariableAttributeList} setUpdateVariableAttributeList={setUpdateVariableAttributeList} variables={variables} setVariables={setVariables} variations={variations} setVariations={setVariations} setAttributeIdentifier={setAttributeIdentifier} attributeIdentifier={attributeIdentifier} setVariableAttributeList={setVariableAttributeList} value={value} index={0} attributes={attributes} variableAttributeList={variableAttributeList} selectedAttributes={selectedAttributes} setSelectedAttributes={setSelectedAttributes}>
                </CustomTabPanelAttributes>
                <CustomTabPanelVariations api={api} triggerNotifications={triggerNotifications} FileToBase64={FileToBase64} variationIds={variationIds} setVariationIds={setVariationIds} updateVariations={updateVariations} setUpdateVariations={setUpdateVariations} updateVariableAttributeList={updateVariableAttributeList} attributes={attributes} variables={variables} setVariables={setVariables} variationIdentifier={variationIdentifier} setVariationIdentifier={setVariationIdentifier} variableAttributeList={variableAttributeList} variations={variations} setVariations={setVariations} value={value} index={1}>
                </CustomTabPanelVariations>
                <CustomTabPanelLinkedProducts value={value} index={2}>
                    Item Three
                </CustomTabPanelLinkedProducts>
            </Grid>
          </SimpleCard>
          <Grid sx={{display: 'flex', gap: '0.5em', justifyContent: 'flex-end', flexWrap: 'wrap', width: '100%', top: '5em'}}>
            <Button color="primary" variant="outlined">Cancel</Button>
            <Button color="primary" variant="outlined">Preview</Button>
            <Button sx={{width: '100px'}} variant="contained" color="primary" startIcon={<Icon sx={{fontSize: '0.75em'}}>publish</Icon>} disabled={updateVariableAttributeList.length === 0} onClick={upsertProduct}>Publish</Button>
          </Grid>
        </Stack>
        </Container>
    );
}

export default UpsertProduct;