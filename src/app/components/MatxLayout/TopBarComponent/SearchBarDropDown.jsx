import { ClearIcon } from "@mui/x-date-pickers"
import useLayout from "app/hooks/useLayout"

const { Typography, Box, Stack, lighten, Grid, List, ListItem, ListItemText, Card, CardMedia, CardContent, Divider, IconButton } = require("@mui/material")
const { themeColors } = require("app/components/MatxTheme/themeColors")
const { useFormatter } = require("app/hooks/useFormatter")
const { scrollBar } = require("app/utils/constant")
const { memo } = require("react")
const { forwardRef } = require("react")

const searchHistory = [
  "phone mobile tecno camon 20",
  "phone mobile android",
  "redmi phone",
  "ear buds lenovo",
  "case for iphone 13",
];

const discoverMore = [
  "ear buds lenovo",
  "case for iphone 13",
  "earbuds bluetooth",
  "free shipping items",
  "man shoes",
  "smartwatch free shipping",
  "winter jacket for men",
];

const recommendations = [
  { title: "Used Phones", image: "https://ae-pic-a1.aliexpress-media.com/kf/S64b0e089852041fc8af3e4de4e6dd54ag.jpg_220x220q75.jpg_.avif" },
  { title: "Iphone", image: "https://ae-pic-a1.aliexpress-media.com/kf/S64b0e089852041fc8af3e4de4e6dd54ag.jpg_220x220q75.jpg_.avif" },
  { title: "Smartphone Android", image: "https://ae-pic-a1.aliexpress-media.com/kf/S64b0e089852041fc8af3e4de4e6dd54ag.jpg_220x220q75.jpg_.avif" },
  { title: "Phone Case", image: "https://ae-pic-a1.aliexpress-media.com/kf/S64b0e089852041fc8af3e4de4e6dd54ag.jpg_220x220q75.jpg_.avif" },
  { title: "Power Bank", image: "https://ae-pic-a1.aliexpress-media.com/kf/S64b0e089852041fc8af3e4de4e6dd54ag.jpg_220x220q75.jpg_.avif" },
  { title: "Walkie Talkie", image: "https://ae-pic-a1.aliexpress-media.com/kf/S64b0e089852041fc8af3e4de4e6dd54ag.jpg_220x220q75.jpg_.avif" },
  { title: "Screen Protectors", image: "https://ae-pic-a1.aliexpress-media.com/kf/S64b0e089852041fc8af3e4de4e6dd54ag.jpg_220x220q75.jpg_.avif" },
  { title: "Mobile Phone Chargers", image: "https://ae-pic-a1.aliexpress-media.com/kf/S64b0e089852041fc8af3e4de4e6dd54ag.jpg_220x220q75.jpg_.avif" },
];

const SearchBarDropDown = memo(forwardRef(({ navigates, searchBarMenuPosition }, ref ) => {

    const { formatToLKR } = useFormatter()

    const { search, searchBarDropDownToggle } = useLayout()

    const { loading, values, searchBarOn  } = search;
  
    return (
      <Stack 
        ref={ref}
        zIndex={1301} 
        display={searchBarOn ? 'flex' : 'none'}
        sx={{
          position: 'absolute', 
          background: 'white', 
          borderRadius: 1, 
          overflowY: 'auto', 
          maxHeight: '400px', 
          boxShadow: 4, 
          ...searchBarMenuPosition,
           ...{
            ...scrollBar,
            '&::-webkit-scrollbar-track': {
              background: 'white',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'gray',
            }
          }
        }}
      >
        { 
          values && values.length>0 && values.map(res => (
            res.type && res.count && res.count>0 && res.result && res.result.length>0 && (
              <Stack>
                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} width={'100%'} p={2} sx={{background: lighten(themeColors.red.palette.primary.main, 0), color: 'white'}}>
                  <Typography variant="body2" fontSize={'16px'} sx={{fontWeight: 'bold'}}>{res.type}</Typography>
                  <Typography variant="body2">{`${res.count} results found`}</Typography>
                </Box>
                {
                  res.result.map(resEl => (
                      <Box width={'100%'} sx={{cursor: 'pointer', '&:hover': {backgroundColor: 'rgba(240, 237, 237, 0.8)'}}} display={'flex'} padding={1} gap={1} alignItems={'flex-start'} onClick={()=> resEl.nav && window.open(''+resEl.nav)}>
                        {
                          resEl.img && 
                          <Box
                            component="img"
                            src={resEl.img}
                            sx={{
                              width: 80,
                              height: 80,
                              borderRadius: '0.3em',
                              flex: '0 0 auto',
                            }}
                          />
                        }
                        <Stack display={'flex'} flex={1} gap={1}>
                          {resEl.name && <Typography variant="body2" flexWrap={'wrap'}>{resEl.name}</Typography>}
                          {
                            resEl.price && 
                              <Box display={'flex'} gap={1} justifyContent={'flex-start'} alignItems={'flex-start'} flexWrap={'wrap'}>
                                <Typography variant="body2" sx={{textDecoration: resEl.discount?'line-through':'none'}}>{formatToLKR(resEl.price)}</Typography>
                                {resEl.discount && <Typography variant="body2" color={themeColors.red.palette.primary.main}>{formatToLKR(resEl.discount)}</Typography>}
                              </Box>
                          }
                        </Stack>
                      </Box>
                  ))
                }
              </Stack>
            )
          ))  
        }

        { 
          searchHistory && searchHistory.length > 0 && ( 
            <Box>
              <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} width={'100%'} p={2} sx={{background: lighten(themeColors.red.palette.primary.main, 0), color: 'white'}}>
                <Typography variant="body2" fontSize={'16px'} sx={{fontWeight: 'bold'}}>Search history</Typography>
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, p: 1 }}>
                {searchHistory.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      bgcolor: "#f5f5f5",
                      borderRadius: 2,
                      p: "2px 8px",
                      fontSize: 12,
                    }}
                  >
                    {item}
                    <IconButton size="small" sx={{ ml: 1 }}>
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Box>
          )
        }


        {
          <Box>
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} width={'100%'} p={2} sx={{background: lighten(themeColors.red.palette.primary.main, 0), color: 'white'}}>
                <Typography variant="body2" fontSize={'16px'} sx={{fontWeight: 'bold'}}>Discover more</Typography>
            </Box>
            <Grid container spacing={1} p={1}>
              <Grid item xs={4}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Hot topics
                </Typography>
                <List dense>
                  {discoverMore.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={8}>
                <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Phones Telecommunications
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Get more
                  </Typography>
                </Box>
                <Grid container spacing={1} sx={{ mt: 1 }}>
                  {recommendations.map((rec, index) => (
                    <Grid item xs={6} key={index}>
                      <Card sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 1 }}>
                        <CardMedia
                          component="img"
                          image={rec.image}
                          alt={rec.title}
                          sx={{ width: 50, height: 50, mb: 1 }}
                        />
                        <CardContent sx={{ textAlign: "center", p: 0 }}>
                          <Typography variant="body2">{rec.title}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Box>  
        }
      </Stack>
    )
  }))

  export default SearchBarDropDown