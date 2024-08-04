
import React from "react";
import { Box, Typography, Grid, Container, Button } from "@mui/material";
import Header from "app/components/Header";
import Footer from "app/components/Footer";
import BrandCars from "./component/BrandCars";
import PartnerLogos from "./component/PartnerLogos";
import FAQSection from "./component/FAQSection";

const AboutPage = () => {
  return (
    <Box>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <br />
            <Header title={"About"} subTitle={"About Vivolk"}/>
            <Typography variant="body1" sx={{ mt: 4, color: "text.secondary" }}>
              With a proven track record of excellence and over 50 years of
              experience in Sri Lanka, AkzoNobel Paints, formally known as ICI
              Paints, is part of the world's biggest coatings manufacturer and
              number one in decorative paints and performance coatings.
              <br />
              <br />
              Technology and innovation have always been at the heart of
              AkzoNobel Group. As one of the world's largest paint manufacturers
              and the world's leading brand of premium quality paints, our
              success is often enhanced by our ability to meet market needs with
              quality products and value-added services.
              <br />
              <br />
              With the integration of ICI and AkzoNobel, we can leverage on
              global expertise and local insights to open up big opportunities
              for business synergies and improvements. We will also continue to
              provide our customers with the highest standard of products,
              service and support.
            </Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <br />
            <Box
              component="img"
              src="assets/images/about1.jpg"
              alt="About Vivolk"
              sx={{ width: "100%", height: "auto",borderRadius: '10px' }}
            />
          </Grid>
        </Grid>
      </Container>
      <BrandCars />
      <PartnerLogos />
      <FAQSection />
      <Footer />
    </Box>
  );
};

export default AboutPage;
