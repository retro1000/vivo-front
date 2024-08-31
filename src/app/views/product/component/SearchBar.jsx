
import React from "react";
import { Box, Typography, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  return (
    <Box
      sx={{
        justifyContent: "center",
        borderRadius: 2,
        backgroundColor: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
        color: "#000",
        p: "7px 12px 7px 20px",
      }}
    >
      <Box sx={{ justifyContent: "center", display: "flex", gap: 2.5 }}>
        <InputBase
          placeholder="What are you looking for?"
          sx={{ fontFamily: "Poppins, Arial, sans-serif", my: "auto", flex: 1 }}
        />
        <SearchIcon sx={{ color: "#000", width: 24, height: 24 }} />
      </Box>
    </Box>
  );
};

export default SearchBar;
