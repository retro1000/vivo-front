
import React from "react";
import { Box } from "@mui/material";

const ImageSection = () => {
  return (
    <Box
      sx={{
        width: "54%",
        padding: "80px 33px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/965cde82894786ae618b5d3b7cf51750aec08960f5f71cbfb2bda003cf8089c3?apiKey=6f06a6b4e70e4dde93ec8099db2adb9d&&apiKey=6f06a6b4e70e4dde93ec8099db2adb9d"
        alt="Login illustration"
        style={{
          width: "100%",
          maxWidth: "634px",
          aspectRatio: "0.94",
          objectFit: "cover",
        }}
      />
    </Box>
  );
};

export default ImageSection;
