import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Grid,
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: '100%',
        backgroundColor: 'black',
        color: 'white',
        pt: 5,
        pb: 1.5,
      }}
    >
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', gap: 5, flexWrap: 'wrap' }}>
        <Box sx={{ color: 'neutral.50', flex:1, width: '18%', minWidth: '250px', maxWidth: '300px' }}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Support
            </Typography>
            <Typography variant="body2" gutterBottom>
              111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
            </Typography>
            <Typography variant="body2" gutterBottom>
              exclusive@gmail.com
            </Typography>
            <Typography variant="body2" gutterBottom>
              +88015-88888-9999
            </Typography>
          </Grid>
        </Box>

        <Box sx={{ color: 'neutral.50', flex:1, width: '18%', minWidth: '250px', maxWidth: '300px' }}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Account
            </Typography>
            <Typography variant="body2" gutterBottom>
              My Account
            </Typography>
            <Typography variant="body2" gutterBottom>
              Login / Register
            </Typography>
            <Typography variant="body2" gutterBottom>
              Cart
            </Typography>
            <Typography variant="body2" gutterBottom>
              Wishlist
            </Typography>
            <Typography variant="body2" gutterBottom>
              Shop
            </Typography>
          </Grid>
        </Box>

        <Box sx={{ color: 'neutral.50', flex:1, width: '18%', minWidth: '250px', maxWidth: '300px' }}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Link
            </Typography>
            <Typography variant="body2" gutterBottom>
              Privacy Policy
            </Typography>
            <Typography variant="body2" gutterBottom>
              Terms Of Use
            </Typography>
            <Typography variant="body2" gutterBottom>
              FAQ
            </Typography>
            <Typography variant="body2" gutterBottom>
              Contact
            </Typography>
          </Grid>
        </Box>

        <Box sx={{ textAlign: 'center', color: 'neutral.50', flex:1, width: '18%', minWidth: '250px', maxWidth: '300px' }}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Exclusive
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Subscribe
            </Typography>
            <Typography variant="body2" gutterBottom>
              Get 10% off your first order
            </Typography>
            <Box sx={{ display: 'flex', mt: 2 }}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Enter your email"
                sx={{ bgcolor: 'white', borderRadius: 1 }}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ ml: 1 }}
                endIcon={<SendIcon />}
              >
                Send
              </Button>
            </Box>
          </Grid>
        </Box>

        <Box sx={{ color: 'neutral.50', textAlign: 'center', flex:1 }}>
        <Typography variant="h6" gutterBottom>
            Download App
          </Typography>
          <Typography variant="body2" gutterBottom>
            Save $3 with App New User Only
          </Typography>
          <Box sx={{ display: 'flex', flexDirection:'column', mt: 2 }}>
            <Box sx={{ display: 'flex', flexDirection:'column' }}>
              <a href="#"><img src="assets\images\GetItOnGooglePlay.png" alt="App Store" style={{ width: 110, marginBottom: 4 }} /></a>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', mt: 2 }}>
            <FacebookIcon sx={{ mr: 2 }} />
            <TwitterIcon sx={{ mr: 2 }} />
            <LinkedInIcon />
          </Box>
        </Box>
      </Container>

      <Box sx={{ textAlign: 'center', color: 'white', pt: 1, mt: 1.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
          <Typography variant="body2">&copy; Copyright Vivolk 2024. All right reserved</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
