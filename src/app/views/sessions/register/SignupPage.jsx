
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
        <SignupForm loginTitle={"Signup"} loginSubtitle={"Sign Up Today for Free to Access All Our Products Anytime, Anywhere."} />
          
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default SignupPage;
