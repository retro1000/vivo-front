import React, { useEffect, useState } from "react";
import { Container, Grid, Paper, Box } from "@mui/material";
import BillingForm from "./component/BillingForm";
import ItemSummary from "./component/ItemSummary";
import { Breadcrumb, Footer } from "app/components";
import { useLocation, useNavigate } from "react-router-dom";
import { useNotistack } from "app/hooks/useNotistack";
import { useAxios } from "app/hooks/useAxios";
import OrderSummary from "./component/OrderSummary";
import PaymentMethods from "./component/PaymentMethods";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import loadPayHereScript from "./component/loadPayHereScript";
import { baseUrl } from "config";

const sample = [
  {
    deliveryServiceName: "Koombiyo Delivery",
    deliveryServiceId: 1,
    districts: [
      {
        districtName: "Colombo",
        cities: ["Colombo-01", "Colombo-02"],
        rate: 350.0,
      },
    ],
    ratePerKilo: 50.0,
  },
];

const state = {
  type: "cart",
  products: [
    {
      id: 3,
      productName:
        "Product 1 Product 1 Product 1 Product 1 Product 1 Product 1 Product 1 Product 1 Product 1 Product 1 Product 1 Product 1 Product 1 Product 1 Product 1 Product 1 Product 1 Product 1 ",
      productImage:
        "data:image/jpeg;base64,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",
      price: 100,
      quantity: 2,
      productWeight: 0.085,
      discountRules: [
        {
          name: "Seasonal offer - 20% off for all items",
          originalPrice: 3780.0,
          discountedPrice: 3180.0,
        },
        {
          name: "Mega deals - 10% off for more than 3 items",
          originalPrice: 3180.0,
          discountedPrice: 2890.0,
        },
      ],
      attributes: [
        { name: "Color", value: "Red" },
        { name: "Size", value: "43" },
      ],
    },
    {
      id: 2,
      productName: "Product 2",
      productImage:
        "data:image/jpeg;base64,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",
      price: 200,
      quantity: 1,
      productWeight: 0.065,
      discountRules: [
        {
          name: "Seasonal offer - 20% off for all items",
          originalPrice: 3780.0,
          discountedPrice: 3180.0,
        },
        {
          name: "Mega deals - 10% off for more than 3 items",
          originalPrice: 3180.0,
          discountedPrice: 2890.0,
        },
      ],
      attributes: [
        { name: "Color", value: "Red" },
        { name: "Size", value: "43" },
      ],
    },
  ],
  path: [{ name: "Cart", path: "/cart/1" }],
};

const paymentMethods = Object.freeze({
  CARD: "CARD",
  COD: "COD",
  KOKO: "KOKO",
  SAVED_CARD: "SAVED_CARD",
});

const CONTACT_NO_PATTERN =
  /^(?:\+94|0)(?:7[01245678]\d{7}|[1-9]\d{8}|[1-9]\d{6})$/;

const isObjectFull = (obj, nonRequire = []) => {
  return Object.keys(obj).every((key) => {
    if (
      key === "paymentMethod" &&
      obj[key] === paymentMethods.SAVED_CARD &&
      obj["savedCardToken"] !== "" &&
      obj["savedCardToken"] !== undefined
    ) {
      return true;
    }
    if (nonRequire.includes(key)) {
      return true; // Skip non-required fields
    }
    if (Array.isArray(obj[key])) {
      return obj[key].length > 0; // Ensure arrays are not empty
    }
    return obj[key] !== "" && obj[key] !== null && obj[key] !== undefined;
  });
};

export { isObjectFull };

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  shippingAddress: Yup.string().required("Shipping address is required"),
  billingAddress: Yup.string().required("Billing address is required"),
  district: Yup.string().required("District is required"),
  deliveryServiceId: Yup.string().required("Shipping Method is required"),
  city: Yup.string().required("City is required"),
  contactNos: Yup.array()
    // .of(Yup.string().matches(/^\d{10}$/, "Invalid contact number"))
    .min(1, "At least one contact number is required"),
  emailAddress: Yup.string()
    .email("Invalid email address")
    .required("Email address is required"),
  orderNotes: Yup.string().max(500, "Order notes cannot exceed 500 characters"),
});

