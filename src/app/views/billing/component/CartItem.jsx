import React, { useState } from 'react';
import { Box, Typography, IconButton, Checkbox } from '@mui/material';
import BinIcon from '@mui/icons-material/Delete';
import { QuantitySelector } from 'app/components';
import { useFormatter } from 'app/hooks/useFormatter';


const CartItem = ({ image, name, price, subtotal }) => {
  const [quantity, setQuantity] = useState(2);

  const { formatToLKR } = useFormatter()


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        padding: 2,
        borderBottom: '1px solid #ddd',
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: '0 0 auto',
          width: { xs: '100%', sm: 'auto' },
          maxWidth: '100px',
        }}
      >
        <Checkbox />
      </Box>
      <Box
        component="img"
        src={image}
        alt={name}
        sx={{
          width: { xs: '100%', sm: '80px' },
          height: 'auto',
          borderRadius: '0.3em',
          flex: '0 0 auto',
          maxWidth:'80px',
          maxHeight: '80px',
          minWidth:'50px',
          minHeight: '50px'
        }}
      />
      <Box
        sx={{
          flex: '1 1 auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="body1" noWrap>
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {formatToLKR(price)}
        </Typography>
      </Box>
      <Box
        sx={{
          flex: '0 0 auto',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <QuantitySelector count={quantity} setCount={setQuantity} limit={3} />
      </Box>
      <Box
        sx={{
          flex: '0 0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="body1">{formatToLKR(subtotal)}</Typography>
      </Box>
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
    </Box>
  );
};

export default CartItem;
