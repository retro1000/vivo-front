import { useState } from "react";

import { Stack, Box, styled, Typography, Tabs, Tab, Grid, Icon, Checkbox, TextField, Select, MenuItem } from "@mui/material";

import { Breadcrumb, InputField, PopupFormDialog, SearchPane, SimpleCard2, TButton } from "app/components";

import { useNotistack } from 'app/hooks/useNotistack';
import { useParams } from "react-router-dom";
import OrderShipmentVariationCard from "./component/OrderShipmentVariationCard";
import { useReducer } from "react";
import { useEffect } from "react";
import { useAxios } from "app/hooks/useAxios";
import { useFormatter } from "app/hooks/useFormatter";

import {
  ListOutlined
} from '@mui/icons-material'


// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

const list = [
  {
    id: 1,
    orderNo: 1001,
    items: [
      {
        imageUrl: 'https://cbu01.alicdn.com/img/ibank/O1CN01byzC6x1sHtB3e3QXf_!!2211035925742-0-cib.jpg',
        name: "New Men's Casual Shoes Men's Sneakers Flying Woven Breathable Running Shoes Men's Shoes",
        attributes: [
          { name: 'Color', value: 'Red' },
          { name: 'Size', value: 'M' }
        ],
        quantity: 2,
        limit: 5,
        totalCost: 2000,
        type: 'normal'
      },
      {
        imageUrl: 'https://cbu01.alicdn.com/img/ibank/O1CN01xn0VsT1fAw5VER1qW_!!2216819813967-0-cib.jpg',
        name: "Shoes for Men Casual Slip on Fashion Sneakers Breathable Running Shoes Outdoor Walking Training Tennis Shoes",
        attributes: [
          { name: 'Color', value: 'Blue' },
          { name: 'Size', value: 'L' }
        ],
        quantity: 1,
        limit: 3,
        totalCost: 1500,
        type: 'normal'
      }
    ]
  },
  {
    id: 2,
    orderNo: 1002,
    items: [
      {
        imageUrl: 'https://cbu01.alicdn.com/img/ibank/O1CN01byzC6x1sHtB3e3QXf_!!2211035925742-0-cib.jpg',
        name: "New Men's Casual Shoes Men's Sneakers Flying Woven Breathable Running Shoes Men's Shoes",
        attributes: [
          { name: 'Color', value: 'Green' },
          { name: 'Size', value: 'S' }
        ],
        quantity: 3,
        limit: 10,
        totalCost: 3000,
        type: 'normal'
      }
    ]
  },
  {
    id: 3,
    orderNo: 1003,
    items: [
      {
        imageUrl: 'https://cbu01.alicdn.com/img/ibank/O1CN01xn0VsT1fAw5VER1qW_!!2216819813967-0-cib.jpg',
        name: "Shoes for Men Casual Slip on Fashion Sneakers Breathable Running Shoes Outdoor Walking Training Tennis Shoes",
        attributes: [
          { name: 'Color', value: 'Yellow' },
          { name: 'Size', value: 'XL' }
        ],
        quantity: 1,
        limit: 4,
        totalCost: 2500,
        type: 'normal'
      },
      {
        imageUrl: 'https://cbu01.alicdn.com/img/ibank/O1CN01byzC6x1sHtB3e3QXf_!!2211035925742-0-cib.jpg',
        name: "New Men's Casual Shoes Men's Sneakers Flying Woven Breathable Running Shoes Men's Shoes",
        attributes: [
          { name: 'Color', value: 'Purple' },
          { name: 'Size', value: 'M' }
        ],
        quantity: 2,
        limit: 7,
        totalCost: 1800,
        type: 'normal'
      },
      {
        imageUrl: 'https://cbu01.alicdn.com/img/ibank/O1CN01xn0VsT1fAw5VER1qW_!!2216819813967-0-cib.jpg',
        name: "New Men's Casual Shoes Men's Sneakers Flying Woven Breathable Running Shoes Men's Shoes",
        attributes: [
          { name: 'Color', value: 'Black' },
          { name: 'Size', value: 'L' }
        ],
        quantity: 5,
        limit: 12,
        totalCost: 5000,
        type: 'normal'
      }
    ]
  },
  {
    id: 4,
    orderNo: 1004,
    items: [
      {
        imageUrl: 'https://cbu01.alicdn.com/img/ibank/O1CN01xn0VsT1fAw5VER1qW_!!2216819813967-0-cib.jpg',
        name: "Shoes for Men Casual Slip on Fashion Sneakers Breathable Running Shoes Outdoor Walking Training Tennis Shoes",
        attributes: [
          { name: 'Color', value: 'White' },
          { name: 'Size', value: 'XS' }
        ],
        quantity: 10,
        limit: 15,
        totalCost: 8000,
        type: 'normal'
      }
    ]
  }
];

