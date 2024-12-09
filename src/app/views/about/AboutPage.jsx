
import React from "react";
import { Box, Typography, Grid, Container, Button } from "@mui/material";
import Header from "app/components/Header";
import Footer from "app/components/Footer";
import FAQSection from "./component/FAQSection";
import { bussinesContact } from "config";
import { bussinesName } from "config";
import { startYear } from "config";
import { containerPadding } from "app/utils/constant";

const AboutPage = () => {
  return (
    <Box>
      <Container 
        maxWidth="1300px"
        sx={{
          ...containerPadding
          // minHeight: '80dvh'
        }}
      >
      <Header title={"About"} subTitle={`About ${bussinesName}`}/>

        <Grid container>
          <Grid item xs={12} md={7} mb={2}>
            <br />
            <Typography variant="body1" sx={{ mt: 4, color: "text.secondary" }}>
              {`With nearly ${new Date().getFullYear()-startYear} years of dedicated service, ${bussinesName} has established itself as a trusted provider of high-quality mobile accessories, shoes, clothes, and gift items. Our commitment to excellence and customer satisfaction has been the cornerstone of our success.`}
              <br />
              <br />
              {`At ${bussinesName}, we pride ourselves on offering a diverse range of products that cater to the varied tastes and needs of our customers. Whether you're looking for the latest mobile accessories to complement your devices, stylish footwear and apparel to enhance your wardrobe, or unique gift items to make any occasion special, we have something for everyone.`}
              <br />
              <br />
              Our business is built on a foundation of quality, innovation, and exceptional customer service. We continuously strive to bring you the best products at competitive prices, ensuring that every shopping experience with us is a pleasant one.
              <br />
              <br />
              {`Join the ${bussinesName} family today and discover why countless customers trust us for their mobile accessories, shoes, clothes, and gift needs. We look forward to serving you and helping you find the perfect items to suit your lifestyle.`}
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={5} display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
            <Box
              component="img"
              src="/assets/images/2149060289.jpg"
              alt={`About ${bussinesName}`}
              sx={{ width: "70%", height: "auto",borderRadius: '10px' }}
            />
          </Grid>
        </Grid>
      </Container>
      {/* <BrandCars />
      <PartnerLogos /> */}
      <FAQSection />
      <Footer />
    </Box>
  );
};

export default AboutPage;
