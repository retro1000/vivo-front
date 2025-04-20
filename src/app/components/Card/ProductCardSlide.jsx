import React, { useRef, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Grid,
  Stack,
  styled,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { ReviewStatsCard } from "..";
import { themeColors } from "../MatxTheme/themeColors";
import { useTheme } from "@emotion/react";
import { useTimer } from "app/hooks/useTimer";
import { useFormatter } from "app/hooks/useFormatter";

// Constants for animations and styles
const animations = {
  pulse: `
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
  `,
  bounce: `
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }
  `,
};

// Styled components
const ProductCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
  boxShadow: "none",
  borderRadius: "8px",
  width: "100%",
  maxWidth: "280px",
  overflow: "hidden",
  "& .swiper-pagination-bullet-active": {
    backgroundColor: themeColors.red.palette.primary.main,
  },
}));

const SwiperContainer = styled(Box)({
  position: "relative",
  borderRadius: "8px",
});

const Badge = styled(Typography)(({ theme, type }) => ({
  position: "absolute",
  top: type === "new" ? 10 : 45,
  left: 10,
  backgroundColor:
    type === "new" ? "#00c950" : themeColors.red.palette.primary.main,
  color: "#fafafa",
  padding: "4px 12px",
  borderRadius: "4px",
  zIndex: 10,
  fontSize: "0.75rem",
}));

const ActionButton = styled(IconButton)({
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
});

const FlashSaleBar = styled(Box)({
  background: "linear-gradient(to right, #f97316, #ef4444)",
  position: "relative",
  overflow: "hidden",
  borderBottomLeftRadius: "8px",
  borderBottomRightRadius: "8px",
  padding: "4px 4px 0 4px",
});

const TimerBox = styled(Box)(({ isPulsing }) => ({
  background: "rgba(255, 255, 255, 0.2)",
  padding: "4px 8px",
  borderRadius: "4px",
  color: isPulsing ? "#fecdd3" : "white",
  fontFamily: "monospace",
  fontSize: "0.75rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "all 0.3s",
  transform: isPulsing ? "scale(1.1)" : "scale(1)",
}));

// Reusable TimerDisplay component
const TimerDisplay = ({ timer, isPulsing }) => {

  const formatTime = useCallback((time) => String(time).padStart(2, "0"), []);

  return (
    <Stack direction="row" alignItems="center" spacing={0.5}>
      <TimerBox isPulsing={isPulsing}>
        {formatTime(timer.days)}
      </TimerBox>
      <Typography sx={{ color: "white", fontWeight: "bold", fontSize: "0.75rem" }}>
        :
      </Typography>
      <TimerBox isPulsing={isPulsing}>
        {formatTime(timer.hours)}
      </TimerBox>
      <Typography sx={{ color: "white", fontWeight: "bold", fontSize: "0.75rem" }}>
        :
      </Typography>
      <TimerBox isPulsing={isPulsing}>
        {formatTime(timer.minutes)}
      </TimerBox>
      <Typography sx={{ color: "white", fontWeight: "bold", fontSize: "0.75rem" }}>
        :
      </Typography>
      <TimerBox isPulsing={isPulsing}>
        {formatTime(timer.seconds)}
      </TimerBox>
    </Stack>
  );
};