const allItems = [
  {
    id: 1,
    imageUrl: 'https://cbu01.alicdn.com/img/ibank/O1CN01byzC6x1sHtB3e3QXf_!!2211035925742-0-cib.jpg',
    name: "New Men's Casual Shoes Men's Sneakers Flying Woven Breathable Running Shoes Men's Shoes",
    attributes: [
      { name: 'Color', value: 'Red' },
      { name: 'Size', value: 'M' }
    ],
    quantity: 2,
    limit: 5,
    checked: false
  },
  {
    id: 2,
    imageUrl: 'https://cbu01.alicdn.com/img/ibank/O1CN01xn0VsT1fAw5VER1qW_!!2216819813967-0-cib.jpg',
    name: "Shoes for Men Casual Slip on Fashion Sneakers Breathable Running Shoes Outdoor Walking Training Tennis Shoes",
    attributes: [
      { name: 'Color', value: 'Blue' },
      { name: 'Size', value: 'L' }
    ],
    quantity: 1,
    limit: 3,
    lowLimit: 2,
    totalCost: 1500,
    checked: false
  },
  {
    id: 3,
    imageUrl: 'https://cbu01.alicdn.com/img/ibank/O1CN01byzC6x1sHtB3e3QXf_!!2211035925742-0-cib.jpg',
    name: "New Men's Casual Shoes Men's Sneakers Flying Woven Breathable Running Shoes Men's Shoes",
    attributes: [
      { name: 'Color', value: 'Green' },
      { name: 'Size', value: 'S' }
    ],
    quantity: 3,
    limit: 10,
    totalCost: 3000,
    lowLimit: 2,
    checked: false
  },
  {
    id: 4,
    imageUrl: 'https://cbu01.alicdn.com/img/ibank/O1CN01xn0VsT1fAw5VER1qW_!!2216819813967-0-cib.jpg',
    name: "Shoes for Men Casual Slip on Fashion Sneakers Breathable Running Shoes Outdoor Walking Training Tennis Shoes",
    attributes: [
      { name: 'Color', value: 'Yellow' },
      { name: 'Size', value: 'XL' }
    ],
    quantity: 1,
    limit: 4,
    totalCost: 2500,
    lowLimit: 2,
    checked: false
  },
  {
    id: 5,
    imageUrl: 'https://cbu01.alicdn.com/img/ibank/O1CN01byzC6x1sHtB3e3QXf_!!2211035925742-0-cib.jpg',
    name: "New Men's Casual Shoes Men's Sneakers Flying Woven Breathable Running Shoes Men's Shoes",
    attributes: [
      { name: 'Color', value: 'Purple' },
      { name: 'Size', value: 'M' }
    ],
    quantity: 2,
    limit: 7,
    totalCost: 1800,
    lowLimit: 2,
    checked: false
  },
  {
    id: 6,
    imageUrl: 'https://cbu01.alicdn.com/img/ibank/O1CN01xn0VsT1fAw5VER1qW_!!2216819813967-0-cib.jpg',
    name: "New Men's Casual Shoes Men's Sneakers Flying Woven Breathable Running Shoes Men's Shoes",
    attributes: [
      { name: 'Color', value: 'Black' },
      { name: 'Size', value: 'L' }
    ],
    quantity: 5,
    limit: 12,
    totalCost: 5000,
    lowLimit: 2,
    checked: false
  },
  {
    id: 7,
    imageUrl: 'https://cbu01.alicdn.com/img/ibank/O1CN01xn0VsT1fAw5VER1qW_!!2216819813967-0-cib.jpg',
    name: "Shoes for Men Casual Slip on Fashion Sneakers Breathable Running Shoes Outdoor Walking Training Tennis Shoes",
    attributes: [
      { name: 'Color', value: 'White' },
      { name: 'Size', value: 'XS' }
    ],
    quantity: 10,
    limit: 15,
    totalCost: 8000,
    lowLimit: 2,
    checked: false
  }
];

