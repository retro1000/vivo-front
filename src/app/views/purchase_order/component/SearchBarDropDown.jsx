import { useEffect } from "react"

const { Stack, Typography, Box, lighten } = require("@mui/material")
const { themeColors } = require("app/components/MatxTheme/themeColors")
const { forwardRef } = require("react")
const { memo } = require("react")

const scrollBar = {
    '&::-webkit-scrollbar': {
      width: '4px', // Adjust the width of the scrollbar
    },
    '&::-webkit-scrollbar-track': {
      background: '#333', // Background of the scrollbar track
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'white', // Color of the scrollbar thumb
      borderRadius: '8px', // Rounded corners
      border: '2px solid transparent', // Adds a little padding between the thumb and track
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#777', // Thumb color on hover
    }
  }

const SearchBarDropDown = memo(forwardRef(({ searchBarOn, searchRes, loading, searchBarMenuPosition, selectedItems, addMultipleProucts, addProducts }, ref ) => {
    
    useEffect(() => {
        document.addEventListener("keydown", (event)=>addMultipleProucts(event));

    // Clean up the event listener when the component unmounts
        return () => {
        document.removeEventListener("keydown", (event)=>addMultipleProucts(event));
        };
    }, [selectedItems])

    return (
      <Stack 
        ref={ref}
        zIndex={199} 
        display={searchBarOn ? 'flex' : 'none'}
        // justifyContent={'center'}
        // alignItems={'center'}
        sx={{
          position: 'absolute', 
          background: 'white', 
          borderRadius: 1, 
          overflowY: 'auto', 
          maxHeight: '400px',
          minHeight: '300px', 
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
        style={{
          position: 'absolute',
          top: `${searchBarMenuPosition.top}px`,
          left: `${searchBarMenuPosition.left}px`,
          width: `${searchBarMenuPosition.width}px`,
        }}
      >
        { 
          searchRes && (
            searchRes.type && searchRes.count && searchRes.count>0 && searchRes.result && searchRes.result.length>0 ? (
              <Stack>
                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} width={'100%'} p={2} sx={{background: lighten(themeColors.red.palette.primary.main, 0), color: 'white'}}>
                  <Typography variant="body2" fontSize={'16px'}>{searchRes.type}</Typography>
                  <Typography variant="body2">{`${searchRes.count} results found`}</Typography>
                </Box>
                {
                  searchRes.result.map(resEl => (
                      <Box width={'100%'} sx={{backgroundColor: selectedItems.filter(item => item.id===resEl.id).length===1?'rgba(240, 237, 237, 0.8)':'', cursor: 'pointer', '&:hover': {backgroundColor: 'rgba(240, 237, 237, 0.8)'}}} display={'flex'} padding={1} gap={1} alignItems={'flex-start'} onClick={(event)=>addProducts(event, resEl)}>
                        {
                          resEl.imageUrl && 
                          <Box
                            component="img"
                            src={resEl.imageUrl}
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
                            resEl && resEl.attributes && resEl.attributes.length>0 ? resEl.attributes.map((attribute, index) => (
                            <Typography key={index} variant='body2' sx={{display: 'flex', gap: '1em'}}><Typography variant='body2' sx={{fontWeight: 600}}>{attribute.name} : </Typography>{attribute.value}</Typography>
                            )) : ''
                          }
                        </Stack>
                      </Box>
                  ))
                }
              </Stack>
            ) : (
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'} width={'100%'}>
                    <Typography variant="body2">No results find...</Typography>
                </Box>
            ) 
          )
        }
      </Stack>
    )
  }))

  export default SearchBarDropDown