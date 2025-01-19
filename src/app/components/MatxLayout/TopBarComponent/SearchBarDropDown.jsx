const { Typography, Box, Stack, lighten } = require("@mui/material")
const { themeColors } = require("app/components/MatxTheme/themeColors")
const { useFormatter } = require("app/hooks/useFormatter")
const { scrollBar } = require("app/utils/constant")
const { memo } = require("react")
const { forwardRef } = require("react")

const SearchBarDropDown = memo(forwardRef(({ searchBarOn, navigates, searchRes, loading, setLoading, searchBarMenuPosition }, ref ) => {

    const { formatToLKR } = useFormatter()
  
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
          searchRes && searchRes.length>0 && searchRes.map(res => (
  
            res.type && res.count && res.count>0 && res.result && res.result.length>0 && (
              <Stack>
                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} width={'100%'} p={2} sx={{background: lighten(themeColors.red.palette.primary.main, 0), color: 'white'}}>
                  <Typography variant="body2" fontSize={'16px'}>{res.type}</Typography>
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
      </Stack>
    )
  }))

  export default SearchBarDropDown