const OrderTabPanel = ({ value, index, state, orderItemList, setOrderListOn, removeOrders, deletingOrders }) => {
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        {value === index && (
          <>
          <br></br>
          {
            state.shipmentStatus!=='APPROVED' && state.shipmentStatus!=='CANCELED' &&
            <Box display={'flex'} gap={'0.5em'} flexWrap={'wrap'}>
              <TButton title={"Order List"} label={"Order List"} color={"primary"} variant={"contained"} sx={{width: 'max-content'}} fun={()=>setOrderListOn(true)}></TButton>
              <TButton title={"Remove orders"} label={"Remove orders"} color={"primary"} variant={"contained"} sx={{width: 'max-content'}} fun={removeOrders} disabled={!deletingOrders || deletingOrders.length<=0}></TButton>
            </Box>
          }
          <br></br>
          <Stack sx={{height: "max-content", maxHeight: "800px", minHeight: "300px", overflowY: "auto"}}>
            
            { 
              orderItemList && orderItemList.length>0 ?
                orderItemList.map(item => (
                  <Stack>
                    <Box display={"flex"} alignItems={"center"} justifyContent={"flex-start"} flexWrap={"wrap"} gap={'0.1em'}>
                      {state.shipmentStatus!=='APPROVED' && state.shipmentStatus!=='CANCELED' && <Checkbox size="small"/>}
                      <Typography variant="body2" sx={{cursor: "pointer"}} onClick={()=>item.id && window.open(`/order/view/${item.id}`, "_blank")}>{`Order No #${item.orderNo && item.orderNo}`}</Typography>                                   
                    </Box>
                    <Grid item xs={12}>
                        {item.items.map((it) => (
                            <Grid item xs={12} sx={{overflowX: 'hidden'}}>
                              <OrderShipmentVariationCard
                                item={{...it, checkBox: state.shipmentStatus!=='APPROVED' && state.shipmentStatus!=='CANCELED' }}
                              />
                            </Grid>
                        ))}
                    </Grid>
                    <br></br>
                  </Stack>
                )) :
                (
                  <Grid sx={{display: 'flex', width: '100%', height: '40dvh', flexDirection: 'column', gap: '0.8em'}} alignItems={'center'} justifyContent={'center'}>
                    <Icon sx={{fontSize: '5.5em', color: 'gray', fontWeight: 'small'}}>info_outline</Icon>
                    <Typography>No order itmes found.</Typography>
                  </Grid>
                )
            }
          </Stack>
        </>
        )}
      </div>
    );
  }

  const initialProductState = {
    products: allItems
  }

  const productReducer = (state, action) => {
    switch(action.type){
      case "ADD" :{
        const { products } = action.payload
        return {...state, products: [...state.products, ...products]}
      }
      case "REMOVE" :{
        return {...state, products: state.products.filter(product => !product.checked)}
      }
      case "CHECK" :{
        const { id } = action.payload
        return {...state, products: state.products.map(product => product.id === id ? {...product, checked: true} : product)}
      }
      case "UNCHECK" :{
        const { id } = action.payload
        return {...state, products: state.products.map(product => product.id === id ? {...product, checked: false} : product)}
      }
      default :{}
    }
  }

  const searchOptions = {
    menuActions: [
      {value:'ID', label: 'Seach by product id'},
      {value:'NAME', label: 'Seach by product name'},
      {value:'ATTRIBUTE', label: 'Seach by attribute values'},
      {value:'CATEGORY', label: 'Seach by categories'},
      {value:'ALL', label: 'Seach by anything'},
    ], 
    // search: , 
    placeholder: 'Search products'
  }

