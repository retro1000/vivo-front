
import React from "react";
import { Container, Grid, Typography, TextField, Button } from "@mui/material";
import ContactForm from "./component/ContactForm";
import ContactImage from "./component/ContactImage";
import ContactDetails from "./component/ContactDetails";


const ContactPage = () => {
  return (
    <Container maxWidth={false} disableGutters>
      <Container maxWidth="lg" sx={{ mt: 8, mb: 14 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <ContactForm />
          </Grid>
          <Grid item xs={12} md={6}>
            <ContactImage />
          </Grid>
        </Grid>
      </Container>
      <ContactDetails />
    </Container>
  );
};

export default ContactPage;
