import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const FeaturedCategoryCard = ({ title, image, link }) => {
  const navigate = useNavigate(); // React Router navigation

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
      onClick={() => navigate(link)} // Navigate to the given link
      style={{ cursor: "pointer" }}
    >
      <Card
        sx={{
          maxWidth: 800,
          borderRadius: "16px",
          boxShadow: 3,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <CardMedia
          component="img"
          height="300"
          image={image}
          alt={title}
          sx={{
            transition: "transform 0.3s ease-in-out",
            "&:hover": { transform: "scale(1.1)" },
          }}
        />
        <CardContent
          sx={{
            background: "rgba(0, 0, 0, 0.6)",
            color: "#fff",
            textAlign: "center",
            position: "absolute",
            bottom: 0,
            width: "100%",
            padding: "12px",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FeaturedCategoryCard;
