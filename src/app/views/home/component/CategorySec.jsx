import React from "react";
import { useState } from "react";
import { Grid, Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { useAxios } from "app/hooks/useAxios";
import { FeaturedCategoryCard } from "app/components";

const categorie = [
  {
    title: "Mobile Phone Accessories",
    image:
      "https://images.unsplash.com/photo-1565536421961-1f165e0c981e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/category/mobile-accessories",
  },
  {
    title: "Men's Shoes",
    image:
      "https://images.unsplash.com/photo-1612015670817-0127d21628d4?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/category/mens-shoes",
  },
  {
    title: "Women's Shoes",
    image:
      "https://images.unsplash.com/photo-1519707574798-77140649cfe5?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/category/womens-shoes",
  },
  {
    title: "Clothing & Apparel",
    image:
      "https://img.freepik.com/free-photo/flat-lay-composition-different-traveling-elements_23-2148884945.jpg?t=st=1738411776~exp=1738415376~hmac=e874ea67c60ae25dc3c233d49d1052dec7753c8a5e45783c6e1b2c5d85cae4cf&w=900",
    link: "/category/clothes",
  },
  {
    title: "Gift Items",
    image:
      "https://img.freepik.com/free-photo/fathers-day-composition-with-gift-box_23-2147790796.jpg?t=st=1738411825~exp=1738415425~hmac=6b4a55a07e4ea70427c1c43f2566b26ea4a5302ac413dc9c0d24a77e3ff223c2&w=1060",
    link: "/category/gift-items",
  },
];

export default function CategorySec() {
  const [categories, setCategories] = useState(categorie);

  const { apiNonAuth } = useAxios();

  useEffect(() => {
    const getFeturedCategories = async () => {
      await apiNonAuth
        .get("/categories?type=fetured", { customData: { silentError: true } })
        .then((response) => {
          if (response.status === 200 && response.data) {
            setCategories(response.data);
          }
        })
        .catch((error) => {})
        .then(() => {});
    };

    getFeturedCategories();
  }, []);

  return (
    categories &&
    categories.length > 0 && (
      <Container
        sx={{
          py: 4,
          pt: 4,
          mt: 0,
          position: "relative",
          width: "100%",
          display: "block",
          flexShrink: 0,
        }}
        maxWidth={false}
      >
        <Typography variant={'h4'} textAlign={'center'} width={'100%'} sx={{ fontWeight: "bold", fontStyle: "italic" }}>SHOP BY CATEGORIES</Typography>
        <br></br>
        <Grid container spacing={3} justifyContent="center">
          {categories.map((category, index) => (
            <Grid item key={index}>
              <FeaturedCategoryCard
                title={category.title}
                image={category.image}
                link={category.link}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    )
  );
}
