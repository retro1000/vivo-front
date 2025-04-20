import React, { useCallback, memo } from "react";
import { Card, Box, Typography, Button, Grid } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import StarIcon from "@mui/icons-material/Star";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ProductCardSlide from "./ProductCardSlide"; // Adjust path as needed
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { ProductCardWrapper } from "..";

// Styled components
const DealsCard = styled(Card)(({ theme, maxWidth }) => ({
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: theme.shadows[4],
  background: "white",
  width: "100%",
  maxWidth: maxWidth || "1200px",
  margin: "0 auto",
}));

const HeaderBox = styled(Box)(({ theme, gradientStart, gradientEnd }) => ({
  background: `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`,
  padding: theme.spacing(1.5, 2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(2),
  },
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const TitleTypography = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  fontWeight: "bold",
  color: "white",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    fontSize: "20px",
  },
}));

const ActionButton = styled(Button)(({ theme, gradientStart }) => ({
  background: "white",
  color: gradientStart,
  borderRadius: "9999px",
  padding: theme.spacing(0.5, 1.5),
  fontSize: "12px",
  fontWeight: "medium",
  textTransform: "none",
  "&:hover": {
    background: theme.palette.grey[100],
  },
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(0.5, 2),
    fontSize: "14px",
  },
}));

const SwiperContainer = styled(Box)(({ theme, paginationActiveColor, paginationInactiveColor }) => ({
  padding: theme.spacing(1.5, 2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(2),
  },
  "& .swiper-pagination-bullet": {
    background: paginationInactiveColor,
    opacity: 0.5,
  },
  "& .swiper-pagination-bullet-active": {
    background: paginationActiveColor,
    opacity: 1,
  },
}));

// Default breakpoints
const defaultBreakpoints = {
  600: {
    slidesPerView: 2,
    spaceBetween: 16,
  },
  960: {
    slidesPerView: 3,
    spaceBetween: 24,
  },
  1280: {
    slidesPerView: 4,
    spaceBetween: 24,
  },
};

const TodaysDealsCard = ({
  title = "Bundle Deals",
  buttonText = "3 from US $2.99",
  onButtonClick,
  gradientStart = "#f97316",
  gradientEnd = "#fb923c",
  paginationActiveColor = "#f97316",
  paginationInactiveColor = "#fb923c",
  maxWidth = 500,
  icon: Icon = StarIcon,
  dealsData,
  cardComponent: CardComponent = ProductCardWrapper,
  breakpoints = defaultBreakpoints,
  autoplay = true,
}) => {
  // Handle button click with fallback
  const handleButtonClick = useCallback(() => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      console.log(`View more: ${title}`);
    }
  }, [onButtonClick, title]);

  return (
    <Grid item xs={12}>
      <DealsCard maxWidth={maxWidth}>
        <HeaderBox gradientStart={gradientStart} gradientEnd={gradientEnd}>
          <TitleTypography>
            {Icon && <Icon sx={{ fontSize: { xs: 18, sm: 20 }, mr: 1 }} />}
            {title}
          </TitleTypography>
          <ActionButton
            onClick={handleButtonClick}
            gradientStart={gradientStart}
            endIcon={<ChevronRightIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
          >
            {buttonText}
          </ActionButton>
        </HeaderBox>
        <SwiperContainer
          paginationActiveColor={paginationActiveColor}
          paginationInactiveColor={paginationInactiveColor}
        >
          <Swiper
            modules={[Pagination, ...(autoplay ? [Autoplay] : [])]}
            spaceBetween={16}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={autoplay ? { delay: 5000, disableOnInteraction: true } : false}
            speed={600}
            breakpoints={breakpoints}
            style={{ paddingBottom: "40px" }}
          >
            {dealsData && dealsData.map((product) => (
              <SwiperSlide key={product.id}>
                <CardComponent
                  product={product}
                  responsiveCardProps={{ xs: 12 }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </SwiperContainer>
      </DealsCard>
    </Grid>
  );
};

// PropTypes for validation
// TodaysDealsCard.propTypes = {
//   title: PropTypes.string,
//   buttonText: PropTypes.string,
//   onButtonClick: PropTypes.func,
//   gradientStart: PropTypes.string,
//   gradientEnd: PropTypes.string,
//   paginationActiveColor: PropTypes.string,
//   paginationInactiveColor: PropTypes.string,
//   maxWidth: PropTypes.number,
//   icon: PropTypes.elementType,
//   dealsData: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       name: PropTypes.string.isRequired,
//       price: PropTypes.number.isRequired,
//       rating: PropTypes.number.isRequired,
//       reviews: PropTypes.number.isRequired,
//       imgs: PropTypes.arrayOf(PropTypes.string).isRequired,
//       wishList: PropTypes.bool,
//       isNew: PropTypes.bool,
//       isSale: PropTypes.bool,
//       realPrice: PropTypes.number,
//       isFlashSale: PropTypes.bool,
//       endTime: PropTypes.string,
//       flashSaleLabel: PropTypes.string,
//       flashSaleCta: PropTypes.string,
//       sold: PropTypes.number,
//     })
//   ).isRequired,
//   cardComponent: PropTypes.elementType,
//   breakpoints: PropTypes.object,
//   autoplay: PropTypes.bool,
// };

export default memo(TodaysDealsCard);