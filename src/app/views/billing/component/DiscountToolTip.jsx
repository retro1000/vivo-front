import React, { useState, useRef } from "react";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Discount } from "@mui/icons-material";
import { Box, Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import { useFormatter } from "app/hooks/useFormatter";

const DiscountTooltip = ({ discountRules }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleOpen = (event) => {
    if (isMobile) {
      setOpen((prev) => !prev); // Toggle on click for mobile
    } else {
      setOpen(true); // Open on hover for desktop
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { formatToLKR } = useFormatter()

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        <Discount
          ref={anchorRef}
          fontSize="12px"
          sx={{ cursor: "pointer", color: "red" }}
          onMouseEnter={!isMobile ? handleOpen : undefined}
          onMouseLeave={!isMobile ? handleClose : undefined}
          onClick={isMobile ? handleOpen : undefined}
        />

        <Popper
          open={open}
          anchorEl={anchorRef.current}
          placement="bottom"
          disablePortal={false}
          modifiers={[
            {
              name: "preventOverflow",
              options: {
                boundary: "window",
                rootBoundary: "document",
                tether: false,
              },
            },
          ]}
        >
          <Paper
            elevation={3}
            sx={{
              width: 'max-content',
              height: 'max-content',
              maxWidth: 350,
              zIndex: 9999, // Ensure it appears above everything   
              backgroundColor: "white",
            }}
            onMouseEnter={!isMobile ? handleOpen : undefined} // Prevents closing when hovered over
            onMouseLeave={!isMobile ? handleClose : undefined}
          >
            {discountRules && discountRules.length > 0 && (
              <Box>
              {discountRules.map((rule, index) => (
                <Card key={index} sx={{ mb: 0.5, p: 0.5 }}>
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold" color="primary">
                      {rule.name}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Typography variant="body2" color="text.secondary">
                        Original Price:
                      </Typography>
                      <Typography
                        variant="body2"
                        color="error"
                        sx={{ textDecoration: "line-through", fontWeight: "bold" }}
                      >
                        {formatToLKR(rule.originalPrice)}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Typography variant="body2" color="text.secondary">
                        Discounted Price:
                      </Typography>
                      <Typography variant="body2" color="success.main" fontWeight="bold">
                        {formatToLKR(rule.discountedPrice)}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Box>
            )}
          </Paper>
        </Popper>
      </div>
    </ClickAwayListener>
  );
};

export default DiscountTooltip;
