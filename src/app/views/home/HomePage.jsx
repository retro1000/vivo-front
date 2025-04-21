import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import CategorySec from "./component/CategorySec";
import LetsPaintHero from "./component/BottomHero";
import {
  List,
  Box,
  ListItem,
  Grid,
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
import {
  endpoints,
  homepage_product_display_types,
  positions,
  scrollBarThin,
  services,
  status,
  url_elements,
  url_parameters,
} from "app/utils/constant";
import * as Icons from "@mui/icons-material"; // Import all Material-UI icons dynamically
import { useRef } from "react";
import { useEffect } from "react";
import { useAxios } from "app/hooks/useAxios";
import FeaturedCategory from "./component/FeaturedCategory";
import PopularProductsHeading from "./component/PopularProductsHeading";
import MoreToLoveHeading from "./component/MoreToLoveHeading";

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
const initialHomePageDetails = {
  categories: {
    "hoveredCategory": "",
    "data": [
      {
        "root": "Women's Fashion",
        "icon": "ShoppingBag",
        "l1": [
          {
            "name": "Clothing",
            "l2": [
              {
                "name": "Dresses",
                "image": "https://images.unsplash.com/photo-1567400359062-18a92a5b3a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                "name": "Tops & Blouses",
                "image": "https://images.unsplash.com/photo-1598032895397-b947244972c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                "name": "Jeans & Pants",
                "image": "https://images.unsplash.com/photo-1594055303358-4bb61568a7ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                "name": "Jackets & Coats",
                "image": "https://images.unsplash.com/photo-1544027995-7e9d14f706e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            ]
          },
          {
            "name": "Footwear",
            "l2": [
              {
                "name": "Sneakers",
                "image": "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                "name": "Heels",
                "image": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                "name": "Boots",
                "image": "https://images.unsplash.com/photo-1542838686-37da4a9fd857?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            ]
          },
          {
            "name": "Accessories",
            "l2": [
              {
                "name": "Handbags",
                "image": "https://images.unsplash.com/photo-1584917865442-1e6d1977f3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                "name": "Jewelry",
                "image": "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            ]
          }
        ]
      },
      {
        "root": "Men's Fashion",
        "icon": "Man",
        "l1": [
          {
            "name": "Clothing",
            "l2": [
              {
                "name": "Shirts",
                "image": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                "name": "Jeans & Pants",
                "image": "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                "name": "Jackets & Coats",
                "image": "https://images.unsplash.com/photo-1601331692324-7ca2a8e7e639?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            ]
          },
          {
            "name": "Footwear",
            "l2": [
              {
                "name": "Sneakers",
                "image": "https://images.unsplash.com/photo-1605408499391-6368c6ef261b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                "name": "Formal Shoes",
                "image": "https://images.unsplash.com/photo-1614252369475-6c7a3c8b2f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            ]
          },
          {
            "name": "Accessories",
            "l2": [
              {
                "name": "Watches",
                "image": "https://images.unsplash.com/photo-1524592094714-0f7a5f3c5d4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                "name": "Belts",
                "image": "https://images.unsplash.com/photo-1594560913035-776c547240c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            ]
          }
        ]
      },
      {
        "root": "Electronics",
        "icon": "PhoneAndroid",
        "l1": [
          {
            "name": "Mobile Devices",
            "l2": [
              {
                "name": "Smartphones",
                "image": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                "name": "Tablets",
                "image": "https://images.unsplash.com/photo-1544244015-9c72fd9f8a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                "name": "Accessories",
                "image": "https://images.unsplash.com/photo-1600087629990-c4b322830dd4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            ]
          },
          {
            "name": "Computers",
            "l2": [
              {
                "name": "Laptops",
                "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a0a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                "name": "Desktops",
                "image": "https://images.unsplash.com/photo-1587831990711-23ca6441447b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            ]
          },
          {
            "name": "Audio",
            "l2": [
              {
                "name": "Headphones",
                "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                "name": "Speakers",
                "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            ]
          }
        ]
      },
      {
        "root": "Home & Living",
        "icon": "Home",
        "l1": [
          {
            "name": "Furniture",
            "l2": [
              {
                "name": "Sofas",
                "image": "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                "name": "Beds",
                "image": "https://images.unsplash.com/photo-1572297837169-8737183476ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                "name": "Dining Tables",
                "image": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            ]
          },
          {
            "name": "Decor",
            "l2": [
              {
                "name": "Wall Art",
                "image": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                "name": "Rugs",
                "image": "https://images.unsplash.com/photo-1600585153490-76fb20a0f2b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            ]
          },
          {
            "name": "Kitchen",
            "l2": [
              {
                "name": "Cookware",
                "image": "https://images.unsplash.com/photo-1586996292898-71db4779a2d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                "name": "Appliances",
                "image": "https://images.unsplash.com/photo-1600585152915-d208bec867a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            ]
          }
        ]
      },
      {
        "root": "Beauty & Personal Care",
        "icon": "Face",
        "l1": [
          {
            "name": "Skincare",
            "l2": [
              {
                "name": "Cleansers",
                "image": "https://images.unsplash.com/photo-1576698457478-cbe1722a71ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                "name": "Moisturizers",
                "image": "https://images.unsplash.com/photo-1556227709-3e7a84571025?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            ]
          },
          {
            "name": "Makeup",
            "l2": [
              {
                "name": "Foundation",
                "image": "https://images.unsplash.com/photo-1598252976410-0f26d3f3c663?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                "name": "Lipstick",
                "image": "https://images.unsplash.com/photo-1586495777744-3d1b5f6b7a5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            ]
          },
          {
            "name": "Haircare",
            "l2": [
              {
                "name": "Shampoos",
                "image": "https://images.unsplash.com/photo-1608247575618-1b0e1e76e8cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                "name": "Conditioners",
                "image": "https://images.unsplash.com/photo-1608247575618-1b0e1forests & Conditioners",
                "image": "https://images.unsplash.com/photo-1608247575618-1b0e1e76e8cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            ]
          }
        ]
      },
      {
        "root": "Sports & Outdoors",
        "icon": "SportsSoccer",
        "l1": [
          {
            "name": "Fitness Equipment",
            "l2": [
              {
                "name": "Treadmills",
                "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                "name": "Dumbbells",
                "image": "https://images.unsplash.com/photo-1593078167535-73a28e65df48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            ]
          },
          {
            "name": "Outdoor Gear",
            "l2": [
              {
                "name": "Camping Tents",
                "image": "https://images.unsplash.com/photo-1504851149312-7a075b459cc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                "name": "Backpacks",
                "image": "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            ]
          }
        ]
      },
      {
        "root": "Kids & Toys",
        "icon": "Toys",
        "l1": [
          {
            "name": "Toys",
            "l2": [
              {
                "name": "Building Blocks",
                "image": "https://images.unsplash.com/photo-1587654780291-39c940c35165?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                "name": "Dolls",
                "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            ]
          },
          {
            "name": "Clothing",
            "l2": [
              {
                "name": "Kids Dresses",
                "image": "https://images.unsplash.com/photo-1597227775224-9e47e1574d20?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                "name": "Kids Shoes",
                "image": "https://images.unsplash.com/photo-1596394517322-69a66b80eaca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            ]
          }
        ]
      },
      {
        "root": "Books & Stationery",
        "icon": "Book",
        "l1": [
          {
            "name": "Books",
            "l2": [
              {
                "name": "Fiction",
                "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4bced0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                "name": "Non-Fiction",
                "image": "https://images.unsplash.com/photo-1589998059171-9b2f91d765bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            ]
          },
          {
            "name": "Stationery",
            "l2": [
              {
                "name": "Notebooks",
                "image": "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                "name": "Pens",
                "image": "https://images.unsplash.com/photo-1455884983656-66bb1e8d5522?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            ]
          }
        ]
      }
    ]
  },
  banners: {
    topBanners: [
      {
        color: "white",
        act: "Shop Now",
        fun: "/product/filter-product",
        img: "https://img.lazcdn.com/us/domino/37594c7a-a390-4ba9-9f64-caf6611965ee_LK-1976-688.jpg_2200x2200q80.jpg_.webp",
        btnClr: "blue",
        header: "New Arrivals",
        sub: "Explore the latest trends",
      },
      {
        color: "white",
        act: "Shop Now",
        fun: "/product/filter-product",
        img: "https://img.lazcdn.com/us/domino/1f8e57dd-6ea6-4fa7-ad6e-bbd0f06904b6_LK-1976-688.jpg_2200x2200q80.jpg_.webp",
        btnClr: "yellow",
        header: "Summer Sale",
        sub: "Up to 50% off",
      },
    ],
    middleBanners: [
      {
        color: "white",
        act: "Shop Now",
        fun: "/product/filter-product",
        img: "https://img.lazcdn.com/us/domino/c1046056-eb60-4e94-9c32-8f4523ddc981_LK-1976-688.jpg_2200x2200q80.jpg_.webp",
        btnClr: "purple",
        header: "Electronics Deals",
        sub: "Save big on tech",
      },
      {
        color: "white",
        act: "Shop Now",
        fun: "/product/filter-product",
        img: "https://img.lazcdn.com/us/domino/f6f6adba-19a6-4220-b16c-1dce12fadc96_LK-1976-688.jpg_2200x2200q80.jpg_.webp",
        btnClr: "red",
        header: "Home Essentials",
        sub: "Upgrade your living space",
      },
    ],
  },
  todaysDeals: [
    {
      data: [
        {
          id: 1,
          name: "Men's Waterproof Hiking Boots",
          price: 129.99,
          rating: 4.6,
          reviews: 150,
          imgs: [
            "https://img.kwcdn.com/product/fancy/6423ac13-8f2f-48b6-b818-def2d1fbdf96.jpg?imageView2/2/w/1300/q/90/format/webp",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          ],
          wishList: true,
          isFlashSale: true,
          endTime: "2025-04-22T12:00:00",
          flashSaleLabel: "ADVENTURE DEALS",
          flashSaleCta: "Gear Up for Less!",
        },
        {
          id: 2,
          name: "Smartphone 128GB with 5G",
          price: 599.99,
          rating: 4.7,
          reviews: 300,
          imgs: [
            "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1598327105854-c87669542e41?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          ],
          wishList: true,
          isNew: true,
          isSale: true,
          realPrice: 699.99,
          isFlashSale: true,
          endTime: "2025-04-21T18:00:00",
          flashSaleLabel: "TECH SALE",
          flashSaleCta: "Limited Stock - Buy Now!",
        },
      ],
      title: "Today's Deals",
      label: "Flash Sale",
      navUrl: "/deals",
    },
  ],
  newArrivals: [
    {
      id: 3,
      name: "Women's Leather Handbag",
      price: 89.99,
      rating: 4.8,
      reviews: 200,
      imgs: [
        "https://images.unsplash.com/photo-1590739223597-73b745e451c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1584917865442-1590f0e1b058?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      wishList: false,
      isNew: true,
    },
    {
      id: 4,
      name: "Fitness Yoga Mat",
      price: 29.99,
      rating: 4.2,
      reviews: 110,
      imgs: [
        "https://images.unsplash.com/photo-1599447332768-9e3b4da967f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1601924994987-290aa35223c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      wishList: false,
      isNew: true,
    },
  ],
  everydayEdits: [
    {
      id: 5,
      name: "Non-Stick Cookware Set",
      price: 99.99,
      rating: 4.3,
      reviews: 80,
      imgs: [
        "https://images.unsplash.com/photo-1587314168485-3236d671a8d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600585152915-d208bec867a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      wishList: false,
      isFlashSale: true,
      endTime: "2025-04-22T15:00:00",
      flashSaleLabel: "KITCHEN ESSENTIALS",
      flashSaleCta: "Cook Like a Pro!",
    },
    {
      id: 6,
      name: "Portable Bluetooth Speaker",
      price: 49.99,
      rating: 4.4,
      reviews: 250,
      imgs: [
        "https://images.unsplash.com/photo-1589254066213-a0c9dc853511?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      wishList: false,
    },
  ],
  popularProducts: [
    {
      id: 7,
      name: "Premium Wall Paint",
      price: 360,
      rating: 4.5,
      reviews: 95,
      imgs: [
        "https://images.unsplash.com/photo-1583417714701-3487f019e6b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      wishList: true,
    },
    {
      id: 8,
      name: "Eco-Friendly Paint",
      price: 700,
      rating: 4.8,
      reviews: 325,
      imgs: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      wishList: false,
    },
    {
      id: 9,
      name: "Matte Finish Paint",
      price: 5990.0,
      rating: 4.7,
      reviews: 145,
      imgs: [
        "https://images.unsplash.com/photo-1582407942667-0f784f203726?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      wishList: true,
      isNew: true,
      realPrice: 6990.0,
    },
    {
      id: 10,
      name: "Glossy Exterior Paint",
      price: 1160,
      rating: 4.0,
      reviews: 35,
      imgs: [
        "https://images.unsplash.com/photo-1600585152915-d208bec867a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      wishList: false,
    },
  ],
  forYouProducts: [
    {
      id: 11,
      name: "Cordless Vacuum Cleaner",
      price: 199.99,
      rating: 4.6,
      reviews: 180,
      imgs: [
        "https://images.unsplash.com/photo-1611599637991-8a36ad468596?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1598971457999-0b8f90543b8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      wishList: false,
      isFlashSale: true,
      endTime: "2025-04-21T20:00:00",
      flashSaleLabel: "CLEANING DEALS",
      flashSaleCta: "Keep Your Home Spotless!",
    },
    {
      id: 12,
      name: "Ergonomic Office Chair",
      price: 249.99,
      rating: 4.5,
      reviews: 140,
      imgs: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1592077898240-7b9a16a7d3d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      wishList: false,
      isSale: true,
      realPrice: 299.99,
    },
  ],
  moreToLoveProducts: {
    data: [
      {
        id: 13,
        name: "Men's Waterproof Hiking Boots",
        price: 129.99,
        rating: 4.6,
        reviews: 150,
        imgs: [
          "https://img.kwcdn.com/product/fancy/6423ac13-8f2f-48b6-b818-def2d1fbdf96.jpg?imageView2/2/w/1300/q/90/format/webp",
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        wishList: true,
        isFlashSale: true,
        endTime: "2025-04-22T12:00:00",
        flashSaleLabel: "ADVENTURE DEALS",
        flashSaleCta: "Gear Up for Less!",
      },
      {
        id: 14,
        name: "Women's Leather Handbag",
        price: 89.99,
        rating: 4.8,
        reviews: 200,
        imgs: [
          "https://images.unsplash.com/photo-1590739223597-73b745e451c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1584917865442-1590f0e1b058?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        wishList: false,
        isNew: true,
      },
      {
        id: 15,
        name: "Smartphone 128GB with 5G",
        price: 599.99,
        rating: 4.7,
        reviews: 300,
        imgs: [
          "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1598327105854-c87669542e41?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        wishList: true,
        isNew: true,
        isSale: true,
        realPrice: 699.99,
        isFlashSale: true,
        endTime: "2025-04-21T18:00:00",
        flashSaleLabel: "TECH SALE",
        flashSaleCta: "Limited Stock - Buy Now!",
      },
      {
        id: 16,
        name: "Luxury King-Size Bed Frame",
        price: 4567.5,
        rating: 4.9,
        reviews: 90,
        imgs: [
          "https://images.unsplash.com/photo-1572297837169-8737183476ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1616627678955-23467e795c8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        wishList: false,
        isFlashSale: true,
        endTime: "2025-04-23T10:00:00",
        flashSaleLabel: "LUXURY HOME SALE",
        flashSaleCta: "Elevate Your Bedroom!",
      },
    ],
    size: 30,
    offset: 0,
    loading: false,
  },
  loading: false,
};

const HomePage = () => {
  const navigate = useNavigate();
  const { api, apiNonAuth } = useAxios();

  const [showProducts, setShowProducts] = useState([
    {
      id: 1,
      name: "Men's Waterproof Hiking Boots",
      price: 129.99,
      rating: 4.6,
      reviews: 150,
      imgs: [
        "https://img.kwcdn.com/product/fancy/6423ac13-8f2f-48b6-b818-def2d1fbdf96.jpg?imageView2/2/w/1300/q/90/format/webp", // Original, verified
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      ],
      wishList: true,
      isFlashSale: true,
      endTime: "2025-04-22T12:00:00",
      flashSaleLabel: "ADVENTURE DEALS",
      flashSaleCta: "Gear Up for Less!",
    },
    {
      id: 2,
      name: "Women's Leather Handbag",
      price: 89.99,
      rating: 4.8,
      reviews: 200,
      imgs: [
        "https://images.unsplash.com/photo-1590739223597-73b745e451c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1584917865442-1590f0e1b058?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1605733513597-a8f8343a1485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      ],
      wishList: false,
      isNew: true,
    },
    {
      id: 3,
      name: "Smartphone 128GB with 5G",
      price: 599.99,
      rating: 4.7,
      reviews: 300,
      imgs: [
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1598327105854-c87669542e41?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1592890288564-76628a30a657?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      ],
      wishList: true,
      isNew: true,
      isSale: true,
      realPrice: 699.99,
      isFlashSale: true,
      endTime: "2025-04-21T18:00:00",
      flashSaleLabel: "TECH SALE",
      flashSaleCta: "Limited Stock - Buy Now!",
    },
    {
      id: 4,
      name: "Non-Stick Cookware Set",
      price: 99.99,
      rating: 4.3,
      reviews: 80,
      imgs: [
        "https://images.unsplash.com/photo-1587314168485-3236d671a8d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1600585152915-d208bec867a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1600585153490-76fb20a0f2b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      ],
      wishList: false,
      isFlashSale: true,
      endTime: "2025-04-22T15:00:00",
      flashSaleLabel: "KITCHEN ESSENTIALS",
      flashSaleCta: "Cook Like a Pro!",
    },
    {
      id: 5,
      name: "Men's Wool Blend Coat",
      price: 159.99,
      rating: 4.5,
      reviews: 120,
      imgs: [
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1592878905744-6d0e9f45f7d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1602810316693-88b24da6e062?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      ],
      wishList: false,
      isSale: true,
      realPrice: 199.99,
    },
    {
      id: 6,
      name: "Portable Bluetooth Speaker",
      price: 49.99,
      rating: 4.4,
      reviews: 250,
      imgs: [
        "https://images.unsplash.com/photo-1589254066213-a0c9dc853511?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1617137984095-74e641066a09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1608042314453-d464347b2ab7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      ],
      wishList: false,
    },
    {
      id: 7,
      name: "Luxury King-Size Bed Frame",
      price: 4567.5,
      rating: 4.9,
      reviews: 90,
      imgs: [
        "https://images.unsplash.com/photo-1572297837169-8737183476ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1616627678955-23467e795c8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1595522312557-2503f01460b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1566669436140-75a7e4507e51?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      ],
      wishList: false,
      isFlashSale: true,
      endTime: "2025-04-23T10:00:00",
      flashSaleLabel: "LUXURY HOME SALE",
      flashSaleCta: "Elevate Your Bedroom!",
    },
    {
      id: 8,
      name: "Fitness Yoga Mat",
      price: 29.99,
      rating: 4.2,
      reviews: 110,
      imgs: [
        "https://images.unsplash.com/photo-1599447332768-9e3b4da967f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1599447332768-9e3b4da967f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1601924994987-290aa35223c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      ],
      wishList: false,
      isNew: true,
    },
    {
      id: 9,
      name: "Cordless Vacuum Cleaner",
      price: 199.99,
      rating: 4.6,
      reviews: 180,
      imgs: [
        "https://images.unsplash.com/photo-1611599637991-8a36ad468596?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1611599637991-8a36ad468596?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1598971457999-0b8f90543b8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1598971457999-0b8f90543b8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      ],
      wishList: false,
      isFlashSale: true,
      endTime: "2025-04-21T20:00:00",
      flashSaleLabel: "CLEANING DEALS",
      flashSaleCta: "Keep Your Home Spotless!",
    },
    {
      id: 10,
      name: "Digital SLR Camera",
      price: 799.99,
      rating: 4.8,
      reviews: 220,
      imgs: [
        "https://images.unsplash.com/photo-1519638399536-2b44d1153d3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1505247969214-6753f7f8b0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      ],
      wishList: false,
      isFlashSale: true,
      endTime: "2025-04-22T16:00:00",
      flashSaleLabel: "PHOTO FEST",
      flashSaleCta: "Capture the Moment!",
    },
    {
      id: 11,
      name: "Ergonomic Office Chair",
      price: 249.99,
      rating: 4.5,
      reviews: 140,
      imgs: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1592077898240-7b9a16a7d3d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1600585152915-d208bec867a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1600585153490-76fb20a0f2b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      ],
      wishList: false,
      isSale: true,
      realPrice: 299.99,
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

  const [homePageDetails, setHomePageDetails] = useState({
    categories: {
      hoveredCategory: "",
      data: [],
    },
    banners: {
      topBanners: [],
      middleBanners: [],
    },
    todaysDeals: [
      {
        data: [],
        title: "",
        label: "",
        navUrl: "",
      },
    ],
    newArrivals: [],
    everydayEdits: [],
    popularProducts: [],
    forYouProducts: [],
    moreToLoveProducts: {
      data: [],
      size: 30,
      offset: 0,
      loading: false,
    },
    loading: false,
  });

  useEffect(() => {
    const fetchData = () => {
      const requets = [
        apiNonAuth.get(
          services.product_service +
          url_elements.seperator +
          endpoints.categories +
          url_elements.parameter_start +
          url_parameters.status +
          url_elements.parameter_equal +
          status.active.code,
          {
            customData: {
              retry: true,
              silentError: true,
              silentResponse: false,
              responseCallback: (response) => { },
            },
          }
        ),
        apiNonAuth.get(
          services.product_service +
          url_elements.seperator +
          endpoints.banners +
          url_elements.parameter_start +
          url_parameters.status +
          url_elements.parameter_equal +
          status.active.code +
          url_elements.parameter_and +
          url_parameters.type +
          url_elements.parameter_equal +
          Object.values(positions)
            ?.map((p) => p.code)
            ?.join(url_elements.comma),
          {
            customData: {
              retry: true,
              silentError: true,
              silentResponse: false,
              responseCallback: (response) => { },
            },
          }
        ),
        apiNonAuth.get(
          services.product_service +
          url_elements.seperator +
          endpoints.products +
          url_elements.parameter_start +
          url_parameters.type +
          url_elements.parameter_equal +
          Object.values(homepage_product_display_types)
            ?.map((p) => p.code)
            ?.filter(
              (p) => p !== homepage_product_display_types?.forYou?.code
            )
            ?.join(url_elements.comma),
          url_elements.parameter_and +
          url_parameters.size +
          url_elements.parameter_equal +
          30 +
          url_elements.parameter_and +
          url_parameters.offset +
          url_elements.parameter_equal +
          0,
          {
            customData: {
              retry: true,
              silentError: true,
              silentResponse: false,
              responseCallback: (response) => { },
            },
          }
        ),
        api.get(
          services.product_service +
          url_elements.seperator +
          endpoints.products +
          url_elements.parameter_start +
          url_parameters.type +
          url_elements.parameter_equal +
          homepage_product_display_types?.forYou?.code,
          {
            customData: {
              retry: true,
              silentError: true,
              silentResponse: false,
              responseCallback: (response) => { },
            },
          }
        ),
      ];

      setHomePageDetails(initialHomePageDetails);
    };

    try {
      fetchData();
    } catch (error) { }
  }, []);

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
      relatedTarget &&
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
      relatedTarget &&
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
              {initialHomePageDetails?.categories?.data?.map(
                (category, index) => {
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
                        pb: 0.2,
                        pt: 0.2,
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
                }
              )}
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
                    maxHeight: "60dvh",
                    overflowY: "auto",
                    width: "60%",
                    maxWidth: "95dvw",
                    borderRadius: 1.4,
                    backgroundColor: "#fff",
                    zIndex: 100,
                    p: 2,
                    ml: -0.5,
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
                              <img
                                src={l2.image}
                                alt={l2.name}
                                loading="lazy"
                                style={{
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
            slides={initialHomePageDetails?.banners?.topBanners}
          />
        </Box>

        <ProductGallery
          TodaysDealsProducts={initialHomePageDetails?.todaysDeals}
          everydayEditsProducts={initialHomePageDetails?.everydayEdits}
          newArrivalsProducts={initialHomePageDetails?.newArrivals}
        />
        <FeaturedCategory />

        <PopularProductsHeading isLoaded={true} />
        <ProductSlider >
          {initialHomePageDetails?.popularProducts?.map((product, index) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductSlider>

        <Box
          sx={{
            display: "flex",
            mt: 3,
            mb: 5,
          }}
        >
          <SwiperSliderHeroAuto
            slides={initialHomePageDetails?.banners?.middleBanners}
          />
        </Box>
        <MoreToLoveHeading />
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap="1em"
          alignItems={"center"}
        >
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
              products={initialHomePageDetails?.moreToLoveProducts?.data}
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
          {initialHomePageDetails?.forYouProducts?.map((product, index) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductSlider>
      </Box>
      <LetsPaintHero />
      <Footer />

      <style jsx>{`
    @keyframes float {
      0% { transform: translateY(0); }
      100% { transform: translateY(-10px); }
    }
    @keyframes floatUp {
      0% { transform: translateY(0) scale(0.4); }
      100% { transform: translateY(-20px) scale(0.6); }
    }
    @keyframes heartbeat {
      0% { transform: scale(1); }
      15% { transform: scale(1.15); }
      30% { transform: scale(1); }
      45% { transform: scale(1.15); }
      60% { transform: scale(1); }
    }
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
      `}</style>
    </>
  );
};

export default HomePage;
