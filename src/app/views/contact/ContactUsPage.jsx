import React from "react";
import { Box, Typography, Grid, Container, Button, TextField, CircularProgress } from "@mui/material";
import Header from "app/components/Header";
import Footer from "app/components/Footer";
import { useRef } from "react";
import { useState } from "react";
import { useAxios } from "app/hooks/useAxios";
import { LoadingButton } from "@mui/lab";
import { useNotistack } from "app/hooks/useNotistack";
import { bussinesName } from "config";
// import BrandCars from "./component/BrandCars";
// import PartnerLogos from "./component/PartnerLogos";

const ContactUsPage = () => {

  const contactUsForm = useRef(null);

  const { apiNonAuth } = useAxios()

  const { triggerCommonErrors, triggerNotifications } = useNotistack()

  const [name, setName] = useState("") 
  const [email, setEmail] = useState("") 
  const [contactNo, setContactNo] = useState("") 
  const [message, setMessage] = useState("") 
  const [loading, setLoading] = useState(false) 

  // Function to scroll to a specific section
  const scrollToContactUsForm= (contactUsForm) => {
    contactUsForm.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async () => {

    if(!name || !contactNo || !email || !message || loading) return

    setLoading(true)
    await apiNonAuth.post('/support/send-message', {name: name, email: email, contactNo: contactNo, message: message})
      .then(response => {
        if(response.status===200){
          triggerNotifications([{text: 'Message sent successfully.', variant: 'success'}])
          setName('')
          setEmail('')
          setMessage('')
          setContactNo('')
        }
      })
      .catch(error => {
        triggerCommonErrors(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Box>
      <Container 
        maxWidth="1300px" 
        sx={{
          pr: { xs: 2, sm: 4, md: 6 },
          pl: { xs: 2, sm: 4, md: 6 },
          // minHeight: '80dvh'
        }}
      >
      <Header title={"Contact Us"} subTitle={"Get in Touch with "+bussinesName}/>

        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <br />
            <Typography variant="body1" sx={{ mt: 4, color: "text.secondary" }}>
              {`We are here to assist you with any inquiries, issues, or support you may need. At ${bussinesName}, customer satisfaction is our priority, and we strive to make every interaction smooth and helpful.`}
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
              <Box sx={{display: "flex", flexDirection: "column", gap: 2, justifyContent: "flex-start", alignItems: "flex-start"}}>
                <TextField
                  label="Name *"
                  variant="outlined"
                  fullWidth
                  value={name}
                  disabled={loading}
                  onChange={(e) => setName(e.target.value)}
                  sx={{ maxWidth: 600 }}
                />
                <TextField
                  label="Email *"
                  variant="outlined"
                  fullWidth
                  value={email}
                  disabled={loading}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ maxWidth: 600 }}
                />
                <TextField
                  label="Contact number *"
                  variant="outlined"
                  fullWidth
                  value={contactNo}
                  disabled={loading}
                  onChange={(e) => setContactNo(e.target.value)}
                  sx={{ maxWidth: 600 }}
                />
                <TextField
                  label="Message *"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  value={message}
                  disabled={loading}
                  onChange={(e) => setMessage(e.target.value)}
                  sx={{ maxWidth: 600 }}
                />
              </Box> 
              {/* <Button variant="contained" color="primary" sx={{mt: 2}} onClick={handleSubmit} >
                Submit
              </Button> */}
              <LoadingButton
                variant="contained"
                loading={loading}
                color="primary"
                onClick={handleSubmit}
                loadingPosition="start"
                startIcon={loading ? <CircularProgress size={20} /> : null}
                sx={{ 
                  mt: 2,
                }}
                disabled={name==='' || message==='' || email==='' || contactNo===''}
              >
                Send Message
              </LoadingButton>
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
