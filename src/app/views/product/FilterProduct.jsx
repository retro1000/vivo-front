// ProductPage.jsx
import React, { useState } from "react";
import { Box, Typography, Button, Grid, Container } from "@mui/material";
import { Header, Footer, ProductGrid } from "app/components";
import SortButton from "./component/SortButton";
import SearchBar from "./component/SearchBar";
import { FilterList } from "@mui/icons-material";
import FilterBar, { filtersConfig } from "./component/Filtering";

const ProductPage = () => {
  const [filters, setFilters] = useState({
    positionExterior: false,
    positionInterior: false,
    positionInteriorandExterior: false,
    producttypeCleaner: false,
    producttypePaint: false,
    producttypeUndercoat: false,
    producttypeVarnish: false,
    producttypeWaterproofing: false,
    roomtypesBathroom: false,
    roomtypesBedroom: false,
    roomtypesChildrensRoom: false,
    roomtypesDiningRoom: false,
    roomtypesHallway: false,
    roomtypesHomeOffice: false,
    roomtypesKitchen: false,
    roomtypesLivingRoom: false,
    surfaceBluestone: false,
    surfaceDoors: false,
    surfaceFurniture: false,
    surfaceMetal: false,
    surfaceWalls: false,
    surfaceWindows: false,
    surfaceWood: false,
    finishGloss: false,
    finishGlossSemiGlossMatt: false,
    finishHighGloss: false,
    finishLowSheen: false,
    finishMatt: false,
    finishMidSheen: false,
    finishNA: false,
    finishSemiGloss: false,
  });

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.checked,
    });
  };

  const handleClearAll = () => {
    const resetFilters = {};
    Object.keys(filters).forEach((key) => {
      resetFilters[key] = false;
    });
    setFilters(resetFilters);
  };

  const [filteredProducts, setFilteredProducts] = useState(
    [
      {
        id: 1,
        name: "Dummy Paint",
        price: "$360",
        rating: 3.6,
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
        name: " Paint Dummy Paint Dummy Paint Dummy Paint Dummy Paint Dummy Paint",
        price: "LKR 5990.00",
        rating: 2.8,
        reviews: 145,
        imgs: ['/assets/images/2099.jpg', '/assets/images/8735.jpg', '/assets/images/amazon-2.png', '/assets/images/demo_home_two.jpg'],
        wishList: true,
        isNew: true,
        isSale: true,
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
  )

  return (
      
    <Box>
      <Container sx={{display: 'flex', flexDirection: 'column'}}>
        {/* <Grid container spacing={3}> */}
            <br />
            <Header title="Our Products" subTitle="Explore Our Products"/>
            <Box 
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                gap: 2,
                marginTop: '2em',
                flexWrap: 'wrap'
              }}
            >
              <SortButton/>
              {/* <SearchBar/> */}
            </Box>
            <Grid sx={{display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap:'1em', marginTop: '2em'}}>
              <Box sx={{ position: 'sticky', width: '30%', mr: 2 }}>
                <Typography variant="h5" gutterBottom>
                  Filters
                </Typography>
                <Button variant="text" color="primary" onClick={handleClearAll}>
                  Clear All
                </Button>
                {/* <FilterList
                  filters={filters}
                  filtersConfig={filtersConfig}
                  handleFilterChange={handleFilterChange}
                /> */}
                <FilterBar filters={filters} handleFilterChange={handleFilterChange} handleClearAll={handleClearAll}/>
              </Box>
              <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} padding={5}>
                <ProductGrid products={filteredProducts}/>
              </Box>
            </Grid>
        {/* </Grid> */}
      </Container>
      <Footer />

    </Box>
  );
};

export default ProductPage;
