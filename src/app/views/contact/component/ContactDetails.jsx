
import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

const ContactDetails = () => {
  return (
    <Box sx={{ bgcolor: "#ED005D", color: "white", py: 10 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography
              variant="h4"
              component="h3"
              fontWeight={600}
              gutterBottom
            >
              Our Contact Details
            </Typography>
            <Typography variant="h6">Let's connect.</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Telephone
            </Typography>
            <Typography variant="body1" gutterBottom>
              (702) 555-0122
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              WhatsApp
            </Typography>
            <Typography variant="body1">+971 555 0114 321</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Office
            </Typography>
            <Typography variant="body1" gutterBottom>
              6391 Elgin St. Celina, Delaware 10299
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              Email
            </Typography>
            <Typography variant="body1">mail@mail.com</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactDetails;
