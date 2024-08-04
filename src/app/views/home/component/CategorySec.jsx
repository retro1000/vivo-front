import React from 'react';
import { useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import styled from '@emotion/styled';
import { Box, Button, Typography } from '@mui/material';
import { useRef } from 'react';
import { useEffect } from 'react';

const srcset = (image, size, rows = 1, cols = 1) => {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const ZoomImg = styled('img')({
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.2)',
    },
});

export default function QuiltedImageList() {

  const [srcsets, setSrcsets] = useState()

  const imageListRef = useRef(null)

  useEffect(() => {
    
  }, [])

  const handleSrcsets = (item) => {
    const listInstance = imageListRef.current?.swiper;
    if (!listInstance) return;
    const bool = listInstance.width<695
    setSrcsets(...srcset(item.img, 121, bool?item.brRows:item.rows, bool?item.brCols:item.cols))
  }

  return (
    <Box display={'flex'} gap={'1em'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} ref={imageListRef}>
        <Typography variant='h4' textAlign={'center'}>FEATURED CATEGORIES</Typography>
        <ImageList
            sx={{ width: '80dvw', height: 'max-content', borderRadius: '8px' }}
            variant="quilted"
            cols={4}
            rowHeight={121}
        >
        {itemData.map((item) => (
            <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                <img
                    onResize={(item) => handleSrcsets(item)}
                    {...srcsets}
                    alt={item.title}
                    loading="lazy"
                    style={{
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                            transform: 'scale(1.2)',
                        },
                        zIndex: 99
                    }}
                />
                <Box display='flex' flexDirection='column' gap={'0.4em'} justifyContent='flex-start' alignContent={'center'} position={'absolute'} top={'40%'} left={'20%'}>    
                    <Typography variant='h5' color={'white'}>{item.title}</Typography>
                    <Button sx={{width:'100px'}} color='primary' variant='contained'>See more</Button>
                </Box>
            </ImageListItem>
        ))}
        </ImageList>
    </Box>
  );
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'MOBILE PHONES & ACCESSORIES',
    rows: 4,
    cols: 2,
    brRows:4,
    brCols: 4
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: "WOMEN'S SHOES",
    rows: 2,
    cols: 1,
    brRows:2,
    brCols: 2
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: "CLOTHING & APPAREL",
    rows: 2,
    cols: 1,
    brRows:2,
    brCols: 2
  },
  {
    img: '/assets/images/6005.jpg',
    title: "MEN'S SHOES",
    rows: 2,
    cols: 1,
    brRows:2,
    brCols: 2
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'GIFT ITMES',
    rows: 2,
    cols: 1,
    brRows:2,
    brCols: 2
  }
];