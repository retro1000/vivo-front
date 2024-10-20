import React from "react";
import { Box, Typography, Grid, Container, Button, TextField } from "@mui/material";
import Header from "app/components/Header";
import Footer from "app/components/Footer";
// import BrandCars from "./component/BrandCars";
// import PartnerLogos from "./component/PartnerLogos";

const ContactUsPage = () => {
  return (
    <Box>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <br />
            <Header title={"Contact"} subTitle={"Get in Touch with Vivolk"} />
            <Typography variant="body1" sx={{ mt: 4, color: "text.secondary" }}>
              We are here to assist you with any inquiries, issues, or support you may need. At Vivolk, customer satisfaction is our priority, and we strive to make every interaction smooth and helpful.
              <br />
              <br />
              Whether you need assistance with your order, have questions about our products, or want to leave feedback, our team is ready to help. Feel free to reach out to us using any of the contact methods below or fill out the form to get in touch.
              <br />
              <br />
              We value your input and are always looking for ways to improve your experience. Your questions and feedback help us to better serve you and continuously enhance our offerings.
            </Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <br />
            <Box
              component="img"
              src="/assets/images/contact-us.jpg"
              alt="Contact Us"
              sx={{ width: "100%", height: "auto", borderRadius: "10px" }}
            />
          </Grid>
        </Grid>

        {/* Contact Details Section */}
        <Grid container spacing={3} sx={{ mt: 6 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Contact Information
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              <strong>Email:</strong> support@vivolk.com
              <br />
              <strong>Phone:</strong> +123-456-7890
              <br />
              <strong>Location:</strong> 1234 Vivolk Street, Suite 100, City, Country
            </Typography>
            <Typography variant="body1" sx={{ mt: 4, color: "text.secondary" }}>
              Our customer service team is available Monday to Friday, 9:00 AM to 6:00 PM. We are committed to responding to your queries as quickly as possible.
            </Typography>
          </Grid>

          {/* Contact Form Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Send Us a Message
            </Typography>
            <Box component="form">
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                sx={{ mb: 3 }}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                sx={{ mb: 3 }}
              />
              <TextField
                label="Message"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                sx={{ mb: 3 }}
              />
              <Button variant="contained" color="primary" fullWidth>
                Send Message
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
        <br></br>
      {/* Partner Logos and Other Sections */}
      {/* <BrandCars />
      <PartnerLogos /> */}
      <Footer />
    </Box>
  );
};

export default ContactUsPage;