const ProductTabPanel = ({ value, index, state, dispatch }) => {

    const [productState, productDispatch] = useReducer(productReducer, initialProductState)

    const [productAction, setProductAction] = useState("NAME")

    const [productSearch, setProductSearch] = useState("")

    const [searchResults, setSearchResults] = useState([])

    const [searchLoading, setSearchLoading] = useState(false)

    const [showSearchBox, setShowSearchBox] = useState(false)

    const [selectedItems, setSelectedItems] = useState([])

    const { api } = useAxios()

    const getSearchResults = async() => {
      setShowSearchBox(true)
      setSearchLoading(true)
      const addedProducts = productState && productState.products && productState.products.length>0 && productState.products.map(product=>product.id)
      await api.get(
        `/variation/filter?
        ${productSearch && productSearch!=='' && 'search='+productSearch.trim()+'&'}
        ${productAction && productAction!=='' && 'action='+productAction+'&'}
        ${addedProducts && addedProducts.length>0 && 'products='+addedProducts.join(',')}`
      )
        .then(response => {
          if(response.status===200){
            setSearchResults(response.data)
          }
          if(response.status===204){
            setSearchResults([])
          }
        })
        .catch(error => {
          setSearchResults([])
        })
        .finally(() => {setSearchLoading(false)})
    }

    useEffect(() => {
      (!productSearch || productSearch==='') && showSearchBox && setShowSearchBox(false) 
      productAction && productSearch && productAction!=='' && productSearch!=='' && getSearchResults()
    }, [productSearch])

    useEffect(() => {
      !showSearchBox && setSelectedItems([])
    }, [showSearchBox])
  
    const handleCheck = (id) => {
      productState && id && productState.products && productState.products.length>0 && productDispatch({type: productState.products.find(product => product.id===id)?.checked ? "UNCHECK" : "CHECK", payload: {id: id}})
    }

    const removeProducts = () => {
      productState && dispatch && productState.products && productState.products.length>0 && dispatch({type: "REMOVE_VARIATIONS", payload: { variations: productState.products.filter(product => product.checked)?.map(product => product.id) }})
      productDispatch({type: "REMOVE", payload: {}})
    }

    const addProducts = (event, item) => {
      if(event.ctrlKey){
        setSelectedItems([...selectedItems, {...item, quantity: 1, checked: false}])
      }else{
        productDispatch({type: "ADD", payload: {products: [...{...item, quantity: 1, checked: false}]}})
        dispatch({type: '', payload: {variation: [...{variationId: item.id, qty: 1}]}})
        setSearchResults(searchResults.filter(result => result.id!==item.id))
      }
    }

    const addMultipleProucts = (event) => {
      if(event.key==='Enter' && selectedItems && selectedItems.length>0){
        productDispatch({type: "ADD", payload: {products: selectedItems}})
        dispatch({type: '', payload: {variation: selectedItems.map(item => ({variationId: item.id, qty: 1}))}})
        setSearchResults(searchResults.filter(result => !selectedItems.includes(result.id)))
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
          <>
          <br></br>
          {
            state.shipmentStatus!=='APPROVED' && state.shipmentStatus!=='CANCELED' &&
            <Box display={'flex'} gap={'0.5em'} flexWrap={'wrap'}>
              <SearchPane
                {...searchOptions}
                selectedAction={productAction}
                setSelectedAction={setProductAction}
                searchText={productSearch}
                setSearchText={setProductSearch}
                fieldSearch={true}
              >
                {false}
              </SearchPane>
              <TButton title={"Remove products"} label={"Remove products"} color={"primary"} variant={"contained"} sx={{width: 'max-content'}} fun={removeProducts} disabled={!productState.products || productState.products<=0 || productState.products.filter(product => product.checked).length===0}></TButton>
            </Box>
          }
          <br></br>
          <Stack sx={{height: "max-content", maxHeight: "800px", minHeight: "300px", overflowY: "auto"}}>
            
            { 
              productState.products && productState.products.length>0 ?
                  <Stack>
                    <Grid item xs={12}>
                        {productState.products.map((it) => (
                            <Grid item xs={12}>
                              <OrderShipmentVariationCard
                                item={{...it, checkBox: state.shipmentStatus!=='APPROVED' && state.shipmentStatus!=='CANCELED' }}
                                handleCheck={handleCheck}
                              />
                            </Grid>
                        ))}
                    </Grid>
                    <br></br>
                  </Stack> :
                  (
                    <Grid sx={{display: 'flex', width: '100%', height: '40dvh', flexDirection: 'column', gap: '0.8em'}} alignItems={'center'} justifyContent={'center'}>
                      <Icon sx={{fontSize: '5.5em', color: 'gray', fontWeight: 'small'}}>info_outline</Icon>
                      <Typography>No products found.</Typography>
                    </Grid>
                  )
            }
          </Stack>
        </>
        )}
      </div>
    );
  }
  
  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const initialState = {
    shipmentDescription: '',
    shipmentNote: '',
    shipmentType: 'AIR',
    shipmentStatus: 'PENDING',
    statusUpdatable: false,
    shipmentVariations: [],
  }

  const reducer = (state, action) => {
    switch(action.type){
      case 'UPDATE_DATA': {
        return { ...state, ...action.payload };
      }
      case 'UPDATE_VARIATION': {
        const { qty, variationId } = action.payload
        const newVariations = state.shipmentVariations.map(sv => (
          (
            sv.variationId===variationId && 
            qty>0 && 
            (
              !sv.purchaseOrderVariationOrderVariationDtos || 
              sv.purchaseOrderVariationOrderVariationDtos.length<=0 || 
              qty>=sv.purchaseOrderVariationOrderVariationDtos.reduce((acc, cur) => (acc+cur.qty), 0)
            ) 
          ) 
          ? {...sv, qty: qty} :
          sv
        ))
        return {...state, shipmentVariations: newVariations}
      }
      case 'ADD_VARIATIONS': {
        const { variation } = action.payload
        const newVariations = [
          ...state.shipmentVariations,
          ...variation.map(v => ({
            qty: v.qty,
            variationId: v.variationId,
            ...(v.purchaseOrderVariationId ? { purchaseOrderVariationId: v.purchaseOrderVariationId } : {})
          }))
        ];
        return {...state, shipmentVariations: newVariations}
      }
      case 'UPDATE_ORDERS': {
        const { qty, orderVariationId } = action.payload;
      
        const newVariations = state.shipmentVariations.map(sv => {
          const purchaseOrderVariationOrderVariationDtoIndex = sv.purchaseOrderVariationOrderVariationDtos.findIndex(val => val.purchaseOrderOrderVariationId === orderVariationId);
          
          if (purchaseOrderVariationOrderVariationDtoIndex !== -1) {
            const prevQty = sv.purchaseOrderVariationOrderVariationDtos[purchaseOrderVariationOrderVariationDtoIndex].qty;
      
            const updatedDtos = sv.purchaseOrderVariationOrderVariationDtos.map((dto, index) =>
              index === purchaseOrderVariationOrderVariationDtoIndex 
                ? { ...dto, qty } 
                : dto
            );
            
            return (qty > 0 && prevQty) 
              ? { ...sv, qty: sv.qty - (prevQty - qty), purchaseOrderVariationOrderVariationDtos: updatedDtos }
              : sv;
          }
      
          return sv;
        });
      
        return { ...state, shipmentVariations: newVariations };
      }
      case 'ADD_ORDERS': {
        const { orders } = action.payload;        
        const newVariations = state.shipmentVariations.map(variation => {
          const matchedOrder = orders.find(order => order.variationId === variation.variationId);      
          if (matchedOrder) {
            return {
              ...variation,
              purchaseOrderVariationOrderVariationDtos: [
                ...variation.purchaseOrderVariationOrderVariationDtos,
                {
                  qty: matchedOrder.qty,
                  orderVariationId: matchedOrder.orderVariationId,
                  ...(matchedOrder.purchaseOrderOrderVariationId ? 
                      { purchaseOrderOrderVariationId: matchedOrder.purchaseOrderOrderVariationId } : {})
                }
              ]
            };
          }
          return variation;
        });
        return { ...state, shipmentVariations: newVariations };
      }
      case 'REMOVE_VARIATIONS': {
        const { variations } = action.payload
        if(!variations && variations.length<=0) break 
        return { ...state, shipmentVariations: state.shipmentVariations.filter(variation => !variations.includes(variation.variationId))}
      }      
      case 'REMOVE_ORDERS': {
        const { orders } = action.payload 
        if(!orders && orders.length<=0) break 
        return {
           ...state, 
           shipmentVariations: state.shipmentVariations.map(variation => {
              const restOrderVariations = variation.purchaseOrderVariationOrderVariationDtos.filter(povod => !orders.includes(povod.purchaseOrderOrderVariationId))
              const itmQty = variation.purchaseOrderVariationOrderVariationDtos.reduce((acc, cur) => (acc+cur.qty), 0)
              return (
                restOrderVariations || 
                restOrderVariations.length>0 || 
                variation.qty===itmQty
                ? null
                : {
                    ...variation, 
                    qty: variation.qty-(itmQty-restOrderVariations.reduce((acc, cur) => (acc+cur.qty), 0)),
                    purchaseOrderVariationOrderVariationDtos: restOrderVariations
                  }
              )
           })?.filter(val => val!==null)
        }
      }      
      case 'UPDATE_INFO': {
        break
      }
      case 'UPDATE_STATUS': {
        const { shipmentStatus, statusUpdatable } = action.payload
        return { ...state, shipmentStatus: shipmentStatus, statusUpdatable: statusUpdatable };
      }
      case 'SUBMIT': {
        break
      }
      default: {}
    }
  }