// Main ProductCardSlide component
const ProductCardSlide = ({ product, removeWishList, responsiveCardProps }) => {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const swiperRef = useRef(null);
  const theme = useTheme();

  const {formatSoldCount, formatToLKR} = useFormatter();

  // Memoize soldCount to avoid recomputation
  const soldCount = useMemo(() => {
    return formatSoldCount(product.sold);
  }, []);

  // Throttle mouse move to improve performance
  const handleMouseMove = useCallback(
    (e) => {
      const swiperInstance = swiperRef.current?.swiper;
      if (!swiperInstance) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const slideIndex = Math.floor(
        ((e.clientX - rect.left) / rect.width) * swiperInstance.slides.length
      );
      swiperInstance.slideTo(slideIndex);
    },
    []
  );

  // Use useTimer for flash sale countdown
  const [isTimerPulsing, setIsTimerPulsing] = React.useState(false);
  const timer = useTimer(
    product.isFlashSale ? product.endTime : { days: 0, hours: 0, minutes: 0, seconds: 0 },
    (currentTime) => {
      if (currentTime.seconds < 10 && currentTime.seconds > 0) {
        setIsTimerPulsing(true);
        setTimeout(() => setIsTimerPulsing(false), 500);
      }
    },
    !product.isFlashSale
  );

  return (
    <Grid
      item
      xs={responsiveCardProps?.xs || 6}
      sm={responsiveCardProps?.sm || 4}
      md={responsiveCardProps?.md || 4}
      lg={responsiveCardProps?.lg || 3}
      key={product.id}
    >
      <style>{`${animations.pulse}${animations.bounce}`}</style>
      <ProductCard ref={cardRef}>
        <SwiperContainer onMouseMove={handleMouseMove}>
          <Swiper
            ref={swiperRef}
            spaceBetween={0.1}
            centeredSlides
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {product.imgs.map((slide, index) => (
              <SwiperSlide key={index}>
                <Box
                  sx={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    borderRadius: "8px",
                    overflow: "hidden",
                    background: "rgba(226, 225, 225, 0.6)",
                    position: "relative",
                  }}
                >
                  <img
                    src={slide}
                    alt={`Product ${index}`}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                  />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>

          {product.isNew && <Badge type="new">NEW</Badge>}
          {product.isSale && <Badge type="sale">SALE</Badge>}

          <Box sx={{ position: "absolute", top: 10, right: 10, display: "flex", flexDirection: "column", gap: 1, zIndex: 10 }}>
            {removeWishList ? (
              <ActionButton onClick={() => removeWishList(product.id)}>
                <DeleteIcon />
              </ActionButton>
            ) : (
              <ActionButton>
                {product.wishList ? (
                  <FavoriteIcon sx={{ color: themeColors.red.palette.primary.main }} />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </ActionButton>
            )}
            <ActionButton onClick={() => navigate(`/product/view/${product.id}`)}>
              <RemoveRedEyeIcon />
            </ActionButton>
          </Box>
        </SwiperContainer>

        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            padding: 0,
            paddingBottom: "0 !important",
            marginTop: "7.2px",
            marginBottom: product.isFlashSale ? "4px" : 0,
            minHeight: product.isFlashSale ? "auto" : "90px",
          }}
        >
          <Typography
            variant="body1"
            component="div"
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              fontSize: "13px",
              lineHeight: 1.2,
              marginBottom: 0.5,
            }}
            title={product.name}
          >
            {product.name}
          </Typography>
          <Stack direction="row" alignItems="center" gap={1} marginTop={0.5} display={'flex'} flexWrap={'wrap'}>
            <ReviewStatsCard
              size="small"
              reviewCount={product.reviews}
              rating={product.rating}
              id={product.id}
              isSingleStar={false}
              showRate={true}
            />
            <Box
              sx={{
                backgroundColor: theme.palette.custom.lightBlue,
                color: theme.palette.custom.primaryBlue,
                fontSize: "12px",
                fontWeight: "medium",
                padding: "2px 8px",
                borderRadius: "9999px",
              }}
            >
              {soldCount}
            </Box>
          </Stack>
          <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", marginTop: 0.5 }}>
            <Typography variant="subtitle1" color="error" sx={{ marginRight: 1 }}>
              {formatToLKR(product.price)}
            </Typography>
            {product.realPrice && (
              <Typography
                variant="subtitle2"
                color="textSecondary"
                sx={{ textDecoration: "line-through", fontSize: "0.8rem" }}
              >
                {formatToLKR(product.realPrice)}
              </Typography>
            )}
          </Box>
        </CardContent>

        {product.isFlashSale && (
          <FlashSaleBar>
            <Box sx={{ position: "absolute", inset: 0, opacity: 0.2 }}>
              <Box
                sx={{
                  position: "absolute",
                  width: 80,
                  height: 80,
                  background: "white",
                  borderRadius: "50%",
                  top: -40,
                  left: -40,
                  animation: "pulse 2s infinite",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  width: 64,
                  height: 64,
                  background: "white",
                  borderRadius: "50%",
                  bottom: -32,
                  right: -32,
                  animation: "pulse 2s infinite 0.5s",
                }}
              />
            </Box>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5} display={'flex'} flexWrap={'wrap'}>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                {/* <AccessTimeIcon sx={{ fontSize: 15, color: "white", animation: "pulse 2s infinite" }} /> */}
                <Typography variant="caption" sx={{ fontSize: 10, color: "white", fontWeight: "bold" }}>
                  {product.flashSaleLabel || "FLASH SALE"}
                </Typography>
              </Stack>
              <TimerDisplay timer={timer} isPulsing={isTimerPulsing} />
            </Stack>
            <Typography
              variant="caption"
              sx={{
                color: "white",
                fontWeight: "medium",
                textAlign: "center",
                display: "block",
                marginTop: 0.5,
                animation: "bounce 1s infinite",
                fontSize: "0.65rem",
              }}
            >
              {product.flashSaleCta || "Hurry up! Limited stock available"}
            </Typography>
          </FlashSaleBar>
        )}
      </ProductCard>
    </Grid>
  );
};

export default ProductCardSlide;