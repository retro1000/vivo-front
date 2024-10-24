import React from "react";
import { Box, Typography, Grid, Container, Button, TextField } from "@mui/material";
import Header from "app/components/Header";
import Footer from "app/components/Footer";
import { useRef } from "react";
// import BrandCars from "./component/BrandCars";
// import PartnerLogos from "./component/PartnerLogos";

const ContactUsPage = () => {

  const contactUsForm = useRef(null);

  // Function to scroll to a specific section
  const scrollToContactUsForm= (contactUsForm) => {
    contactUsForm.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box>
      <Container maxWidth="1300px" sx={{width: '100%', pl: '10px', pr: '10px'}}>
      <Header title={"Contact Us"} subTitle={"Get in Touch with Vivolk"} sx={{mt: 2}}/>

        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <br />
            <Typography variant="body1" sx={{ mt: 4, color: "text.secondary" }}>
              We are here to assist you with any inquiries, issues, or support you may need. At Vivolk, customer satisfaction is our priority, and we strive to make every interaction smooth and helpful.
              <br />
              <br />
              Whether you need assistance with your order, have questions about our products, or want to leave feedback, our team is ready to help. Feel free to reach out to us using any of the contact methods below or fill out the form to get in touch.
              <br />
              <br />
              We value your input and are always looking for ways to improve your experience. Your questions and feedback help us to better serve you and continuously enhance our offerings.
            </Typography>
            <br></br>
            <Button variant="contained" color="primary" onClick={() => scrollToContactUsForm(contactUsForm)}>
              How to Contact
            </Button>
          </Grid>
          <Grid item xs={12} md={5}>
            <br />
            <Box
              component="img"
              src="/assets/images/2148434727.jpg"
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
              Our customer service team is available Monday to Sunday, 8:00 AM to 8:00 PM. We are committed to responding to your queries as quickly as possible.
            </Typography>
            
          </Grid>

          {/* Contact Form Section */}
          
        </Grid>
        <br></br>

        <Grid item xs={12} md={6} ref={contactUsForm}>
            <Box display={'flex'} justifyContent={'flex-start'} flexDirection={'column'}>
              <Typography variant="h6">
                Send Us a Message
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
                Please complete this form, and we'll contact you soon.......
              </Typography>
            </Box>
            <Box component="form">
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Contact number"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Message"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="primary">
                Submit
              </Button>
            </Box>
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
