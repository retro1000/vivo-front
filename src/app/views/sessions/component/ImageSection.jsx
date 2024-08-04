
import React from "react";
import { Box } from "@mui/material";

const ImageSection = () => {
  return (
    <Box
      sx={{
        width: "54%",
        padding: "80px 33px",
        borderRadius: 12,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src="/assets/images/2147689044.jpg"
        alt="Login illustration"
        style={{
          width: "100%",
          // maxWidth: "634px",
          aspectRatio: "0.94",
          objectFit: "cover",
          borderRadius: 12
        }}
      />
    </Box>
  );
};

export default ImageSection;
