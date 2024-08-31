
import React from "react";
import { Box } from "@mui/material";

const ContactImage = () => {
  return (
    <Box
      component="img"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ac82936551d6e2e0f420034d498ba5a8d4bf3f412b89caa59e53d566e8478db?apiKey=6f06a6b4e70e4dde93ec8099db2adb9d&&apiKey=6f06a6b4e70e4dde93ec8099db2adb9d"
      alt="Contact"
      sx={{
        width: "100%",
        height: "auto",
        objectFit: "cover",
        aspectRatio: "0.94",
      }}
    />
  );
};

export default ContactImage;
