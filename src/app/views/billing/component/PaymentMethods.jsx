import React from "react";
import {
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  Button,
  Divider,
} from "@mui/material";
import {
  ShoppingCart,
  AddCard
} from "@mui/icons-material";

const VISA = "/assets/images/visa.png";
const MASTER = "/assets/images/card.png";
const AMEX = "/assets/images/amex.png";
const KOKO = "/assets/images/koko_logo.png";

const savedCards = [
  { token: "card1", type: "Visa", last4: "1234", name: 'Damitha Jayawardana' },
  { token: "card2", type: "Mastercard", last4: "5678", name: 'Damitha Jayawardana' },
];

const getCardLogo = (cardType) => {
  switch (cardType) {
    case "Visa":
      return VISA;
    case "Mastercard":
      return MASTER;
    case "Amex":
      return AMEX;
    default:
      return "";
  }
};

const PaymentMethods = ({ placeOrder, isPlaceOrderValid, paymentMethods, paymentMethod, savedCardToken, setCardDetails }) => {

  const handlePaymentSelection = (type, method='') => {
    setCardDetails({target: {name: 'paymentMethod'}}, {paymentMethod: type, savedCardToken: method});
  };

  return (
    <>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Select Payment Method
      </Typography>

      <RadioGroup
        value={paymentMethod}
        // onChange={(e) => handlePaymentSelection(e.target.value)}
      >
        {/* Cash on Delivery */}
        <Box
          sx={styles.optionBox(paymentMethod === paymentMethods.COD)}
          onClick={() => handlePaymentSelection(paymentMethods.COD)}
        >
          <FormControlLabel
            value={paymentMethods.COD}
            control={<Radio size="small" />}
            label={
              <Typography sx={styles.label}>Cash on Delivery (COD)</Typography>
            }
          />
        </Box>

        {/* Credit or Debit Card */}
        <Box
          sx={styles.optionBox(paymentMethod === paymentMethods.CARD)}
          onClick={() => handlePaymentSelection(paymentMethods.CARD)}
        >
          <FormControlLabel
            value={paymentMethods.CARD}
            control={<Radio size="small" />}
            label={
              <Typography sx={styles.label}>Credit or Debit Card</Typography>
            }
          />
          <Box sx={{ display: "flex", ml: "auto", gap: 1 }}>
            <img src={VISA} alt="Visa" style={styles.logo} />
            <img src={MASTER} alt="Mastercard" style={styles.logo} />
            <img src={AMEX} alt="Amex" style={styles.logo} />
          </Box>
        </Box>

        {/* Koko Payment */}
        <Box
          sx={styles.optionBox(paymentMethod === paymentMethods.KOKO)}
          onClick={() => handlePaymentSelection(paymentMethods.KOKO)}
        >
          <FormControlLabel
            value={paymentMethods.KOKO}
            control={<Radio size="small" />}
            label={
              <Typography sx={styles.label}>
                KOKO - Installment Payment
              </Typography>
            }
          />
          <Box sx={{ display: "flex", ml: "auto", gap: 1 }}>
            <img src={KOKO} alt="Koko" style={{ ...styles.logo, width: 50 }} />
          </Box>
        </Box>

        {/* Saved Cards Section */}
        {/* {savedCards.length > 0 && ( */}
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" fontWeight="bold" mb={0.6}>
              Saved Cards
            </Typography>
            {
              (!savedCards || savedCards.length === 0) && (
                <Typography variant="body1" mt={1} mb={1} width={'100%'} textAlign={'center'} fontSize={'14px'}>
                  No saved credit or debit cards found...
                </Typography>
              )
            }
            {savedCards.map((card) => (
              <Box
                key={card.token}
                sx={styles.optionBox(paymentMethod === paymentMethods.SAVED_CARD && savedCardToken === card.token)}
                onClick={() => handlePaymentSelection(card.token)}
              >
                <FormControlLabel
                  value={card.token}
                  control={<Radio size="small" />}
                  label={
                    <Typography
                      sx={styles.label}
                    >{`${card.name} •••• ${card.last4}`}</Typography>
                  }
                />
                <img
                  src={getCardLogo(card.type)}
                  alt={card.type}
                  style={styles.logo}
                />
              </Box>
            ))}
            <Button
              variant="outlined"
              size="small"
              sx={{ mt: 1, maxWidth: 'max-content' }}
              onClick={() => console.log("Add new card clicked")}
            >
              <AddCard sx={{ mr: 1 }} /> Add New Card
            </Button> 
          </>
        {/* )} */}
      </RadioGroup>

      {/* Place Order Button */}
      <Button
        variant="contained"
        color="primary"
        size="small"
        fullWidth
        sx={{ mt: 4, py: 0.4, fontSize: "1rem", fontWeight: "bold" }}
        onClick={() => placeOrder()}
        disabled={!isPlaceOrderValid() || !paymentMethod}
      >
        <ShoppingCart sx={{ mr: 1 }} /> Place Order
      </Button>
    </>
  );
};

const styles = {
  optionBox: (isSelected) => ({
    display: "flex",
    alignItems: "center",
    p: 0.3,
    borderRadius: 2,
    cursor: "pointer",
    mb: 0.5,
  }),
  logo: {
    width: 25,
    height: 25,
  },
  label: {
    fontSize: "13px",
  },
};

export default PaymentMethods;
