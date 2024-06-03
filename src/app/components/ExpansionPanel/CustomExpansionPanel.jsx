import { useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Stack, styled, Grid, IconButton, Icon, TextField } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

import { SearchableSelectMultiple } from "..";


const AccordionRoot = styled("div")(({ theme }) => ({
  width: "100%",
  "& .heading": {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function CustomExpansionPanel(props) {

  const compareArrays = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
        return true;
    }

    arr1.forEach(ar1 => {
      arr2.forEach(ar2 => {
        if (ar1.value !== ar2.variableId || ar1.label !== ar2.variableName) return true;
      })
    })

    return false;
}
console.log(props.variables, props.list)
return (
    <AccordionRoot>
        {
          (props.list && props.list.length > 0) ? (
            props.list.map((item, index) => (
                <Accordion sx={{width: '60%', maxWidth: '700px', minWidth: '380px'}} expanded={item.expanded}>
                    <AccordionSummary
                      id={`panel${index+1}a-header`}
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${index+1}a-content`}
                      onClick={(event) => {props.editVariableAttributeList(index, !item.expanded, 'expanded')}}
                    >
                      <Grid container alignItems="center" justifyContent={"space-between"} spacing={1}>
                        <Grid>
                          <Typography className="heading">
                            {item.attributeName===''? 'New attribute' : item.attributeName}
                          </Typography>
                        </Grid>
                        {props.isDeleteOn ? (
                          <Grid>
                            <IconButton
                              aria-label="delete"
                              onClick={() => {
                                props.removeFromVariableAttributeList(item.identifier);
                                let newList = [...props.updateVariableAttributeList]
                                newList = newList.filter(itm=>itm.identifier!==item.identifier)
                                props.setUpdateVariableAttributeList(newList)
                              }}
                              sx={{ color: '#e80e0e', marginTop: '0.3em'}}
                            >
                              <Icon sx={{fontSize: '0.75em'}}>delete</Icon>
                            </IconButton>
                          </Grid>) : ''
                        }
                      
                      </Grid>
                    </AccordionSummary>

                    <AccordionDetails>
                      {
                        item.state==='create'?
                          (
                            <Grid sx={{display: 'flex', direction: 'column', gap: '2%'}} container spacing={1} alignItems="flex-start" justifyContent={"space-between"}>
                                  <TextField
                                    sx={{width: '23%'}}
                                    fullWidth
                                    label="Attribute Name"
                                    value={item.attributeName}
                                    onChange={(e) => {
                                      const current = props.list[index];
                                      let newList = [...props.updateVariableAttributeList]
                                      if(e.target.value==='' && newList.filter(itm=>itm.identifier===current.identifier).length!==0) newList = newList.filter(itm=>itm.identifier!==current.identifier)
                                      if(e.target.value!=='' && e.target.value!==current.attributeName && current.attributeVariables!==''){
                                        const newList = [...props.updateVariableAttributeList]
                                        if(newList.length===0 || newList.filter(itm=>itm.identifier===current.identifier).length===0){
                                          current.attributeName = e.target.value;
                                          newList.push(current)
                                        }else{
                                          newList.find(itm=>itm.identifier===current.identifier).attributeName = e.target.value
                                        }
                                      }
                                      props.setUpdateVariableAttributeList(newList)
                                      props.editVariableAttributeList(index, e.target.value, 'attributeName');
                                    }}
                                    placeholder="eg. size or color"
                                    // error={errors.attributeName}
                                    // helperText={errors.attributeName}
                                  />
                                  <TextField
                                    fullWidth
                                    sx={{width: '75%'}}
                                    label="Attribute Variables"
                                    value={item.attributeVariables}
                                    onChange={(e) => {
                                      const current = props.list[index];
                                      let newList = [...props.updateVariableAttributeList]
                                      if(e.target.value==='' && newList.filter(itm=>itm.identifier===current.identifier).length!==0) newList = newList.filter(itm=>itm.identifier!==current.identifier)
                                      if(e.target.value!=='' && e.target.value!==current.attributeVariables && current.attributeName!==''){
                                        if(newList.length===0 || newList.filter(itm=>itm.identifier===current.identifier).length===0){
                                          current.attributeVariables = e.target.value;
                                          newList.push(current)
                                        }else{
                                          newList.find(itm=>itm.identifier===current.identifier).attributeVariables = e.target.value
                                        }
                                      }
                                      props.setUpdateVariableAttributeList(newList)
                                      props.editVariableAttributeList(index, e.target.value, 'attributeVariables')
                                    }}
                                    multiline
                                    rows={4}
                                    placeholder="Enter some descriptive text. Use '|' to seperate different values."
                                    // error={errors.attributeVariables}
                                    // helperText={errors.attributeVariables}
                                  />
                            </Grid>
                          ):
                          (
                            <Grid sx={{display: 'flex', direction: 'column'}} container spacing={1} alignItems="flex-start" justifyContent={"space-between"}>
                                  <Stack sx={{width: '100%'}}>
                                    <SearchableSelectMultiple 
                                      label={"Attribute variables"}
                                      multiple={true} 
                                      options={
                                        props.variables.find(variable => variable.attributeId === item.attributeId)
                                          ?.variableList
                                          ?.filter( variable => !item.attributeVariables.some(selected => selected.variableId === variable.variableId))
                                          ?.map(itm => (
                                            { label: itm.variableName, value: itm.variableId }
                                        )) || []
                                      }  
                                      setSelectedValues={(val)=>{
                                        // const current = props.list[index];
                                        // let newList = [...props.updateVariableAttributeList]
                                        // if(val.length===0 && newList.filter(itm=>itm.identifier===current.identifier).length!==0) newList = newList.filter(itm=>itm.identifier!==current.identifier)
                                        // if(val.length!==0 && compareArrays(val, current.attributeVariables)){
                                        //   if(newList.length===0 || newList.filter(itm=>itm.identifier===current.identifier).length===0){
                                        //     current.attributeVariables = val;
                                        //     newList.push(current)
                                        //   }else{
                                        //     newList.find(itm=>itm.identifier===current.identifier).attributeVariables = val
                                        //   }
                                        // }
                                        // props.setUpdateVariableAttributeList(newList)
                                        props.editVariableAttributeList(index, Array.isArray(val)?val.map(option=>{return {variableId: option.value, variableName: option.label}}):val, 'attributeVariables')
                                      }} 
                                      selectedValues={Array.isArray(item.attributeVariables)?item.attributeVariables.map(itm => ({label: itm.variableName, value: itm.variableId})):{label: item.attributeVariables, value: item.attributeVariables}}
                                      sx={{width: '100%'}}
                                      ></SearchableSelectMultiple>
                                      <Grid sx={{display: 'flex', flexDirection: 'row', gap: '0.4em', marginTop: '0.4em', flexWrap: 'wrap'}}>
                                        <Button color="primary" variant="outlined">Select all</Button>
                                        <Button color="primary" variant="outlined">Select none</Button>
                                        <Button color="primary" variant="outlined">Add new</Button>
                                      </Grid>
                                  </Stack>
                              </Grid>
                          )
                      }
                    </AccordionDetails>
                </Accordion>
            ))) : ''
        }
    </AccordionRoot>
  );
}

export default CustomExpansionPanel;
