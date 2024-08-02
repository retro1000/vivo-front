
import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";

const Hero = () => {
  return (
    <Box
      sx={{
        backgroundImage:
          "url(assets/images/8735.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "508px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Box maxWidth="711px" display={'flex'} justifyContent={'center'} flexDirection={'column'}>
          <Typography variant="h3" color="white" gutterBottom textAlign={'center'} sx={{borderRadius: '5px', padding: '0.4em',  backgroundColor: 'rgba(0, 0, 0, 0.1)'}}>
            Paint Colours and Wall Paints
          </Typography>
          <Box display="flex" justifyContent="center" mt={1} gap={'1em'}>
            <Button variant="contained" color="primary">
              I have some colours in mind
            </Button>
            <Button variant="contained" color="primary">
              I'm not sure where to start
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
