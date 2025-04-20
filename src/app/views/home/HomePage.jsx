import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import CategorySec from "./component/CategorySec";
import LetsPaintHero from "./component/BottomHero";
import {
  List,
  Box,
  CardMedia,
  Grid,
  ListItem,
  ListItemText,
  Typography,
  ListItemIcon,
  Popover,
} from "@mui/material";
import {
  Footer,
  ProductCard,
  ProductGrid,
  SwiperSliderHeroAuto,
} from "app/components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProductSlider from "app/components/SwiperSlider/ProductSlider";
import ProductGallery from "./component/ProductGallery";
import { scrollBarThin } from "app/utils/constant";
import * as Icons from "@mui/icons-material"; // Import all Material-UI icons dynamically
import { useRef } from "react";
import { useEffect } from "react";
import { useAxios } from "app/hooks/useAxios";
import { endpoints, homepage_product_types, position_types, query_parameters, services, status, url_query_param_and, url_query_param_comma, url_query_param_equal, url_query_param_start, url_separator } from "app/constants";

const styles = {
  paddingTop: 0, // Applies to all breakpoints
  paddingRight: {
    xs: 3,
    md: 5,
    lg: 10,
  },
  paddingBottom: {
    xs: 3,
    md: 5,
    lg: 10,
  },
  paddingLeft: {
    xs: 3,
    md: 5,
    lg: 10,
  },
  display: "flex",
  flexDirection: "column",
};

