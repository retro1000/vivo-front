import React from "react";
import {
  Typography,
  Grid,
  Divider,
  IconButton,
  Box,
} from "@mui/material";
import {Delete} from "@mui/icons-material"; // Import Delete Icon
import { useFormatter } from "app/hooks/useFormatter";
import { QuantitySelector } from "app/components";
import DiscountTooltip from "./DiscountToolTip";
import { useNotistack } from "app/hooks/useNotistack";

const ItemSummary = ({
  cardDetails,
  products,
  setProducts,
  placeOrder,
  setCardDetails,
  setOrderDetails,
  orderDetails,
}) => {
  const { formatToLKR } = useFormatter();

  const { triggerNotifications } = useNotistack()

  // Handle increment
  const incrementQuantity = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  // Handle decrement
  const decrementQuantity = (id) => {
    console.log(id);
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  // Handle delete
  const deleteProduct = (id) => {
    if(products.length===1){
      triggerNotifications([{ text: 'There must be at least only one product has to be in the bag for place an order', variant: 'warning' }])
      return
    }
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  // Calculate subtotal
  const calculateSubtotal = () =>
    products && products.length > 0
      ? products.reduce(
          (sum, product) => sum + product.price * product.quantity,
          0
        )
      : 0;

  return (
    <>
      <Grid container spacing={2} sx={{ maxWidth: "680px" }}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Bag Summary
          </Typography>
        </Grid>
        {products &&
          products.length > 0 &&
          products.map((product) => (
            <React.Fragment key={product.id}>
              <Grid
                item
                xs={12}
                sm={8}
                display="flex"
                alignItems="flex-start"
                flex={1}
              >
                <Box
                  component="img"
                  src={product.productImage}
                  alt={product.productName}
                  sx={{
                    width: 80,
                    height: 80,
                    marginRight: 2,
                    borderRadius: 2,
                  }}
                />
                <Box
                  display={"flex"}
                  justifyContent={"flex-start"}
                  alignItems={"flex-start"}
                  gap={1}
                  flexDirection={"column"}
                  height={"100%"}
                  flex={1}
                >
                  <Typography
                    sx={{
                      display: "-webkit-box",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2, // Limit the text to 2 lines
                      fontSize: "14px",
                    }}
                  >
                    {product.productName}
                  </Typography>
                  {product.attributes && product.attributes.length > 0
                    ? (
                    <Box display={'flex'} gap={'0.1em'} flexWrap={'wrap'} justifyContent={'flex-start'} alignItems={'flex-start'}>
                    {product.attributes.map((attribute, index) => (
                        <Typography
                          key={index}
                          variant="body2"
                          sx={{ display: "flex", gap: 1, mr: 1 }}
                        >
                          {attribute.name} :{" "}
                          <Typography variant="body2" sx={{color: 'gray'}}>
                            {attribute.value}
                          </Typography>
                        </Typography>
                      ))}
                      </Box>)
                    : ""}
                  <Box display={'flex'} justifyContent={'center'} alignItems={'space-between'} flexDirection={'row'}>  
                    <Typography variant="body2" align="right" sx={{ marginRight: 2, fontWeight: 600, fontSize: '13px', mb:1 }}>
                      {formatToLKR(product.price * product.quantity)}
                    </Typography>
                    {
                      product?.discountRules && product?.discountRules.length > 0 && 
                      <DiscountTooltip discountRules={product.discountRules}/>
                    }
                  </Box>
                </Box>
              </Grid>
              <Grid
                xs={12}
                sm={4}
                direction={"row"}
                container
                columnGap={2}
                alignItems={"center"}
                justifyContent={"flex-end"}
                minWidth={"max-content"}
                width={"max-content"}
              >
                <QuantitySelector
                  count={product.quantity}
                  handleCustomIncrease={() => incrementQuantity(product.id)}
                  handleCustomDecrease={() => decrementQuantity(product.id)}
                />
                <IconButton
                  onClick={() => deleteProduct(product.id)} // Add delete button
                  color="error"
                  size="small"
                >
                  <Delete />
                </IconButton>
              </Grid>
            </React.Fragment>
          ))}
        {/* <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>Subtotal:</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography align="right">
            {formatToLKR(calculateSubtotal())}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>Shipping:</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography align="right">{formatToLKR(400)}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Total:</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" align="right">
            {formatToLKR(calculateSubtotal() + 400)}
          </Typography>
        </Grid> */}
        {/*<Grid item xs={12}>*/}
        {/*  <Button*/}
        {/*      variant="contained"*/}
        {/*      sx={{ backgroundColor: "#ED005D", color: "#fff" }}*/}
        {/*      fullWidth*/}
        {/*  >*/}
        {/*    Apply Coupon*/}
        {/*  </Button>*/}
        {/*</Grid>*/}
      </Grid>
    </>
  );
};

export default ItemSummary;
