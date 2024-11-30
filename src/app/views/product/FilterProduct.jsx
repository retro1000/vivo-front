// ProductPage.jsx
import React, { useState } from "react";
import { useTheme, Box, Typography, Button, Grid, Container, useMediaQuery, IconButton, Slide } from "@mui/material";
import { Header, Footer } from "app/components";
import SortButton from "./component/SortButton";
import SearchBar from "./component/SearchBar";
import ProductGrid from "./component/ProductGrid";
import FilterBar from "./component/Filtering";
import { useEffect } from "react";
import { useAxios } from "app/hooks/useAxios";
import { useLocation } from "react-router-dom";
import { useReducer } from "react";
import { useNotistack } from "app/hooks/useNotistack";

import FilterIcon from '@mui/icons-material/Tune'
import { themeColors } from "app/components/MatxTheme/themeColors";
import { useRef } from "react";
import SlideFilterPanel from "./component/SlideFilterPanel";


const demoData = [
  {
    id: 1,
    name: "Dummy Paint",
    price: "$360",
    rating: 4.5,
    reviews: 95,
    imgs: ['/assets/images/2099.jpg', '/assets/images/8735.jpg', '/assets/images/amazon-2.png', '/assets/images/demo_home_two.jpg'],
    wishList: true
  },
  {
    id: 2,
    name: "Dummy Paint",
    price: "$700",
    rating: 4.8,
    reviews: 325,
    imgs: ['/assets/images/2099.jpg', '/assets/images/8735.jpg', '/assets/images/amazon-2.png', '/assets/images/demo_home_two.jpg'],
    wishList: false

  },
  {
    id: 3,
    name: "Dummy Paint Dummy Paint Dummy Paint Dummy Paint",
    price: "LKR 5990.00",
    rating: 4.7,
    reviews: 145,
    imgs: ['/assets/images/2099.jpg', '/assets/images/2099.jpg', '/assets/images/2099.jpg', '/assets/images/2099.jpg', '/assets/images/2099.jpg', '/assets/images/2099.jpg', '/assets/images/2099.jpg', '/assets/images/2099.jpg', '/assets/images/8735.jpg', '/assets/images/amazon-2.png', '/assets/images/demo_home_two.jpg'],
    wishList: true,
    isNew: true,
    realPrice: 'LKR 6990.00'

  },
  {
    id: 4,
    name: "dummy paint",
    price: "$1160",
    rating: 4.0,
    reviews: 35,
    imgs: ['/assets/images/2099.jpg', '/assets/images/8735.jpg', '/assets/images/amazon-2.png', '/assets/images/demo_home_two.jpg'],
    wishList: false

  },
  {
    id: 5,
    name: "dummy paint",
    price: "$1160",
    rating: 4.0,
    reviews: 35,
    imgs: ['/assets/images/2099.jpg', '/assets/images/8735.jpg', '/assets/images/amazon-2.png', '/assets/images/demo_home_two.jpg'],
    wishList: false

  }, {
    id: 6,
    name: "dummy paint",
    price: "$1160",
    rating: 4.0,
    reviews: 35,
    imgs: ['/assets/images/2099.jpg', '/assets/images/8735.jpg', '/assets/images/amazon-2.png', '/assets/images/demo_home_two.jpg'],
    wishList: false

  }, {
    id: 7,
    name: "dummy paint",
    price: "$1160",
    rating: 4.0,
    reviews: 35,
    imgs: ['/assets/images/2099.jpg', '/assets/images/8735.jpg', '/assets/images/amazon-2.png', '/assets/images/demo_home_two.jpg'],
    wishList: false

  }, {
    id: 8,
    name: "dummy paint",
    price: "$1160",
    rating: 4.0,
    reviews: 35,
    imgs: ['/assets/images/2099.jpg', '/assets/images/8735.jpg', '/assets/images/amazon-2.png', '/assets/images/demo_home_two.jpg'],
    wishList: false

  }, {
    id: 9,
    name: "dummy paint",
    price: "$1160",
    rating: 4.0,
    reviews: 35,
    imgs: ['/assets/images/2099.jpg', '/assets/images/8735.jpg', '/assets/images/amazon-2.png', '/assets/images/demo_home_two.jpg'],
    wishList: false

  }, {
    id: 10,
    name: "dummy paint",
    price: "$1160",
    rating: 4.0,
    reviews: 35,
    imgs: ['/assets/images/2099.jpg', '/assets/images/8735.jpg', '/assets/images/amazon-2.png', '/assets/images/demo_home_two.jpg'],
    wishList: false

  }, {
    id: 11,
    name: "dummy paint",
    price: "$1160",
    rating: 4.0,
    reviews: 35,
    imgs: ['/assets/images/2099.jpg', '/assets/images/8735.jpg', '/assets/images/amazon-2.png', '/assets/images/demo_home_two.jpg'],
    wishList: false

  },
]

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

