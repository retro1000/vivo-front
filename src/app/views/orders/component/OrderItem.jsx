import React, { useState } from 'react';
import { Box, Typography, IconButton, Checkbox, Avatar, Icon } from '@mui/material';
import BinIcon from '@mui/icons-material/Delete';
import { QuantitySelector } from 'app/components';
import { useFormatter } from 'app/hooks/useFormatter';

import {
  Groups,
  LocalShipping
} from '@mui/icons-material'

const OrderItem = ({ item, blockUpdate }) => {
  
  const [quantity, setQuantity] = useState(2);

  const { formatToLKR } = useFormatter()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: item.type?'row':'column', sm: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 2,
        borderBottom: '1px solid #ddd',
        gap: 2,
        overflowX: 'auto'
      }}
    >
      <Box width={'70%'} minWidth={'400px'} maxWidth={'800px'} display={'flex'} gap={'1em'} justifyContent={'space-between'} alignItems={item.type?'center':'flex-start'}>
        {/* <Avatar src={} alt={} /> */}
        {
          item.imageUrl?
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
          /> :
          
          <Icon 
            sx={{
              width: { xs: '100%', sm: '80px' },
              height: 'auto',
              borderRadius: '0.3em',
              flex: '0 0 auto',
              maxWidth:'80px',
              maxHeight: '80px',
              minWidth:'50px',
              minHeight: '50px',
              fontSize: '40px'
            }}
          >
            {item.type==='deliver'?<LocalShipping />:<Groups />}
          </Icon>
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
      {item && item.cost && <Typography variant='body2'>{formatToLKR(item.cost)}</Typography>}
      {item && item.quantity && 
        <Box
          sx={{
            flex: '0 0 auto',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <QuantitySelector count={item.quantity} setCount={setQuantity} limit={item.limit || -1} blockUpdate={blockUpdate} />
        </Box>
      }
      <Box
        sx={{
          flex: '0 0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="body2">{formatToLKR(item.totalCost)}</Typography>
      </Box>
      {
          item.type || blockUpdate ? '' :
          <Box
            sx={{
              flex: '0 0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
              <IconButton
                color="primary"
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.6)',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' },
                }}
              >
                <BinIcon />
              </IconButton>
          </Box>
        }
    </Box>
  );
};

export default OrderItem;
