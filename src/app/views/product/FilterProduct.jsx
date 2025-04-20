// ProductPage.jsx
import React, { useState } from "react";
import { Box, Typography, Button, Grid, Container, useMediaQuery, IconButton, Slide } from "@mui/material";
import { Header, Footer, ProductGrid } from "app/components";
import SortButton from "./component/SortButton";
// import ProductGrid from "./component/ProductGrid";
import FilterBar from "./component/Filtering";
import { useEffect } from "react";
import { useAxios } from "app/hooks/useAxios";
import { useReducer } from "react";

import FilterIcon from '@mui/icons-material/Tune'
import { themeColors } from "app/components/MatxTheme/themeColors";
import { useRef } from "react";
import SlideFilterPanel from "./component/SlideFilterPanel";
import { containerPadding, topBarHeightNewBar, url_elements } from "app/utils/constant";


const demoData = [
  {
    id: 1,
    name: "Men's Black Leather Sneakers",
    price: 89.99,
    rating: 4.5,
    reviews: 120,
    imgs: [
      'https://redtape.com/cdn/shop/files/RSO4033_1_8adbcbc1-9b3e-4546-ac39-f44736cbec67.jpg?v=1738330753',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    wishList: true,
    isNew: true
  },
  {
    id: 2,
    name: "Women's Floral Summer Dress",
    price: 49.99,
    rating: 4.8,
    reviews: 250,
    imgs: [
      'https://images.unsplash.com/photo-1594633312681-3e8f1b7d7d0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1591360238969-6b63fc33748e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618378536091-8e5b3e15fa69?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    wishList: false,
    isSale: true,
    realPrice: 69.99
  },
  {
    id: 3,
    name: "Wireless Bluetooth Earbuds",
    price: 59.99,
    rating: 4.7,
    reviews: 180,
    imgs: [
      'https://www.cucoo.lk/wp-content/uploads/2023/10/O1CN01zSbjFM1UxWGnpFCTq_3918402584-0-cib.jpg',
      'https://www.cucoo.lk/wp-content/uploads/2023/10/O1CN018rtxqF1Bs2punxc8R_0-0-cib.jpg',
      'https://images.unsplash.com/photo-1590658268037-6bfcb65a9e38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610797273219-6a93e5dc76e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    wishList: true,
    isNew: true,
    isFlashSale: true,
    endTime: '2025-04-22T18:00:00',
    flashSaleLabel: 'HOT DEAL',
    flashSaleCta: 'Only 50 Left! Grab Now!'
  },
  {
    id: 4,
    name: "Stainless Steel Kitchen Knife Set",
    price: 79.99,
    rating: 4.2,
    reviews: 90,
    imgs: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1587314168485-3236d671a8d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585152915-d208bec867a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585153490-76fb20a0f2b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    wishList: false,
    isSale: true,
    realPrice: 99.99
  },
  {
    id: 5,
    name: "Modern Ceramic Table Lamp",
    price: 129.99,
    rating: 4.6,
    reviews: 210,
    imgs: [
      'https://images.unsplash.com/photo-1567016376408-0226a4d0c1da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1519643381402-8cd0e6650b99?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1598965612318-15b121f4f3e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    wishList: true,
    isFlashSale: true,
    endTime: '2025-04-21T15:00:00',
    flashSaleLabel: 'LIMITED OFFER',
    flashSaleCta: 'Shop Now Before It’s Gone!'
  },
  {
    id: 6,
    name: "Men's Slim Fit Denim Jeans",
    price: 69.99,
    rating: 4.3,
    reviews: 150,
    imgs: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1602293589930-45aad59ba4c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    wishList: false
  },
  {
    id: 7,
    name: "4K Ultra HD Smart TV 55-Inch",
    price: 499.99,
    rating: 4.9,
    reviews: 320,
    imgs: [
      'https://images.unsplash.com/photo-1593787817041-8c61cf58522f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1585064665488-7b5f7b7b7b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1593787817041-8c61cf58522f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    wishList: false,
    isFlashSale: true,
    endTime: '2025-04-23T10:00:00',
    flashSaleLabel: 'BLACK FRIDAY PREVIEW',
    flashSaleCta: 'Limited Stock - Act Fast!'
  },
  {
    id: 8,
    name: "Luxury Memory Foam Mattress",
    price: 799.99,
    rating: 4.4,
    reviews: 95,
    imgs: [
      'https://images.unsplash.com/photo-1566669436140-75a7e4507e51?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572297837169-8737183476ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1616627678955-23467e795c8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595522312557-2503f01460b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    wishList: true,
    isFlashSale: true,
    endTime: '2025-04-22T12:00:00',
    flashSaleLabel: 'SLEEP SALE',
    flashSaleCta: 'Save Big Today!'
  },
  {
    id: 9,
    name: "Portable Camping Tent",
    price: 149.99,
    rating: 4.1,
    reviews: 60,
    imgs: [
      'https://images.unsplash.com/photo-1504280390367-5f8a8d8496c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1505854962493-343e05c4f3f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    wishList: false,
    isFlashSale: true,
    endTime: '2025-04-21T20:00:00',
    flashSaleLabel: 'OUTDOOR DEALS',
    flashSaleCta: 'Gear Up Now!'
  },
  {
    id: 10,
    name: "Smart Fitness Tracker",
    price: 39.99,
    rating: 4.5,
    reviews: 300,
    imgs: [
      'https://images.unsplash.com/photo-1576243345690-4e4a8d8496c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1557935728-e6d1ea834763?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1541535650910-9e4a8b5e28dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1590749963839-c2913e43e9b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    wishList: false,
    isNew: true
  },
  {
    id: 11,
    name: "Wooden Dining Table Set",
    price: 599.99,
    rating: 4.8,
    reviews: 140,
    imgs: [
      'https://images.unsplash.com/photo-1595515842373-8f7a8f12d466?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617806118233-18cf9aeadf5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    wishList: true,
    isFlashSale: true,
    endTime: '2025-04-23T16:00:00',
    flashSaleLabel: 'HOME ESSENTIALS',
    flashSaleCta: 'Upgrade Your Space!'
  }
];

const filterConfig = [
  
  {
    category: 'deliveryOptionsAndOffers',
    options: ['FREE_DELIVERY', 'SALE', 'DISCOUNT'],
    type: 'check'
  },
  {
    category: 'orderTypes',
    options: ['ALL', 'BACKEND_ORDER'],
    type: 'radio'
  },
  {
    category: 'price',
    config: {label: 'Price', min: 50, max: 15000},
    type: 'num_slider'
  },
  {
    category: 'price',
    config: {label: 'Price', min: 50, max: 15000},
    type: 'num_slider'
  },
  {
    category: 'price',
    config: {label: 'Price', min: 50, max: 15000},
    type: 'num_slider'
  },
  {
    category: 'price',
    config: {label: 'Price', min: 50, max: 15000},
    type: 'num_slider'
  },
  {
    category: 'price',
    config: {label: 'Price', min: 50, max: 15000},
    type: 'num_slider'
  },
  {
    category: 'Price',
    config: {label: 'Price', min: 50, max: 15000},
    type: 'num_slider'
  },
  {
    category: 'Price',
    config: {label: 'Price', min: 50, max: 15000},
    type: 'num_slider'
  },
  {
    category: 'Price',
    config: {label: 'Price', min: 50, max: 15000},
    type: 'num_slider'
  },
  {
    category: 'Price',
    config: {label: 'Price', min: 50, max: 15000},
    type: 'num_slider'
  },
  {
    category: 'Price',
    config: {label: 'Price', min: 50, max: 15000},
    type: 'num_slider'
  },
  {
    category: 'price',
    config: {label: 'Price', min: 50, max: 15000},
    type: 'num_slider'
  },
  {
    category: 'price',
    config: {label: 'Price', min: 50, max: 15000},
    type: 'num_slider'
  },
  {
    category: 'price',
    config: {label: 'Price', min: 50, max: 15000},
    type: 'num_slider'
  },
  {
    category: 'price',
    config: {label: 'Price', min: 50, max: 15000},
    type: 'num_slider'
  },
  {
    category: 'price',
    config: {label: 'Price', min: 50, max: 15000},
    type: 'num_slider'
  }
]

const initialState = {
  // filteredProducts: [],
  filteredProducts: demoData,
  filters: filterConfig,
  selectedFilters: {},
  page: 1,
  limit: 100,
  init: false,
  actionType: 'page',
  sort: "POPULAR",
  isPagingBlock: false,
  // totalResults: 0
  totalResults: 1000
}

const filterReducer = (state, action) => {

  switch(action.type){
    case "FILTER": {
      const { filteredProducts, totalResults, filters } = action.payload
      return {...state, page: 1, filteredProducts: filteredProducts, totalResults: totalResults, actionType: 'page', filters: filters?[...state.filters, ...filters]:state.filters, isPagingBlock: false };
    }case "SELECT_FILTER": {
      const { selectedFilters } = action.payload
      return {...state, page: 1, selectedFilters: selectedFilters || {}, actionType: 'filter', isPagingBlock: false };
    }case "INIT": {
      const { page, limit, sort, ...filters } = action.payload
      return {...state, page: page || 1, limit: limit || 100, selectedFilters: filters || {}, init: true, actionType: 'page', sort: sort || state.sort, isPagingBlock: false };
    }case "PAGE": {
      const { filteredProducts, totalResults, filters, isPagingBlock } = action.payload
      return {...state, filteredProducts: [...state.filteredProducts, ...filteredProducts], totalResults: totalResults, actionType: 'page', filters: filters?[...state.filters, ...filters]:state.filters, isPagingBlock: isPagingBlock };
    }case "SET_PAGE": {
      return {...state, page: state.isPagingBlock?state.page:(parseInt(state.page, 10)+1), actionType: 'page' };
    }case "CLEAR_ALL_FILTERS": {
      return {...state, selectedFilters: {}, page: 1, actionType: 'page' };
    }case "SORT": {
      const { sort } = action.payload
      return {...state, sort: sort || state.sort, page: 1, actionType: 'sort', isPagingBlock: false };
    }default: {}
  }
}

const filterCustomDataConfig = {
  retry: true
} 

const ProductPage = () => {

  const [state, dispatch] = useReducer(filterReducer, initialState)

  const filterBtnRef = useRef(null)

  const isXs = useMediaQuery('(max-width:900px)');

  // const [productGridPositionWhenIsXs, setProductGridPositionWhenIsXs] = useState()

  const [showFilters, setShowFilters] = useState(false)

  const [loading, setLoading] = useState(false)

  const { api } = useAxios()

  // const sortBtnRef = useRef(null)

  const getUrlParams = () => {
    const params = {}
    const searchParams = window.location.href.split(url_elements.parameter_start)
    if(!searchParams || searchParams.length===1) return {}
    searchParams[1].split(url_elements.parameter_and)?.forEach(param => {
      const [key, value] = param.split(url_elements.parameter_equal)
      const values = value.split(url_elements.comma)
      if(values) params[key] = values.length===1?values[0]:values
    })
    return params
  }

  useEffect(() => {
    dispatch({ type: "INIT", payload: getUrlParams() })
    const pageEl = document.getElementById("@content_box")
    if(pageEl){
      pageEl.addEventListener("scroll", handleScroll);
      return () => pageEl.removeEventListener("scroll", handleScroll);
    } 
  }, [])

  // useEffect(() => {
  //   if(sortBtnRef.current && isXs) {
  //     const rect = sortBtnRef.current.getBoundingClientRect();
  //     setProductGridPositionWhenIsXs({ top: rect.top }); // Set any boundary or position property as needed
  //   } 
  // }, [sortBtnRef])

  const handleFilterChange = (value) => {
    dispatch({ type: "SELECT_FILTER", payload: {selectedFilters: value} })
  };

  const handleClearAll = () => {
    dispatch({ type: "CLEAR_ALL_FILTERS", payload: {} })
  };

  const handleSort = (value) => {
    dispatch({ type: "SORT", payload: { sort: value } })
  } 

  const handleShowFilters = () => {
    setShowFilters(!showFilters)
  }

  const handleScroll = () => {
    const pageEl = document.getElementById("@content_box")
    if(pageEl){
      const { scrollHeight, scrollTop, clientHeight } = pageEl;

      scrollTop + clientHeight >= scrollHeight && 
      !loading &&
      (state.totalResults === 0 || state.filteredProducts.length < state.totalResults) && 
      !state.isPagingBlock && 
      dispatch({ type: "SET_PAGE", payload: {} })
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    !state.isPagingBlock && state.init && fetchData(controller)
    return () => {
      controller.abort();
    };
  }, [state.page, state.selectedFilters, state.init, state.sort]);

  const generateFilterUrl = () => {
    const selectedFilters = state.selectedFilters
    return `/product/filter-product?page=${state.page}&limit=${state.limit}&sort=${state.sort}${
      selectedFilters && Object.keys(selectedFilters).length>0 ? '&'+Object.keys(selectedFilters).map(key => key+'='+(Array.isArray(selectedFilters[key])?selectedFilters[key].join(','):selectedFilters[key])).join('&') : ''
    }`;
  } 

  const fetchData = async (controller) => {

    if(!window.location.href.match('/product/filter-product')){
      controller.abort()
      return;
    }

    // if(retries===0){
    //   dispatch({ type: state.actionType==='filter' ? "FILTER" : state.actionType==='page' ? "PAGE" : "SORT", payload: {filteredProducts: [], totalResults: state.totalResults, isPagingBlock: true} })
    //   setLoading(false)
    //   //Add manual realoading button for user here
    // }
    setLoading(true) // create a loading effect for this loading
    const filterUrl = generateFilterUrl();
    window.history.pushState({}, '', filterUrl)
    await api.get(filterUrl, {signal: controller.signal, customData: filterCustomDataConfig})
      .then(response => {
        if(response.status===200){
          // dispatch({ type: state.actionType==='filter' ? "FILTER" : state.actionType==='page' ? "PAGE" : "SORT", payload: {...response.data, isPagingBlock: state.actionType!=='page'} })
          dispatch({ type: state.actionType==='filter' ? "FILTER" : state.actionType==='page' ? "PAGE" : "SORT", payload: {filteredProducts: [...state.filteredProducts, ...state.filteredProducts], totalResults: 1000, isPagingBlock: state.actionType!=='page' } })
          controller.abort()
          setLoading(false)
          return;
        }
        if(response.status===204) dispatch({ type: state.actionType==='filter' ? "FILTER" : state.actionType==='page' ? "PAGE" : "SORT", payload: {filteredProducts: [], totalResults: state.totalResults, isPagingBlock: true} })
        controller.abort()
        setLoading(false)  
        return;  
      })
      .catch(error => {
        // triggerCommonErrors(error)
        dispatch({ type: state.actionType==='filter' ? "FILTER" : state.actionType==='page' ? "PAGE" : "SORT", payload: {filteredProducts: [], totalResults: state.totalResults, isPagingBlock: true} })
      })
      .finally(() => {

      })
  };

  return (
      
    <Box>
      <Container 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          ...containerPadding
          // width: '100%',
          // maxWidth: '100%',
        }} 
        maxWidth={'1400px'}
      >
        <Header title="Our Products" subTitle="Explore Our Products" />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            gap: 2,
            marginTop: '2em',
            flexWrap: 'wrap',
          }}
        >
          {
            isXs && 
              <IconButton
                ref={filterBtnRef}
                variant="outlined"
                color="primary"
                onClick={handleShowFilters}
                sx={{
                  border: `1px solid ${themeColors.red.palette.primary.main}`,  // Simulating outlined variant
                  borderRadius: 2,
                  color: "#000",
                  width: 'max-width',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: 'flex',  // Flex layout for alignment
                  justifyContent: 'space-between',  // Ensures space between text and end icon
                  alignItems: 'center',  // Vertically centers the content
                  backgroundColor: '#fff',
                }}
              >
                {/* Start Icon */}
                <FilterIcon sx={{ mr: 1 }} />  {/* Add margin-right to give space from text */}

                {/* Text */}
                <Typography variant="body2" fontSize={'13px'} sx={{ flexGrow: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {/* {showFilters?'Hide filters':'Show filters'} */}
                  Filters
                </Typography>
              </IconButton>
          }
          <SortButton sort={state.sort} handleSort={handleSort} />
        </Box>
        {
          isXs && <SlideFilterPanel filterBtnRef={filterBtnRef} showFilters={showFilters} handleClearAll={handleClearAll} selectedFilters={state.selectedFilters} filters={state.filters} handleFilterChange={handleFilterChange} handleShowFilters={handleShowFilters} />
        }
        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: '1em',
            // marginTop: '2em',
              // width: '100dvw', 
            minHeight: '100dvh',
          }}
        >
          {
            !isXs && (
              <Box
                sx={{ position: 'sticky', top: 0, width: '350px'}}
              >
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                  <Typography variant="h5" gutterBottom>
                    Filters
                  </Typography>
                  <Button
                    variant="text"
                    color="primary"
                    onClick={handleClearAll}
                    disabled={Object.keys(state.selectedFilters).length === 0}
                  >
                    Clear All
                  </Button>
                </Box>

                <FilterBar
                  filters={state.filters}
                  handleFilterChange={handleFilterChange}
                  selectedFilters={state.selectedFilters}
                  maxHeight={`calc(100dvh - ${topBarHeightNewBar+9.1}px)`}
                />
              </Box>
            )
          }
          {/* Products section */}
          <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} pl={0} pr={0} pt={3} pb={3} width={'100%'}>
            <ProductGrid products={state.filteredProducts}/>
          </Box>
        </Grid>
      </Container>
      <br></br>
      <Footer />
    </Box>

  );
};

export default ProductPage;
