import { useState } from "react";

import { Stack, Box, Typography, IconButton, Checkbox } from "@mui/material";
import { useFormatter } from "app/hooks/useFormatter";
import BinIcon from '@mui/icons-material/Delete';
import { QuantitySelector } from "app/components";

function OrderShipmentVariationCard({ item }) {

  const [quantity, setQuantity] = useState(2);

  const { formatToLKR } = useFormatter()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        // justifyContent: 'space-between',
        padding: 2,
        borderBottom: '1px solid #ddd',
        gap: 2,
        // overflowX: 'auto'
      }}
    >

      <Box display={'flex'} alignItems={'flex-start'} width={'100%'}>
        <Checkbox size="small" sx={{position: 'relative', top: '0'}}/>
        <Box flex={1} width={"100%"} display={'flex'} flexWrap={'wrap'} justifyContent={'center'} gap={1}>
          <Box width={'70%'} minWidth={'400px'} display={'flex'} gap={'1em'} justifyContent={'space-between'} alignItems={'flex-start'} flex={1}>
            {
              <Box
                component="img"
                src={item.imageUrl}
                alt={item.name}
                sx={{
                  width: { xs: '100%', sm: '80px' },
                  height: 'auto',
                  borderRadius: '0.3em',
                  flex: '0 0 auto',
                  maxWidth:'80px',
                  maxHeight: '80px',
                  minWidth:'50px',
                  minHeight: '50px',
                }}
              /> 
            }
            <Box flex={1} display={'flex'} flexDirection={'column'} gap={'0.4em'} justifyContent={'flex-start'} alignItems={'space-between'}>
              <Typography variant='body2'>{item.name}</Typography>
              {
                item && item.attributes && item.attributes.length>0 ? item.attributes.map((attribute, index) => (
                  <Typography key={index} variant='body2' sx={{display: 'flex', gap: '1em'}}><Typography variant='body2' sx={{fontWeight: 600}}>{attribute.name} : </Typography>{attribute.value}</Typography>
                )) : ''
              }
            </Box>
          </Box>
          {item && item.quantity && 
            <Box
              sx={{
                flex: '0 0 auto',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <QuantitySelector count={item.quantity} setCount={setQuantity} limit={item.limit || -1} />
            </Box>
          }
          </Box>
        </Box>
    </Box>
  );
}

export default OrderShipmentVariationCard;
