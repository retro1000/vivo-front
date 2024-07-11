import { useState, useEffect, useCallback } from "react";
import React from 'react';
import { Navigate, useParams } from "react-router-dom";

import _ from 'lodash'

import { Stack, Box, styled, Tabs, Tab, Typography, Select, Button, Grid, IconButton, Icon, Chip } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import { Breadcrumb, SwiperSlider1, SwiperSliderThumbLoop, ReviewStatsCard, QuantitySelector, MatxLoading } from "app/components";

import { useNotistack } from 'app/hooks/useNotistack';
import useAuth from "app/hooks/useAuth";
import { useAxios } from "app/hooks/useAxios";
import { useStompClient } from "app/hooks/useStompClient";

import { lazy } from "react";
import Loadable from "app/components/Loadable";

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

function CustomTabPanelProductDescription({value, index, productDescription}) {
      
    return (
      <Stack></Stack>
    );
}

function CustomTabPanelProductDetails({value, index}) {
  
    return (
      <Stack></Stack>
    );
}

function CustomTabPanelReviews({value, index, api, apiNonAuth, on, id}) {
    
    const [reviewStats, setReviewStats] = useState({})
    const [reviews, setReviews] = useState(null)

    const fetchReviews = async () => {
        await apiNonAuth.get(`/review/product-review/get/${id}`)
            .then((res) => {
                if(res.status===200){

                }
            })
            .catch((err) => {

            })
            .finally(() => {
                
            })
    }

    useEffect(() => {
        const fetchReviewStats = async () => {
            await api.get(`/review/product-review/stat/get/${id}`)
                .then((res) => {
                    if(res.status===200){

                    }
                })
                .catch((err) => {

                })
                .finally(() => {

                })
        }

        if(on && id){
            fetchReviewStats()
            fetchReviews()
        }

    }, [on])
  
    return (
      <Stack>
            <Grid>
                <Stack>
                    {
                        
                    }
                </Stack>
                <Stack></Stack>
            </Grid>
      </Stack>
    );
}

