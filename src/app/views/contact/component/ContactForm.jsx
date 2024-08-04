
import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const ContactForm = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Box
          sx={{
            width: 10,
            height: 40,
            bgcolor: "#ED005D",
            borderRadius: 1,
            mr: 2,
          }}
        />
        <Typography variant="subtitle1" color="#ED005D" fontWeight={600}>
          Contact
        </Typography>
      </Box>
      <Typography variant="h4" component="h2" fontWeight={600} sx={{ mb: 3 }}>
        Get In Touch
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        We'd love to hear from you. Please fill out this form.
      </Typography>
      <TextField fullWidth label="Name" variant="standard" sx={{ mb: 3 }} />
      <TextField
        fullWidth
        label="Company Email"
        variant="standard"
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        label="Phone Number"
        variant="standard"
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        label="Title/Position"
        variant="standard"
        sx={{ mb: 3 }}
      />
      <TextField fullWidth label="Subject" variant="standard" sx={{ mb: 3 }} />
      <Button variant="contained"  fullWidth sx={{ mt: 2, backgroundColor: '#ED005D', color: 'white' }}>
        Connect with us
      </Button>
    </Box>
  );
};

export default ContactForm;
