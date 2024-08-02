
import React from "react";
import { Container, Grid, Typography, TextField, Button } from "@mui/material";
import ContactForm from "../../components/ContactPage/ContactForm";
import ContactImage from "../../components/ContactPage/ContactImage";
import ContactDetails from "../../components/ContactPage/ContactDetails";

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
