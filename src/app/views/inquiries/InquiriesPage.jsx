import React, { useState } from "react";
import { Box, Typography, Grid, Container, TextField, Button } from "@mui/material";
import Header from "app/components/Header";
import Footer from "app/components/Footer";

const InquiriesPage = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    inquiry: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = () => {
    // Simulate form submission
    if (formValues.name && formValues.email && formValues.inquiry) {
      setSubmitted(true);
    }
  };

  return (
    <Box>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <br />
            <Header title={"Inquiries"} subTitle={"Submit your questions or concerns"} />
            <Typography variant="body1" sx={{ mt: 4, color: "text.secondary" }}>
              Have a question about an order, a product, or anything else? Fill out the form below, and our customer support team will get back to you as soon as possible.
            </Typography>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              sx={{ mt: 4 }}
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              label="Your Inquiry"
              variant="outlined"
              name="inquiry"
              value={formValues.inquiry}
              onChange={handleInputChange}
              multiline
              rows={4}
              sx={{ mt: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleSubmit}
            >
              Submit Inquiry
            </Button>
            {submitted && (
              <Typography variant="h6" color="success.main" sx={{ mt: 2 }}>
                Thank you! Your inquiry has been submitted. We will get back to you shortly.
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} md={5}>
            <br />
            <Box
              component="img"
              src="/assets/images/inquiries.png"
              alt="Inquiries"
              sx={{ width: "100%", height: "auto", borderRadius: '10px' }}
            />
          </Grid>
        </Grid>
      </Container>
      <br></br>
      <Footer />
    </Box>
  );
};

export default InquiriesPage;
