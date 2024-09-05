
import React from "react";
import { Box } from "@mui/material";

const ImageSection = () => {
  return (
    <Box
      component="img"
      src="/assets/images/2147689044.jpg"
      alt="Shopping"
      sx={{
        width: "50%",
        // padding: "10px",
        borderRadius: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "sticky",
        maxWidth: "634px",
        aspectRatio: "0.94",
        objectFit: "cover",
        // height: '50%'
      }}
    />
    // <Box
    //   sx={{
    //     width: "54%",
    //     padding: "80px 33px",
    //     borderRadius: 12,
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     position: "sticky",
    //   }}
    // >
    //   <img
    //     src="/assets/images/2147689044.jpg"
    //     alt="Login illustration"
    //     style={{
    //       width: "100%",
    //       // maxWidth: "634px",
    //       aspectRatio: "0.94",
    //       objectFit: "cover",
    //       borderRadius: 12,
    //       position: "sticky",
    //     }}
    //   />
    // </Box>
  );
};

export default ImageSection;