function PurchaseOrderUpsert({ type }) {

    const { id } = useParams()

    const [value, setValue] = useState(0)

    const [orderItemList, setOrderItemList] = useState(list)

    const [state, dispatch] = useReducer(reducer, initialState)

    const { api } = useAxios()

    const { TitleCaseWordFormat } = useFormatter()

    const [updateStatusLoading, setUpdadteStatusLoading] = useState(false)

    const { triggerNotifications, triggerCommonErrors } = useNotistack()

    const [orderListOn, setOrderListOn] = useState(false)

    const [needToImportOrderList, setNeedToImportOrderList] = useState(list)

    const [popUpLoading, setPopUpLoading] = useState(false)

    const [temporySelectedOrders, setTemporySelectedOrders] = useState([])

    const [deletingProducts, setDeletingProucts] = useState([])

    const [deletingOrders, setDeletingOrders] = useState([])

    useEffect(() => {
      if(type==='update'){
        const getPurchaseOrderData = async() => {

        }

        getPurchaseOrderData()
      }
    }, [])

    useEffect(() => {
      if(!orderListOn){
        setTemporySelectedOrders([])
      }
    }, [orderListOn])

    const updateStatus = async() => {
      if(type==='update' && id){
        setUpdadteStatusLoading(true)
        await api.post('/purchase-order/update-status', {purchaseOrderId: id, shipmentStatus: state.shipmentStatus})
          .then(response => {
            if(response.status===200 && response.data){
              triggerNotifications(response.data)
              dispatch({type: 'UPDATE_STATUS', payload: { statusUpdatable: false, shipmentStatus: state.shipmentStatus }})
            }
          })
          .catch(error => {
            triggerCommonErrors(error)
            dispatch({type: 'UPDATE_STATUS', payload: { statusUpdatable: true, shipmentStatus: state.shipmentStatus }})
          })
          .finally(() => {
            setUpdadteStatusLoading(false)
          })
      }
    }

    const getNeedToImportOrderList = async () => {
      setPopUpLoading(true)
      await api.post('/order/filter/to-purchase-order', {})
        .then(response => {
          if(response.status===200){
            setNeedToImportOrderList(response.body)
          }
        })
        .catch(error => {
          triggerCommonErrors(error)
        })
        .finally(() => {
          setPopUpLoading(false)
        })
    }

    const addNewOrders = () => {

    }

    const removeOrders = () => {
      if(!deletingOrders || deletingOrders.length<=0) return   
      dispatch({ type: 'REMOVE_ORDERS', action: { orders: deletingOrders } })
      setDeletingOrders([])
    }

    const addTodeletingOrdersVariation = () => {
      
    }

    const addToDeletingOrders = () => {

    }

    const upsertPurchaseOrder = async() => {

      await api.post(`/purchase-order/${type}`)
        .then(response => {

        })
        .catch(error => {

        })
        .finally(() => {

        })
    }

    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Purchase Orders", path: "/purchase-orders" }, type && (type==='update'?({ name: "Purchase Order Details", path: id && `/purchase-order/view/${id}` }, { name: "Update" }) : { name: "Create" })]} />
            </Box>

            <Stack alignItems={'center'} justifyContent={'center'} spacing={3}>
                <SimpleCard2 title={'Purchase Order Details'} sx={{width: '100%'}}>
                  <Box sx={{display: 'flex', flexWrap: 'wrap', gap: '1em', width: '100%'}}>
                    {/* <form> */}
                      <InputField label={'Purchase order description'} sx={{width: '100%'}}>
                        <TextField
                          value={state.shipmentDescription}
                          onChange={(event) => dispatch({type: 'UPDATE_DATA', payload:{ shipmentDescription: event.target.value }})}
                          placeholder='Enter purchase order description'
                          type='text'
                          sx={{ width: "100%", mt: -1 }}
                          rows={5}
                          multiline={true}
                        />
                      </InputField>
                      <InputField label={'Purchase order note'} sx={{width: '100%'}}>
                        <TextField
                          value={state.shipmentNote}
                          onChange={(event) => dispatch({type: 'UPDATE_DATA', payload:{ shipmentNote: event.target.value }})}
                          placeholder='Enter purchase order note'
                          type='text'
                          sx={{ width: "100%", mt: -1 }}
                          rows={5}
                          multiline={true}
                        />
                      </InputField>
                      <InputField label={'Shipment type'} req={true} sx={{width: '100%'}}>
                          <Select size="small" value={state.shipmentType} onChange={(event) => dispatch({type: 'UPDATE_DATA', payload: {shipmentType: event.target.value}})} sx={{width: 'max-content', minWidth: '200px', mt: -1}}>
                            <MenuItem value={'AIR'}>Air</MenuItem>
                            <MenuItem value={'SEA'}>Sea</MenuItem>
                          </Select>
                      </InputField>
                      {
                        type==='update' && id && 
                        <Box display={'flex'} gap={'0.5em'} flexWrap={'wrap'} alignItems={'flex-end'} justifyContent={'flex-start'} sx={{width: '100%', mt: 3}}>
                          
                          <InputField label={'Purchase order status'} req={true} sx={{width: 'max-content', minWidth: '200px'}}>
                              <Select size="small" value={state.shipmentStatus} onChange={(event) => dispatch({type: 'UPDATE_STATUS', payload: { statusUpdatable: true, shipmentStatus: event.target.value }})} sx={{width: 'max-content', minWidth: '200px', mt: -1}} disabled={updateStatusLoading}>
                                <MenuItem value={'APPROVED'}>Approve</MenuItem>
                                <MenuItem value={'CANCELED'}>Cancel</MenuItem>
                                <MenuItem value={'PENDING'}>Pending</MenuItem>
                              </Select>
                          </InputField>
                          <TButton label='Update Status' title='Update status' color='primary' variant='outlined' sx={{position: 'reletive', top: '-0.1em'}} loading={updateStatusLoading} fun={updateStatus} disabled={!state.statusUpdatable}></TButton>
                        </Box>
                      }
                    {/* </form> */}
                  </Box>
                </SimpleCard2>
                <SimpleCard2 title={'Purchase Order Item List'} sx={{width: '100%'}}>
                    <Tabs value={value} onChange={(e, val)=>setValue(val)} aria-label="basic tabs example">
                        <Tab label="Order List Items" {...a11yProps(0)} />
                        <Tab label="Full Item List" {...a11yProps(1)} />
                    </Tabs>
                    <OrderTabPanel 
                      value={value} 
                      index={0} 
                      state={state} 
                      orderItemList={orderItemList}
                      setOrderListOn={setOrderListOn} 
                      removeOrders={removeOrders} 
                      deletingOrders={deletingOrders}
                    />
                    <ProductTabPanel
                      value={value} 
                      index={1}
                      state={state} 
                      dispatch={dispatch}  
                    />
                </SimpleCard2>
                <br></br>
                <Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'} width={'100%'}>
                  <TButton color={'primary'} variant={'contained'} title={TitleCaseWordFormat(type)} label={TitleCaseWordFormat(type)} sx={{minWidth: '180px'}}></TButton>
                </Box>
            </Stack>

            <PopupFormDialog
              open={orderListOn}
              title="Add Orders"
              submitButton="Add"
              titleIcon={<ListOutlined />}
              setOpen={setOrderListOn}
              reasonCloseOn={true}
              submit={addNewOrders}
              loading={popUpLoading}
              disableSubmit={needToImportOrderList && needToImportOrderList.length===0}
            >
              { 
                needToImportOrderList && needToImportOrderList.length>0 ?
                  <Stack>
                    <Box display={"flex"} alignItems={"center"} justifyContent={"flex-start"} flexWrap={"wrap"} gap={'0.5em'}>
                      <TButton title={'Select all'} label={'Select all'} color={'primary'} variant={'outlined'}></TButton>
                      <TButton title={'Select none'} label={'Select none'} color={'primary'} variant={'outlined'}></TButton>
                    </Box>
                    <br></br>
                    {needToImportOrderList.map((item, index) => {
                      const temporySelectedOrder = temporySelectedOrders && temporySelectedOrders.length>0 && temporySelectedOrders.find(val=>val.orderId===item.id)
                      return (
                        <Stack key={index}>
                          <Box display={"flex"} alignItems={"center"} justifyContent={"flex-start"} flexWrap={"wrap"} gap={'0.1em'}>
                            <Checkbox size="small" checked={temporySelectedOrder} />
                            <Typography variant="body2" sx={{cursor: "pointer"}} onClick={()=>item.id && window.open(`/order/view/${item.id}`, "_blank")}>{`Order No #${item.orderNo && item.orderNo}`}</Typography>                                   
                          </Box>
                          <Grid item xs={12}>
                            {item.items.map((it, inx) => (
                              <Grid item xs={12} sx={{overflowX: 'hidden'}} key={inx}>
                                <OrderShipmentVariationCard
                                  item={{...it, checkBox: true}}
                                  temporySelectedOrder={temporySelectedOrder?temporySelectedOrder.orderVariatins:null}
                                />
                              </Grid>
                            ))}
                          </Grid>
                          <br></br>
                        </Stack>
                      )
                    })}
                  </Stack> :
                  (
                    <Grid sx={{display: 'flex', width: '100%', height: '40dvh', flexDirection: 'column', gap: '0.8em'}} alignItems={'center'} justifyContent={'center'}>
                      <Icon sx={{fontSize: '5.5em', color: 'gray', fontWeight: 'small'}}>info_outline</Icon>
                      <Typography>No order itmes found.</Typography>
                    </Grid>
                  )
              }
            </PopupFormDialog>
        </Container>
    );
}

export default PurchaseOrderUpsert;