function ProductView() {

    const { id } = useParams()

    const { api } = useAxios()

    const { apiNonAuth } = useAxios()

    const { stompClient } = useStompClient()

    const {user, role} = useAuth()

    const [value, setValue] = useState(0);

    const [on, setOn] = useState(false)

    const [productDescription, setProductDescription] = useState('')

    const [qty, setQty] = useState(1)

    const [pageLoading, setPageLoading] = useState(true)

    const [productImages, setProductImages] = useState([])
    
    const [productTitle, setProductTitle] = useState(undefined)
    
    const [productSubTitle, setProductSubTitle] = useState(undefined)
    
    const [reviews, setReviews] = useState(undefined)
    
    const [attributes, setAttributes] = useState([])
    
    const [variations, setVariations] = useState([])
    
    const [selectedAttributeVariables, setSelectedAttributeVariables] = useState([])

    const [typeStatus, setTypeStatus] = useState(undefined)

    const [orders, setOrders] = useState([])

    const [variation, setVariation] = useState(undefined)

    const [swipTo, setSwipTo] = useState(undefined)

    const [notFount, setNotFound] = useState(false)

    const NotFound = Loadable(lazy(() => import("../sessions/NotFound")));

    const findVariation = useCallback((array) => {
        return variations.find(val => ((arr1, arr2) => {
            if(arr1.length !== arr2.length) return false
            return _.isEqual(_.sortBy(arr1, Object.keys(arr1[0])), _.sortBy(arr2, Object.keys(arr2[0])))
        })(val.attributeVariables, array))
    })

    useEffect(() => {
        const fetchProduct = async () => {

            if(stompClient){
                const onConnect = () => {              
                    // Subscribe to the stock topic
                    stompClient.subscribe('/stock-manage/stock', (message) => {
                      const stocks = JSON.parse(message.body);
                      if(stocks && variations){
                        const newVar = variations;
                        const stocksVarIds = stocks.map(stock => stock.variationId)
                        newVar.forEach(variation => {
                            if(stocksVarIds.includes(variation.variationId)){
                                variation.availableStockAmount = stocks.find(stock => stock.variationId === variation.variationId).qty
                            }
                        })
                        setVariations(newVar)
                      }
                    });
                  };
              
                  stompClient.onConnect = onConnect;
            }

            try {

                const [productRes, reviewRes] = await Promise.allSettled([
                  apiNonAuth.get(`/product/get/${id}`),
                  apiNonAuth.get(`/product/review/get/${id}`)
                ]);

                if (productRes.value.status === 200) {
                    setNotFound(false)
                  const product = productRes.value.data;
                  setProductTitle(product.productTitle);
                  setProductSubTitle(product.productSubTitle);
                  setProductDescription(product.productDescription);
                  setProductImages(product.images);
                  setAttributes(product.attributes);
                  setVariations(product.variations);
                  setSelectedAttributeVariables(product.variations[0]?.attributeVariable || []);
                }

                if(productRes.value.status === 204){
                    setNotFound(true)
                }
        
                if (reviewRes.value.status === 200) {
                  setReviews(reviewRes.value.data);
                }
            } catch (err) {
                console.error('Error fetching product or reviews:', err);
            } finally {
                setPageLoading(false);
            }
        }

        setPageLoading(true)
        fetchProduct()

        if(stompClient){
            return () => {
                stompClient.deactivate();
            };
        }
        
    }, [])

    useEffect(() => {
        if(selectedAttributeVariables.length!==0) setVariation(findVariation(selectedAttributeVariables))
    }, [selectedAttributeVariables, findVariation])

    useEffect(() => {
        if(variation){
            if(variation.availableStockAmount && variation.availableStockAmount!==0){
                setTypeStatus({col: 'green', text: `${variation.availableStockAmount} items are available in availableStockAmount.`})
                setQty(1)
            }else if(variation.backendOrder){
                setTypeStatus({col: 'green', text: 'Backend orders are available.'})
                setQty(1)
            }else{
                setTypeStatus({col: 'red', text: 'Out of availableStockAmount.'})
                setQty(0)
            }
            setSwipTo(variation.variationImageIndex)
        }else{
            setQty(0)
            setTypeStatus(undefined)
        }
    }, [variation])

    useEffect(() => {
        if(variation && qty>0){
            const newOrders = [...orders]
            if(orders.length>0){
                orders[0].variationId = variation.variationId
                orders[0].qty = qty
                orders[0].backendOrder = variation.backendOrder
            }else{
                newOrders.push({variationId: variation.variationId, qty: qty, backendOrder: variation.backendOrder})
            }
            setOrders(newOrders)
        }
    }, [qty])

    const formatToLKR = (number) => {
        return new Intl.NumberFormat('en-LK', {
            style: 'currency',
            currency: 'LKR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(number);
    }

    const a11yProps = (index) => {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleChange = (event, newValue) => {
        if(newValue===2 && !on) setOn(true)
        setValue(newValue);
    };

    const addToCart = async () => {
        if(orders && orders.length>0){
            await api.post('/order/order-variation/create', orders)
                .then((res) => {
                    if(res.status===200){

                    }
                })
                .catch((err) => {

                })
                .finally(() => {

                })
        }
    }

    const buyNow = () => {
        console.log(orders)
    }

    if(notFount) return <NotFound />

    if(pageLoading) return <MatxLoading />

    return (
        <Container sx={{'@media (max-width: 431px)': {overflow: 'auto'}}}>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Product", path: "/Product/list" }, {name: productTitle}, {name: ''}]} />
            </Box>

            <Box spacing={3}>
                <Box sx={{display:'flex', gap:'1em', flexWrap:'wrap', justifyContent:'space-between', alignItems:'flex-start', width: '100%', height: '100%', maxWidth: '1290px'}}>
                    <Box sx={{width: '35%', maxWidth: '1220px', minWidth: '260px', '@media (max-width: 810px)': {width: '455px'}}}>
                        <SwiperSliderThumbLoop
                            images={productImages}
                            swipTo={swipTo}
                        ></SwiperSliderThumbLoop>
                    </Box>
                    <Box sx={{width: '62%', '@media (max-width: 810px)': {width: '100%'}}}>
                        <Stack>
                            <Typography variant="h5">{productTitle}</Typography>
                            {productSubTitle!=='' && productSubTitle!==undefined && <Typography variant="label" sx={{fontSize: '15px', marginTop: '0.8em'}}>{productSubTitle}</Typography>}
                            <ReviewStatsCard rating={reviews?reviews.rate:0} reviewCount={reviews?reviews.review:0}></ReviewStatsCard>
                            <Stack sx={{marginTop: '3em'}}>
                                {attributes.map((attribute, index) => (
                                    <Grid key={`attr_${index}`} sx={{display: 'flex', justifyContent: 'flex-start', alignItems:'flex-start', gap: '1.2em', marginBottom: '1.2em', borderBottom: '1px solid #d0d0d0'}}>
                                        <Typography sx={{width: '25%', maxWidth: '100px', minWidth: '50px'}}>{attribute.attributeName}</Typography>
                                        {user && role && role!=='USER' && attributes.length-1===index?
                                            <Stack>
                                                {
                                                    attribute.attributeVariables.map((attributeVariable, attrvIndex) => {
                                                        const newList = selectedAttributeVariables
                                                        newList.push({attributeId:attribute.attributeId, attributeVariableId:attributeVariable.attributeVariableId})
                                                        const newVariation = findVariation(newList)

                                                        return newVariation ? (
                                                            <Grid key={`attrv_${attrvIndex}`} sx={{display: 'flex', justifyContent:'space-between', flexWrap: 'wrap'}}>
                                                                <Typography sx={{width: '25%', maxWidth: '120px', minWidth: '50px'}}>{attributeVariable.attributeVariableName}</Typography>
                                                                <Typography>{newVariation.discount && newVariation.discount!==0 ? formatToLKR(newVariation.discount) : formatToLKR(newVariation.unitPrice)}</Typography>
                                                                <Typography>{newVariation.availableStockAmount && newVariation.availableStockAmount!==0 ? `${newVariation.availableStockAmount} items are in availableStockAmount` : 'Out of availableStockAmount'}</Typography>
                                                                <QuantitySelector limit={newVariation.availableStockAmount && newVariation.availableStockAmount!==0 ? newVariation.availableStockAmount : newVariation.backendOrder ? -1 : 0}></QuantitySelector>
                                                            </Grid>
                                                        ) : ''
                                                    })
                                                }
                                            </Stack> :
                                            <Grid sx={{display: 'flex', flexWrap: 'wrap', gap: '0.5em', marginBottom: '0.8em'}}>
                                                {

                                                        attribute.attributeVariables.map((attributeVariable, attrvIndex) => {

                                                            let selectedIndex = selectedAttributeVariables.findIndex(val=>val.attributeId===attribute.attributeId && val.attributeVariableId===attributeVariable.attributeVariableId)
                                                            return (
                                                                <Button 
                                                                    key={`attrv_${attrvIndex}`} 
                                                                    variant={selectedIndex!==-1?'contained':'outlined'}
                                                                    color="primary"
                                                                    label={attributeVariable.attributeVariableName}
                                                                    onClick={()=>{
                                                                        let newList = [...selectedAttributeVariables]
                                                                        newList = newList.filter(val=>val.attributeId!==attribute.attributeId)
                                                                        if(selectedIndex===-1) newList.push({attributeId:attribute.attributeId, attributeVariableId:attributeVariable.attributeVariableId})
                                                                        setSelectedAttributeVariables(newList)
                                                                    }}
                                                                >
                                                                    {attributeVariable.attributeVariableName}
                                                                </Button>
                                                            )
                                                        })
                                                    
                                                }
                                            </Grid>
                                        }
                                    </Grid>
                                ))}
                                {
                                    <React.Fragment>
                                        {
                                            (!user || !role || role==='USER') && variation &&
                                                <Grid sx={{display: 'flex', gap: '1.2em', marginTop: '1.2em'}}>
                                                    {variation.discount && variation.discount!==0 && <Typography variant='h6' sx={{textDecoration: 'line-through'}}>{formatToLKR(variation.unitPrice)}</Typography>}
                                                    <Typography variant='h6' sx={{color: 'red'}}>{variation.discount && variation.discount!==0 ? formatToLKR(variation.discount) : formatToLKR(variation.unitPrice)}</Typography>
                                                </Grid>
                                        }
                                        {typeStatus && <Typography sx={{marginTop: '0.7em', color: typeStatus.col}}>{typeStatus.text}</Typography>}
                                        <Grid sx={{display: 'flex', gap: '0.8em', marginTop: '1.5em', flexWrap: 'wrap'}}>
                                            {
                                                <React.Fragment>
                                                    {(!user || !role || role==='USER') && <QuantitySelector count={qty} setCount={setQty} limit={variation && variation.availableStockAmount && variation.availableStockAmount!==0 ? variation.availableStockAmount : variation && variation.backendOrder ? -1 : 0}></QuantitySelector>}
                                                        <Grid sx={{display: 'flex', gap: '0.8em', flexWrap: 'wrap'}}>
                                                            <Button sx={{width: '130px'}} variant="outlined" color='primary' onClick={addToCart} startIcon={<Icon sx={{fontSize: '0.75em'}}>ShoppingBasketOutlined</Icon>} disabled={orders.length===0}>Add to cart</Button>
                                                            <Button sx={{width: '130px'}} variant="contained" color='error' onClick={buyNow} startIcon={<Icon sx={{fontSize: '0.75em'}}>ShoppingCartOutlined</Icon>} disabled={orders.length===0}>Buy now</Button>
                                                        </Grid>
                                                </React.Fragment>
                                            }
                                        </Grid>
                                    </React.Fragment>
                                }
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
                <Stack sx={{width: '100%', marginTop: '5em'}}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Product Description" {...a11yProps(0)} />
                            <Tab label="Product Details" {...a11yProps(1)} />
                            <Tab label="Reviews" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                        <Grid sx={{maxHeight: '600px', overflowY: 'scroll', marginTop: '1em'}}>
                            <CustomTabPanelProductDescription des={productDescription} value={value} index={0}>
                            </CustomTabPanelProductDescription>
                            <CustomTabPanelProductDetails value={value} index={1}>
                            </CustomTabPanelProductDetails>
                            <CustomTabPanelReviews api={api} on={on} id={id} value={value} index={2} apiNonAuth={apiNonAuth}>
                            </CustomTabPanelReviews>
                        </Grid>
                </Stack>

                <Box>
                    
                </Box>
            </Box>
            
        </Container>
    );
}

export default ProductView;