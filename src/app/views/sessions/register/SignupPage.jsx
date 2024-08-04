
import React from "react";
import { Box } from "@mui/material";
import ImageSection from "../component/ImageSection";
import SignupForm from "../component/SignupForm";
import { Footer } from "app/components";



const SignupPage = () => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", paddingLeft: 25 , paddingRight: 25 }}>
        <Box sx={{ display: "flex", width: "100%", marginTop: "-27px" }}>
        <ImageSection />
        <SignupForm loginTitle={"Signup"} loginSubtitle={"Log In for free to access to in any of our products"} />
          
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default SignupPage;