// Sample category data with root, L1, and L2 levels
const categories = [
  {
    root: "Women's Fashion",
    l1: [
      {
        name: "Clothing",
        l2: [
          {
            name: "Dresses",
            image:
              "https://img.kwcdn.com/product/fancy/916f5917-58fd-4220-866b-f6ed7824d176.jpg?imageView2/2/w/800/q/70/format/webp",
          },
          {
            name: "Blouses & Shirts",
            image:
              "https://img.kwcdn.com/product/fancy/916f5917-58fd-4220-866b-f6ed7824d176.jpg?imageView2/2/w/800/q/70/format/webp",
          },
          {
            name: "Pants",
            image:
              "https://img.kwcdn.com/product/fancy/916f5917-58fd-4220-866b-f6ed7824d176.jpg?imageView2/2/w/800/q/70/format/webp",
          },
        ],
      },
      {
        name: "Shoes",
        l2: [
          {
            name: "Sneakers",
            image:
              "https://img.kwcdn.com/product/fancy/916f5917-58fd-4220-866b-f6ed7824d176.jpg?imageView2/2/w/800/q/70/format/webp",
          },
          {
            name: "Heels",
            image:
              "https://img.kwcdn.com/product/fancy/916f5917-58fd-4220-866b-f6ed7824d176.jpg?imageView2/2/w/800/q/70/format/webp",
          },
        ],
      },
    ],
  },
  // {
  //   root: "Women's Fashion",
  //   l1: [
  //     {
  //       name: "Clothing",
  //       l2: [
  //         { name: "Dresses", image: "https://via.placeholder.com/100" },
  //         {
  //           name: "Blouses & Shirts",
  //           image: "https://via.placeholder.com/100",
  //         },
  //         { name: "Pants", image: "https://via.placeholder.com/100" },
  //       ],
  //     },
  //     {
  //       name: "Shoes",
  //       l2: [
  //         { name: "Sneakers", image: "https://via.placeholder.com/100" },
  //         { name: "Heels", image: "https://via.placeholder.com/100" },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   root: "Women's Fashion",
  //   l1: [
  //     {
  //       name: "Clothing",
  //       l2: [
  //         { name: "Dresses", image: "https://via.placeholder.com/100" },
  //         {
  //           name: "Blouses & Shirts",
  //           image: "https://via.placeholder.com/100",
  //         },
  //         { name: "Pants", image: "https://via.placeholder.com/100" },
  //       ],
  //     },
  //     {
  //       name: "Shoes",
  //       l2: [
  //         { name: "Sneakers", image: "https://via.placeholder.com/100" },
  //         { name: "Heels", image: "https://via.placeholder.com/100" },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   root: "Women's Fashion",
  //   l1: [
  //     {
  //       name: "Clothing",
  //       l2: [
  //         { name: "Dresses", image: "https://via.placeholder.com/100" },
  //         {
  //           name: "Blouses & Shirts",
  //           image: "https://via.placeholder.com/100",
  //         },
  //         { name: "Pants", image: "https://via.placeholder.com/100" },
  //       ],
  //     },
  //     {
  //       name: "Shoes",
  //       l2: [
  //         { name: "Sneakers", image: "https://via.placeholder.com/100" },
  //         { name: "Heels", image: "https://via.placeholder.com/100" },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   root: "Women's Fashion",
  //   l1: [
  //     {
  //       name: "Clothing",
  //       l2: [
  //         { name: "Dresses", image: "https://via.placeholder.com/100" },
  //         {
  //           name: "Blouses & Shirts",
  //           image: "https://via.placeholder.com/100",
  //         },
  //         { name: "Pants", image: "https://via.placeholder.com/100" },
  //       ],
  //     },
  //     {
  //       name: "Shoes",
  //       l2: [
  //         { name: "Sneakers", image: "https://via.placeholder.com/100" },
  //         { name: "Heels", image: "https://via.placeholder.com/100" },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   root: "Women's Fashion",
  //   l1: [
  //     {
  //       name: "Clothing",
  //       l2: [
  //         { name: "Dresses", image: "https://via.placeholder.com/100" },
  //         {
  //           name: "Blouses & Shirts",
  //           image: "https://via.placeholder.com/100",
  //         },
  //         { name: "Pants", image: "https://via.placeholder.com/100" },
  //       ],
  //     },
  //     {
  //       name: "Shoes",
  //       l2: [
  //         { name: "Sneakers", image: "https://via.placeholder.com/100" },
  //         { name: "Heels", image: "https://via.placeholder.com/100" },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   root: "Women's Fashion",
  //   l1: [
  //     {
  //       name: "Clothing",
  //       l2: [
  //         { name: "Dresses", image: "https://via.placeholder.com/100" },
  //         {
  //           name: "Blouses & Shirts",
  //           image: "https://via.placeholder.com/100",
  //         },
  //         { name: "Pants", image: "https://via.placeholder.com/100" },
  //       ],
  //     },
  //     {
  //       name: "Shoes",
  //       l2: [
  //         { name: "Sneakers", image: "https://via.placeholder.com/100" },
  //         { name: "Heels", image: "https://via.placeholder.com/100" },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   root: "Women's Fashion",
  //   l1: [
  //     {
  //       name: "Clothing",
  //       l2: [
  //         { name: "Dresses", image: "https://via.placeholder.com/100" },
  //         {
  //           name: "Blouses & Shirts",
  //           image: "https://via.placeholder.com/100",
  //         },
  //         { name: "Pants", image: "https://via.placeholder.com/100" },
  //       ],
  //     },
  //     {
  //       name: "Shoes",
  //       l2: [
  //         { name: "Sneakers", image: "https://via.placeholder.com/100" },
  //         { name: "Heels", image: "https://via.placeholder.com/100" },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   root: "Women's Fashion",
  //   l1: [
  //     {
  //       name: "Clothing",
  //       l2: [
  //         { name: "Dresses", image: "https://via.placeholder.com/100" },
  //         {
  //           name: "Blouses & Shirts",
  //           image: "https://via.placeholder.com/100",
  //         },
  //         { name: "Pants", image: "https://via.placeholder.com/100" },
  //       ],
  //     },
  //     {
  //       name: "Shoes",
  //       l2: [
  //         { name: "Sneakers", image: "https://via.placeholder.com/100" },
  //         { name: "Heels", image: "https://via.placeholder.com/100" },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   root: "Women's Fashion",
  //   l1: [
  //     {
  //       name: "Clothing",
  //       l2: [
  //         { name: "Dresses", image: "https://via.placeholder.com/100" },
  //         {
  //           name: "Blouses & Shirts",
  //           image: "https://via.placeholder.com/100",
  //         },
  //         { name: "Pants", image: "https://via.placeholder.com/100" },
  //       ],
  //     },
  //     {
  //       name: "Shoes",
  //       l2: [
  //         { name: "Sneakers", image: "https://via.placeholder.com/100" },
  //         { name: "Heels", image: "https://via.placeholder.com/100" },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   root: "Women's Fashion",
  //   l1: [
  //     {
  //       name: "Clothing",
  //       l2: [
  //         { name: "Dresses", image: "https://via.placeholder.com/100" },
  //         {
  //           name: "Blouses & Shirts",
  //           image: "https://via.placeholder.com/100",
  //         },
  //         { name: "Pants", image: "https://via.placeholder.com/100" },
  //       ],
  //     },
  //     {
  //       name: "Shoes",
  //       l2: [
  //         { name: "Sneakers", image: "https://via.placeholder.com/100" },
  //         { name: "Heels", image: "https://via.placeholder.com/100" },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   root: "Women's Fashion",
  //   l1: [
  //     {
  //       name: "Clothing",
  //       l2: [
  //         { name: "Dresses", image: "https://via.placeholder.com/100" },
  //         {
  //           name: "Blouses & Shirts",
  //           image: "https://via.placeholder.com/100",
  //         },
  //         { name: "Pants", image: "https://via.placeholder.com/100" },
  //       ],
  //     },
  //     {
  //       name: "Shoes",
  //       l2: [
  //         { name: "Sneakers", image: "https://via.placeholder.com/100" },
  //         { name: "Heels", image: "https://via.placeholder.com/100" },
  //       ],
  //     },
  //   ],
  // },
  {
    root: "Men's Fashion",
    l1: [
      {
        name: "Clothing",
        l2: [
          { name: "Shirts", image: "https://via.placeholder.com/100" },
          { name: "Pants", image: "https://via.placeholder.com/100" },
        ],
      },
    ],
  },
  {
    root: "Electronics",
    l1: [
      {
        name: "Phones",
        l2: [
          { name: "Smartphones", image: "https://via.placeholder.com/100" },
          { name: "Accessories", image: "https://via.placeholder.com/100" },
        ],
      },
    ],
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  const { api, apiNonAuth } = useAxios();

  const homePageDetails = {
    banners: {
      topBanners: [],
      middleBanners: []
    },
    categoryDetails: {
      hoveredCategory: '',
      data: []
    },
    popularProducts: [],
    moreToLoveProducts: {
      size: 30,
      offset: 0,
      data: []
    },
    forYouProducts: [],
    productTabDetails: {
      todaysDeals: [],
      new: [],
      dailyPicks: [],
    },

  }

  const [showProducts, setShowProducts] = useState([
    {
      id: 1,
      name: "Dummy Paint",
      price: "$360",
      rating: 4.5,
      reviews: 95,
      imgs: [
        "https://img.kwcdn.com/product/fancy/6423ac13-8f2f-48b6-b818-def2d1fbdf96.jpg?imageView2/2/w/1300/q/90/format/webp",
        "/assets/images/8735.jpg",
        "/assets/images/amazon-2.png",
        "/assets/images/demo_home_two.jpg",
      ],
      wishList: true,
    },
    {
      id: 2,
      name: "Dummy Paint",
      price: "$700",
      rating: 4.8,
      reviews: 325,
      imgs: [
        "/assets/images/2099.jpg",
        "/assets/images/8735.jpg",
        "/assets/images/amazon-2.png",
        "/assets/images/demo_home_two.jpg",
      ],
      wishList: false,
    },
    {
      id: 3,
      name: "Dummy Paint Dummy Paint Dummy Paint Dummy Paint Paint Dummy Paint",
      price: "LKR 5990.00",
      rating: 4.7,
      reviews: 145,
      imgs: [
        "/assets/images/2099.jpg",
        "/assets/images/2099.jpg",
        "/assets/images/2099.jpg",
        "/assets/images/2099.jpg",
        "/assets/images/2099.jpg",
        "/assets/images/2099.jpg",
        "/assets/images/2099.jpg",
        "/assets/images/2099.jpg",
        "/assets/images/8735.jpg",
        "/assets/images/amazon-2.png",
        "/assets/images/demo_home_two.jpg",
      ],
      wishList: true,
      isNew: true,
      isSale: true,
      realPrice: "LKR 6990.00",
    },
    {
      id: 4,
      name: "dummy paint",
      price: "$1160",
      rating: 4.0,
      reviews: 35,
      imgs: [
        "/assets/images/2099.jpg",
        "/assets/images/8735.jpg",
        "/assets/images/amazon-2.png",
        "/assets/images/demo_home_two.jpg",
      ],
      wishList: false,
    },
    {
      id: 5,
      name: "dummy paint",
      price: "$1160",
      rating: 4.0,
      reviews: 35,
      imgs: [
        "/assets/images/2099.jpg",
        "/assets/images/8735.jpg",
        "/assets/images/amazon-2.png",
        "/assets/images/demo_home_two.jpg",
      ],
      wishList: false,
    },
    {
      id: 6,
      name: "dummy paint",
      price: "$1160",
      rating: 4.0,
      reviews: 35,
      imgs: [
        "/assets/images/2099.jpg",
        "/assets/images/8735.jpg",
        "/assets/images/amazon-2.png",
        "/assets/images/demo_home_two.jpg",
      ],
      wishList: false,
    },
    {
      id: 7,
      name: "dummy paint",
      price: "$1160",
      rating: 4.0,
      reviews: 35,
      imgs: [
        "/assets/images/2099.jpg",
        "/assets/images/8735.jpg",
        "/assets/images/amazon-2.png",
        "/assets/images/demo_home_two.jpg",
      ],
      wishList: false,
    },
    {
      id: 8,
      name: "dummy paint",
      price: "$1160",
      rating: 4.0,
      reviews: 35,
      imgs: [
        "/assets/images/2099.jpg",
        "/assets/images/8735.jpg",
        "/assets/images/amazon-2.png",
        "/assets/images/demo_home_two.jpg",
      ],
      wishList: false,
    },
    {
      id: 9,
      name: "dummy paint",
      price: "$1160",
      rating: 4.0,
      reviews: 35,
      imgs: [
        "/assets/images/2099.jpg",
        "/assets/images/8735.jpg",
        "/assets/images/amazon-2.png",
        "/assets/images/demo_home_two.jpg",
      ],
      wishList: false,
    },
    {
      id: 10,
      name: "dummy paint",
      price: "$1160",
      rating: 4.0,
      reviews: 35,
      imgs: [
        "/assets/images/2099.jpg",
        "/assets/images/8735.jpg",
        "/assets/images/amazon-2.png",
        "/assets/images/demo_home_two.jpg",
      ],
      wishList: false,
    },
    {
      id: 11,
      name: "dummy paint",
      price: "$1160",
      rating: 4.0,
      reviews: 35,
      imgs: [
        "/assets/images/2099.jpg",
        "/assets/images/8735.jpg",
        "/assets/images/amazon-2.png",
        "/assets/images/demo_home_two.jpg",
      ],
      wishList: false,
    },
  ]);

  const [popularProducts, setPopularProducts] = useState([
    {
      id: 1,
      name: "Dummy Paint",
      price: "$360",
      rating: 4.5,
      reviews: 95,
      imgs: "/assets/images/demo_home_two.jpg",
      wishList: true,
    },
    {
      id: 1,
      name: "Dummy Paint",
      price: "$360",
      rating: 4.5,
      reviews: 95,
      imgs: "/assets/images/demo_home_two.jpg",
      wishList: true,
    },
    {
      id: 1,
      name: "Dummy Paint",
      price: "$360",
      rating: 4.5,
      reviews: 95,
      imgs: "/assets/images/demo_home_two.jpg",
      wishList: true,
    },
    {
      id: 1,
      name: "Dummy Paint",
      price: "$360",
      rating: 4.5,
      reviews: 95,
      imgs: "/assets/images/demo_home_two.jpg",
      wishList: true,
    },
    {
      id: 1,
      name: "Dummy Paint",
      price: "$360",
      rating: 4.5,
      reviews: 95,
      imgs: "/assets/images/demo_home_two.jpg",
      wishList: true,
    },
    {
      id: 2,
      name: "Dummy Paint",
      price: "$700",
      rating: 4.8,
      reviews: 325,
      imgs: "/assets/images/demo_home_two.jpg",
      wishList: false,
    },
    {
      id: 3,
      name: "Dummy Paint Dummy Paint Dummy Paint Dummy Paint Paint Dummy Paint",
      price: "LKR 5990.00",
      rating: 4.7,
      reviews: 145,
      imgs: "/assets/images/demo_home_two.jpg",
      wishList: true,
      isNew: true,
      realPrice: "LKR 6990.00",
    },
    {
      id: 4,
      name: "dummy paint",
      price: "$1160",
      rating: 4.0,
      reviews: 35,
      imgs: "/assets/images/demo_home_two.jpg",
      wishList: false,
    },
  ]);

  const [hoveredCategory, setHoveredCategory] = useState(null);
  const sidebarRef = useRef(null); // Ref to track the sidebar element
  const popoverRef = useRef(null); // Ref to track the popover element

  // useEffect(() => {
  //   try {

  //     const fetchData = () => {
  //       const non_guest_user_homepage_product_types = Object.values(homepage_product_types).filter(val => val.code !== homepage_product_types.forYou.code).map(val => val.code).join(',');
  //       // Define requests with identifiers
  //       const requests = [
  //         apiNonAuth.get(
  //           `${services.setup}${url_separator}${endpoints.banners}${url_query_param_start}${query_parameters.type.paramName}${url_query_param_equal}${position_types.topMiddle.code}`,
  //           {
  //             customData: {
  //               retry: true,
  //               silentError: true,
  //               silentResponse: false,
  //               responseCallback: (response) => { }
  //             }
  //           }
  //         ),
  //         apiNonAuth.get(`${services.product}${url_separator}${endpoints.categories}${url_query_param_start}${query_parameters.status.paramName}${url_query_param_equal}${status.active.code}`),
  //         apiNonAuth.get(`${services.product}${url_separator}${endpoints.products}${url_query_param_start}${query_parameters.type.paramName}${url_query_param_equal}${non_guest_user_homepage_product_types}${url_query_param_comma}${url_query_param_and}${query_parameters.offset.paramName}${url_query_param_equal}${homePageDetails.moreToLoveProducts.offset}${url_query_param_and}${query_parameters.size.paramName}${url_query_param_equal}${homePageDetails.moreToLoveProducts.size}`),
  //         api.get(`${services.product}${url_separator}${endpoints.products}${url_query_param_start}${query_parameters.type.paramName}${url_query_param_equal}${homepage_product_types.forYou.code}`),
  //       ];

  //       // Send requests concurrently using Promise.all
  //       const responses = Promise.all(
  //         requests.map(({ promise }) => promise)
  //       );

  //       responses.forEach((response, index) => {
  //         switch (index) {
  //           case 0:
  //           case 1:
  //           case 2:
  //           case 3:
  //         }
  //       });
  //     }

  //     fetchData();

  //   } catch (err) {
  //     // setError('Failed to fetch data');
  //     console.error(err);
  //   } finally {
  //     // setLoading(false);
  //   }

  // }, []);

  // Handle mouse entering a category
  const handleCategoryHover = (category) => {
    setHoveredCategory(category);
  };

  // Handle mouse leaving the sidebar
  const handleMouseLeaveSidebar = (event) => {
    const relatedTarget = event.relatedTarget; // The element the mouse is moving to
    const popoverElement = popoverRef.current;

    // Check if the mouse is moving to the popover or its children
    if (
      popoverElement &&
      (relatedTarget === popoverElement ||
        popoverElement.contains(relatedTarget))
    ) {
      return; // Don't close the popover if moving to the popover
    }

    setHoveredCategory(null); // Close the popover if not moving to the popover
  };

  // Handle mouse leaving the popover
  const handleMouseLeavePopover = (event) => {
    const relatedTarget = event.relatedTarget; // The element the mouse is moving to
    const sidebarElement = sidebarRef.current;

    // Check if the mouse is moving back to the sidebar or its children
    if (
      sidebarElement &&
      (relatedTarget === sidebarElement ||
        sidebarElement.contains(relatedTarget))
    ) {
      return; // Don't close the popover if moving back to the sidebar
    }

    setHoveredCategory(null); // Close the popover if not moving back to the sidebar
  };

  return (
    <>
      <CssBaseline />

      <Box sx={styles}>
        <Box
          sx={{
            display: "flex",
            mt: 3,
            mb: 5,
          }}
        >
          {/* Left Sidebar - Categories */}
          <Box
            ref={sidebarRef}
            sx={{
              minWidth: 280,
              maxWidth: 280,
              maxHeight: "50dvh",
              overflowY: "auto",
              ...scrollBarThin,
            }}
            aria-label="category-list"
            onMouseLeave={handleMouseLeaveSidebar}
          >
            <List sx={{ pt: 0, zIndex: 101, mt: -0.5 }}>
              {categories.map((category, index) => {
                const IconComponent =
                  category.icon && Icons[category.icon]
                    ? Icons[category.icon]
                    : Icons.Category;

                return (
                  <ListItem
                    selected={hoveredCategory === category}
                    key={index}
                    onMouseEnter={() => handleCategoryHover(category)}
                    onClick={() => handleCategoryHover(category)}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                        cursor: "pointer",
                      },
                      height: "max-content",
                      pb: .2,
                      pt: .2,
                      transition: "background-color 0s ease",
                    }}
                  >
                    <ListItemIcon>
                      <IconComponent sx={{ color: "grey.600" }} />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ width: "90%", ml: -2.8 }}
                      primary={category.root}
                      primaryTypographyProps={{
                        fontSize: ".9rem",
                      }}
                    />
                    <ListItemText primary={">"} sx={{ width: "5%" }} />
                  </ListItem>
                );
              })}
            </List>

            {/* Submenu Popup with Popover */}
            {hoveredCategory && (
              <Popover
                open={!!hoveredCategory}
                anchorEl={sidebarRef.current} // Use the sidebar ref as the anchor
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                onClose={() => setHoveredCategory(null)}
                disableRestoreFocus
                TransitionProps={{ timeout: 0 }}
                sx={{ pointerEvents: "auto" }}
                PaperProps={{
                  ref: popoverRef, // Attach ref to the popover's paper
                  sx: {
                    minWidth: 400,
                    width: "60%",
                    maxWidth: "95dvw",
                    borderRadius: 2,
                    backgroundColor: "#fff",
                    zIndex: 100,
                    p: 2,
                    ml: 1,
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                      boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.15)",
                    },
                  },
                  onMouseLeave: handleMouseLeavePopover,
                }}
              >
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {hoveredCategory.root}
                  </Typography>
                  {hoveredCategory.l1.map((l1, l1Index) => (
                    <Box key={l1Index} sx={{ mb: 2 }}>
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        gutterBottom
                      >
                        {l1.name}
                      </Typography>
                      <Grid container spacing={1}>
                        {l1.l2.map((l2, l2Index) => (
                          <Grid item xs={1.2} key={l2Index}>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                textAlign: "center",
                              }}
                            >
                              <CardMedia
                                component="img"
                                image={l2.image}
                                alt={l2.name}
                                sx={{
                                  width: 80,
                                  height: 80,
                                  borderRadius: "50%",
                                  mb: 1,
                                }}
                              />
                              <Typography
                                variant="body2"
                                sx={{
                                  fontSize: "0.875rem",
                                  lineHeight: 1.2,
                                  maxWidth: 100,
                                }}
                              >
                                {l2.name}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  ))}
                </Box>
              </Popover>
            )}
          </Box>

          {/* Swiper Slider for Banners */}
          <SwiperSliderHeroAuto
            slides={[
              {
                color: "white",
                act: "Shop Now",
                fun: () => navigate("/product/filter-product"),
                // img: '/assets/images/2148943302.jpg',
                img: "https://img.lazcdn.com/us/domino/37594c7a-a390-4ba9-9f64-caf6611965ee_LK-1976-688.jpg_2200x2200q80.jpg_.webp",
                btnClr: "blue",
              },
              {
                color: "white",
                act: "Shop Now",
                fun: () => navigate("/product/filter-product"),
                img: "https://img.lazcdn.com/us/domino/1f8e57dd-6ea6-4fa7-ad6e-bbd0f06904b6_LK-1976-688.jpg_2200x2200q80.jpg_.webp",
                btnClr: "yellow",
              },
              {
                color: "white",
                act: "Shop Now",
                fun: () => navigate("/product/filter-product"),
                img: "https://img.lazcdn.com/us/domino/c1046056-eb60-4e94-9c32-8f4523ddc981_LK-1976-688.jpg_2200x2200q80.jpg_.webp",
                btnClr: "purple",
              },
              {
                header: "SHOP NOW",
                sub: "",
                act: "Shop Now",
                img: "https://img.lazcdn.com/us/domino/f6f6adba-19a6-4220-b16c-1dce12fadc96_LK-1976-688.jpg_2200x2200q80.jpg_.webp",
              },
            ]}
          />
        </Box>

        <ProductGallery />
        <CategorySec />
        <ProductSlider title={"Popular Products"}>
          {popularProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductSlider>
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap="1em"
          alignItems={"center"}
        >
          <Typography
            variant={"h4"}
            textAlign={"center"}
            width={"100%"}
            sx={{ fontWeight: "bold", fontStyle: "italic" }}
          >
            MORE TO LOVE
          </Typography>
          {/* <ProductGrid
            products={showProducts}
            sx={{ justifyContent: "center", alignItems: "center", mt: 4 }}
          /> */}
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
            pl={0}
            pr={0}
            pt={3}
            pb={3}
            width={"100%"}
          >
            <ProductGrid
              products={showProducts}
              responsiveCardProps={{ lg: 2 }}
            />
          </Box>
          {/* <Grid spacing={4.5} display={'flex'} gap={4.5} flexWrap={'wrap'} mt={4}>
              {showProducts.map((product) => (
                  <ProductCardSlide product={product} key={product.id}/>
              ))}
          </Grid> */}
        </Box>
        {/* <Banner /> */}
        {/* <PaintStories/> */}
        {/* <ColorOfTheYear/> */}
        <ProductSlider title={"Popular Products"}>
          {popularProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductSlider>
      </Box>
      <LetsPaintHero />
      <Footer />
    </>
  );
};

export default HomePage;