const Checkout = () => {
  const [products, setProducts] = useState({});

  const [cardDetails, setCardDetails] = useState({
    cardType: "",
    offset: "",
    expireDate: "",
    token: "",
    chooseType: "",
  });

  const [orderDetails, setOrderDetails] = useState({
    customerId: "",
    firstName: "d",
    lastName: "d",
    orderNotes: "",
    shippingAddress: "d",
    billingAddress: "d",
    emailAddress: "d@gmail.com",
    contactNos: ["0720985307"],
    otherContactNos: [],
    paymentMethod: paymentMethods.CARD,
    savedCardToken: "",
    deliveryServiceId: "",
    district: "Colombo",
    city: "Colombo-01",
  });

  const [deliveryServices, setDeliveryServices] = useState(sample);

  const { apiNonAuth } = useAxios();

  const {
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
    defaultValues: orderDetails,
  });

  const isContactNumbersValid = (numbers) => {
    if (!Array.isArray(numbers) || numbers.length === 0) return false;
    console.log(
      numbers,
      CONTACT_NO_PATTERN.test(numbers[0]),
      orderDetails.contactNos,
      numbers.reduce(
        (acc, number) => acc && CONTACT_NO_PATTERN.test(number),
        true
      )
    );
    return numbers.reduce(
      (acc, number) => acc && CONTACT_NO_PATTERN.test(number),
      true
    );
  };

  const getDistrictList = async (deliveryServiceId) => {
    await apiNonAuth(
      `/delivery-services/${deliveryServiceId}?action=checkout`,
      {
        customData: { silentError: true },
      }
    )
      .then((response) => {
        if (response.status === 200 && response.data) {
          setDeliveryServices(
            deliveryServices.map((ds) =>
              deliveryServiceId === ds.deliveryServiceId
                ? {
                    ...ds,
                    districts: response.data,
                  }
                : ds
            )
          );
        }
      })
      .catch((error) => {})
      .finally(() => {});
  };

  const handleOrderDetails = (event, val) => {
    setOrderDetails((prevDetails) => {
      switch (event.target.name) {
        case "contactNos":
          if (
            prevDetails.contactNos.length >= val.length ||
            isContactNumbersValid(val)
          ) {
            return {
              ...prevDetails,
              otherContactNos: [
                ...new Set([...(prevDetails.otherContactNos || []), ...val]),
              ],
              contactNos: val,
            };
          }
          return prevDetails;
        case "district":
          return {
            ...prevDetails,
            district: val,
            ...(!Boolean(val) ? { city: "" } : {}),
          };
        case "deliveryServiceId":
          if (val) getDistrictList(val);
          return {
            ...prevDetails,
            deliveryServiceId: val,
            district: "",
            city: "",
            // ...(!Boolean(val) ? { city: "" } : {}),
          };
        case "paymentMethod":
          const { paymentMethod, savedCardToken } = val;
          return {
            ...prevDetails,
            paymentMethod: paymentMethod,
            savedCardToken: savedCardToken,
          };
        default:
          return {
            ...prevDetails,
            [event.target.name]: val,
          };
      }
    });
  };

  const location = useLocation();
  const navigate = useNavigate();
  const { triggerNotifications } = useNotistack();
  // const { state } = location;

  const { api } = useAxios();

  useEffect(() => {
    if (!state || Object.keys(state).length === 0) {
      //nav to 404
      return;
    }

    loadPayHereScript().then(() => {
      console.log("PayHere script loaded");
    });
    setProducts(state?.products);
  }, []);

  useEffect(() => {
    const getDeliveryServices = async () => {
      await apiNonAuth("/delivery-services?action=checkout", {
        customData: { silentError: true },
      })
        .then((response) => {
          if (response.status === 200 && response.data) {
            setDeliveryServices(
              response.data.map((ds) => ({
                deliveryServiceName: ds.deliveryServiceName,
                deliveryServiceId: ds.deliveryServiceId,
                districts: [],
                ratePerKilo: ds.ratePerKilo,
              }))
            );
          }
        })
        .catch((error) => {})
        .finally(() => {});
    };

    getDeliveryServices();
  }, []);

  const isPlaceOrderValid = () => {
    return (
      Object.keys(errors).length === 0 &&
      isObjectFull(orderDetails, [
        "orderNotes",
        "savedCardToken",
        "otherContactNos",
        "customerId",
      ]) &&
      // (orderDetails.paymentMethod === 'COD' || isObjectFull(cardDetails)) &&
      products.length > 0
    );
  };

  const handlePayment = (payment) => {
    window.payhere.onCompleted = function (orderId) {
      alert("Payment successful! Order ID: " + orderId);
    };

    window.payhere.onDismissed = function () {
      alert("Payment was dismissed.");
    };

    window.payhere.onError = function (error) {
      alert("Payment error: " + error);
    };

    window.payhere.startPayment(payment);
  };

  const placeOrder = async () => {
    isPlaceOrderValid() &&
      (await api
        .post("/orders/place-order/online", {
          ...Object.fromEntries(
            Object.entries(orderDetails).filter(
              ([key]) =>
                ![
                  "otherContactNos",
                  orderDetails.paymentMethod !== paymentMethods.SAVED_CARD
                    ? "savedCardToken"
                    : "",
                ].includes(key)
            )
          ),
          // ...(orderDetails.paymentMethod === 'CARD' ? {linkedCardDto : {...cardDetails, linkedCardChoice: cardDetails?.chooseType || 'MENTIONED'}} : {}),
          ...(state?.type === "cart"
            ? {
                cartItems: products.map((product) => ({
                  cartItemId: product.id,
                  quantity: product.quantity,
                })),
              }
            : { productId: products[0]?.id, quantity: products[0]?.quantity }),
        })
        .then((response) => {
          if (response.status === 201 && response.data) {
            switch (response.data?.paymentMethod) {
              case paymentMethods.SAVED_CARD:
              case paymentMethods.COD:
                triggerNotifications([
                  { text: "Order successfully placed.", variant: "success" },
                ]);
                navigate(`/my-orders/${response.data?.orderId}`);
                break;
              case paymentMethods.CARD:
                const payment = {
                  ...response.data?.payment,
                  return_url: `${baseUrl}/`,
                  cancel_url: `${baseUrl}/`,
                };

                response.data?.payment && handlePayment(payment);
                break;
              case paymentMethods.KOKO:
              default:
            }
          }
        })
        .catch((error) => {
          if (error.response.status === 409 && error.response.data) {
          }
          if (error.response.status === 400 && error.response.data) {
            const errors = error.response?.data;

            Object.keys(errors).forEach((key) => {
              if (key === "customerId") {
                return;
              }
              if (key === "savedCardToken") {
                return;
              }
              setError(key, {
                type: "manual",
                message: errors[key],
              });
            });
          }
        })
        .finally(() => {}));
  };

  return (
    <>
      <Container maxWidth="lg">
        <Box className="breadcrumb">
          <br></br>
          <Breadcrumb routeSegments={[...state?.path, { name: "checkout" }]} />
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper elevation={0}>
              <BillingForm
                orderDetails={orderDetails}
                setOrderDetails={handleOrderDetails}
                control={control}
                clearErrors={clearErrors}
                errors={errors}
                deliveryServices={deliveryServices}
              />
            </Paper>
            <Paper elevation={0}>
              <ItemSummary products={products} setProducts={setProducts} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} sx={{ position: "sticky" }}>
            <Paper elevation={0}>
              <OrderSummary
                products={products}
                deliveryService={deliveryServices.find(ds => ds.deliveryServiceId === orderDetails?.deliveryServiceId)}
                district={orderDetails?.district}
              />
            </Paper>
            <Paper elevation={0}>
              <PaymentMethods
                placeOrder={placeOrder}
                isPlaceOrderValid={isPlaceOrderValid}
                paymentMethods={paymentMethods}
                paymentMethod={orderDetails?.paymentMethod}
                savedCardToken={orderDetails?.savedCardToken}
                setCardDetails={handleOrderDetails}
              />
            </Paper>
          </Grid>
        </Grid>
        <br></br>
      </Container>
      <Footer />
    </>
  );
};

export default Checkout;
