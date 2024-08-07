
import React from "react";
import { Box, Typography, Container, Grid, Paper } from "@mui/material";
import Breadcrumb from "./component/Breadcrumb";
import Sidebar from "./component/Sidebar";
import ProfileForm from "./component/ProfileForm";
import { Footer } from "app/components";


const ProfilePage = () => {
  return (
    <>
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Container maxWidth="lg" sx={{ mt: 6, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Sidebar />
          </Grid>
          <Grid item xs={12} md={9}>
            <Box sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom>
                Edit Your Profile
              </Typography>
              <br></br>
              <ProfileForm />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
    <Footer />
    </>
  );
};

export default ProfilePage;