const ProductPage = () => {

  const [state, dispatch] = useReducer(filterReducer, initialState)

  const filterBtnRef = useRef(null)

  const theme = useTheme();

  const isXs = useMediaQuery('(max-width:900px)');

  const [productGridPositionWhenIsXs, setProductGridPositionWhenIsXs] = useState()

  const [showFilters, setShowFilters] = useState(false)

  const [loading, setLoading] = useState(false)

  const { api } = useAxios()

  const { triggerCommonErrors } = useNotistack()

  // const sortBtnRef = useRef(null)

  const getUrlParams = () => {
    const params = {}
    const searchParams = window.location.href.split('?')
    if(!searchParams || searchParams.length===1) return {}
    searchParams[1].split('&')?.forEach(param => {
      const [key, value] = param.split('=')
      const values = value.split(',')
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

  const fetchData = async (controller, retries=5, delay=1000) => {
    // controller.abort()
    if(retries===0){
      dispatch({ type: state.actionType==='filter' ? "FILTER" : state.actionType==='page' ? "PAGE" : "SORT", payload: {filteredProducts: [], totalResults: state.totalResults, isPagingBlock: true} })
      setLoading(false)
      //Add manual realoading button for user here
    }
    setLoading(true) // create a loading effect for this loading
    const filterUrl = generateFilterUrl();
    window.history.pushState({}, '', filterUrl)
    await api.get(filterUrl, {signal: controller.signal})
      .then(response => {
        if(response.status===200){
          // dispatch({ type: state.actionType==='filter' ? "FILTER" : state.actionType==='page' ? "PAGE" : "SORT", payload: {...response.data, isPagingBlock: state.actionType!=='page'} })
          dispatch({ type: state.actionType==='filter' ? "FILTER" : state.actionType==='page' ? "PAGE" : "SORT", payload: {filteredProducts: [...state.filteredProducts, ...state.filteredProducts], totalResults: 1000, isPagingBlock: state.actionType!=='page' } })
          setLoading(false)
        }
        if(response.status===204) dispatch({ type: state.actionType==='filter' ? "FILTER" : state.actionType==='page' ? "PAGE" : "SORT", payload: {filteredProducts: [], totalResults: state.totalResults, isPagingBlock: true} })
        controller.abort()  
        return;  
      })
      .catch(error => {
        // triggerCommonErrors(error)
        dispatch({ type: state.actionType==='filter' ? "FILTER" : state.actionType==='page' ? "PAGE" : "SORT", payload: {filteredProducts: [], totalResults: state.totalResults, isPagingBlock: true} })
      })
      .finally(() => {

      })

    // Wait for the delay (increasing with each retry) before trying again
    await new Promise(resolve => setTimeout(resolve, delay));

    // Retry again, with an increased delay (exponential backoff)
    return fetchData(controller, retries - 1, delay * 2);
  };

  return (
      
    <Box sx={isXs && showFilters ? {pointerEvents: "none", overflowY: 'hidden'}:{}}>
      <Container sx={{ display: 'flex', flexDirection: 'column' }} maxWidth={'1400px'}>
        <br />
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
            marginTop: '2em',
            width: '100dvw',
            minHeight: '100dvh',
          }}
        >
          {
            !isXs && (
              <Box
                sx={{ position: 'sticky', top: 0, width: '20%', maxHeight: '100vh', overflowY: 'auto' }}
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
                />
              </Box>
            )
          }
          {/* Products section */}
          <Box position={'relative'} display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} padding={5} width={'100%'} >
            <ProductGrid products={state.filteredProducts} sx={{ maxWidth: '100%'}} maxWidth={'100%'}/>
          </Box>
        </Grid>
      </Container>
      <br></br>
      <Footer />
    </Box>

  );
};

export default ProductPage;
