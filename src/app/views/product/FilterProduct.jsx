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
import { containerPadding, topBarHeightNewBar } from "app/utils/constant";


const demoData = [
  {
    id: 1,
    name: "Dummy Paint",
    price: "$360",
    rating: 4.5,
    reviews: 95,
    imgs: ['https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/316809652_205840441831581_6063038031546258878_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGAXb_2AebXn2TMzPCu7fcgg-DpxVWTMEmD4OnFVZMwSetg3Ccz6IoXXBV_m5-7sGIwfMuPl8BqehlKxq4e2RWu&_nc_ohc=B0ggwEGrDeYQ7kNvgEXYxag&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=AFnM6Zhn84iriQAdvwfxSAK&oh=00_AYB5s9jCOFaJrJ7-7vazEOvNv9mKBX6ZTKzmPaBsgSh_-g&oe=67590FE4', 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/317079065_205840545164904_2299339823205142298_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeG7s0uvr7Uf3uc2RU-wPp_4jlmJEzfT3lOOWYkTN9PeU9oF-J6zWXawmuUdMnDr1hVf4jQPckYYNRGeiD-Rm0AW&_nc_ohc=ZVn6l_OOzcgQ7kNvgEwy6pQ&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=ANXzE2ugbke75qDxJMHzReH&oh=00_AYAncH1nhlpizloJTBiCk4yH1oE_I_DJt5uNY2H-Pa43tQ&oe=67590C2F', 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/316951045_205840495164909_8345064233952031565_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeH-CVZrOoj4XzBFwEkniBWDoEjpy5l1wiWgSOnLmXXCJeYVpqtSA-28FpafslseQyNt20c-XndwNfc5bi9nArR7&_nc_ohc=l2nU-LyVYfMQ7kNvgHWZglK&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=A4c55aQLis-XP7F-ndY8aAb&oh=00_AYA-Fp5eG02WW_VHN-eghFObvWW-jeaY91561xG9geHpow&oe=675915B0', 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/316959950_205840451831580_7227902396481251709_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEn8q2_h-YqxxxUIuWYmYVrlnAtDtR4HcKWcC0O1HgdwjmvYzJF7bXE2Tj_Qox11CDt3BLd4opkL8msjGJ0ZBOj&_nc_ohc=TyzrmUrSKYoQ7kNvgHbcqX3&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=A5eu_RLRZe4iQTkieyj-bwF&oh=00_AYCXSgK5YbqJ6ZE7hQuZTDTvNgU9hvbR_QpO0pZ_A7cXrA&oe=675914AF', 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/317084755_205840505164908_5362232490221749378_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeH3hwQjS8huf7K5y4eh_E3z5TrV5UGEv0DlOtXlQYS_QHmqxqsT6Fqwj1cHraSs-SNAKY9ntc53taiMoOjRxZmW&_nc_ohc=vXXm_PsZxcUQ7kNvgHtQCZJ&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=A5UlGeZJbYM3gBmTzo7dDq6&oh=00_AYB7BjhR513SILmSeVwxd-ejzkF0WLahTCVowpCtANudPA&oe=67590F68'],
    wishList: true
  },
  {
    id: 2,
    name: "Dummy Paint",
    price: "$700",
    rating: 4.8,
    reviews: 325,
    imgs: ['https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/288710953_175349728213986_5909586314590188913_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHkm1zN0neGzrTTbOViyzRObFppJaY45aZsWmklpjjlptTazpaJSWN2601Yt37b-SLr4bpg5pYdzEeEwkhrW_lC&_nc_ohc=15Wx0LpCJgwQ7kNvgE8KfIi&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=A-yvgNA3mcxjPmLAU6fJh3Z&oh=00_AYAsc-_sxQJDzlzagsYWbn9qO46xujR0NM87FE2hj5VzIg&oe=67590024', 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/288734183_175349638213995_1958045608063445439_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGyFfrzCCYA4LFny3xGRv4A5GOc_hlyI0zkY5z-GXIjTPukE202DAuDMR_XXSLyIwUfmrwdBeb6s9DmhtCGVTy4&_nc_ohc=IGfg6hX5oBIQ7kNvgGhIioP&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=A4wsjV2S5mm_fMeNNnkMmG9&oh=00_AYDZMpYBJ2VJ1FtZNVuTZs8g1K0LfswXoKinirqtrU0xcQ&oe=6758E5E0', 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/288845037_175349751547317_5254387529075225888_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEe0dRasnayYsyyCFITfr6r2xnbOCVElvTbGds4JUSW9AclGGM3q2BGiVhjCYV9wRqOEd8k_4NOih95q4bbsPKv&_nc_ohc=pvr0frurb5UQ7kNvgHcBd6B&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=A9wsUdSjZxqZbGY3P-gAa92&oh=00_AYBy7pLD31bwzxIF_FSW9fWdQSLlZn49MxPvzQ9_rfAd2g&oe=67590D3E', 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/288859994_175349611547331_1652431214493675204_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGUSj8TzkuGhEHsYbi9yHBeMDjs6kXRJ6cwOOzqRdEnp_N01ULj17WtpVt9tFsu9730tn02rdfTbRHeNHVXXTP9&_nc_ohc=I0gz-fCQ9U0Q7kNvgEFEMdm&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=A32TLCh-ZSVUbOdsyVF5P2u&oh=00_AYCMDpRjgCIt9N3nqtA3nTi6Sxww-Re2Fi9_iddeTULIRw&oe=67590F64', 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/288710953_175349728213986_5909586314590188913_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHkm1zN0neGzrTTbOViyzRObFppJaY45aZsWmklpjjlptTazpaJSWN2601Yt37b-SLr4bpg5pYdzEeEwkhrW_lC&_nc_ohc=15Wx0LpCJgwQ7kNvgE8KfIi&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=A-yvgNA3mcxjPmLAU6fJh3Z&oh=00_AYAsc-_sxQJDzlzagsYWbn9qO46xujR0NM87FE2hj5VzIg&oe=67590024'],
    wishList: false

  },
  {
    id: 3,
    name: "Dummy Paint Dummy Paint Dummy Paint Dummy Paint",
    price: "LKR 5990.00",
    rating: 4.7,
    reviews: 145,
    imgs: ['https://www.cucoo.lk/wp-content/uploads/2023/10/O1CN01zSbjFM1UxWGnpFCTq_3918402584-0-cib.jpg', 'https://www.cucoo.lk/wp-content/uploads/2023/10/O1CN018rtxqF1Bs2punxc8R_0-0-cib.jpg', 'https://www.cucoo.lk/wp-content/uploads/2023/10/O1CN01zSbjFM1UxWGnpFCTq_3918402584-0-cib.jpg', 'https://www.cucoo.lk/wp-content/uploads/2023/10/O1CN01ZcjbMx1UxWGi1vlsb_3918402584-0-cib.jpg', 'https://www.cucoo.lk/wp-content/uploads/2023/10/O1CN01yiHly81UxWGdJrkQy_3918402584-0-cib.jpg'],
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
    imgs: ['https://www.cucoo.lk/wp-content/uploads/2023/10/O1CN01caTDY61UxWHEYTExP_3918402584-0-cib.jpg', 'https://www.cucoo.lk/wp-content/uploads/2023/10/O1CN01PpiVhh1UxWHDjTPMF_3918402584-0-cib.jpg', 'https://www.cucoo.lk/wp-content/uploads/2023/10/O1CN01nmIDyS1UxWH4FSi82_3918402584-0-cib.jpg', 'https://www.cucoo.lk/wp-content/uploads/2023/10/O1CN01JnFyNo1UxWH7KmZDq_3918402584-0-cib.jpg', 'https://www.cucoo.lk/wp-content/uploads/2023/10/O1CN013zcgkE1UxWHAWuDw8_3918402584-0-cib.jpg'],
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
          <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} padding={3} width={'100%'}>
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
