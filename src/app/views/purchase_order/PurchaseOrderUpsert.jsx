import { useState } from "react";

import { Stack, Box, styled, Typography, Tabs, Tab, Grid, Icon, IconButton, Checkbox } from "@mui/material";

import { Breadcrumb, SimpleCard, TButton } from "app/components";

import { useNotistack } from 'app/hooks/useNotistack';
import { useParams } from "react-router-dom";
import OrderShipmentVariationCard from "./component/OrderShipmentVariationCard";

import BinIcon from '@mui/icons-material/Delete';
import { CheckBox } from "@mui/icons-material";

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

const list = [
  {
    id: 1,
    orderNo: 1001,
    items: [
      {
        imageUrl: 'https://cbu01.alicdn.com/img/ibank/O1CN01byzC6x1sHtB3e3QXf_!!2211035925742-0-cib.jpg',
        name: "New Men's Casual Shoes Men's Sneakers Flying Woven Breathable Running Shoes Men's Shoes",
        attributes: [
          { name: 'Color', value: 'Red' },
          { name: 'Size', value: 'M' }
        ],
        quantity: 2,
        limit: 5,
        totalCost: 2000,
        type: 'normal'
      },
      {
        imageUrl: 'https://cbu01.alicdn.com/img/ibank/O1CN01xn0VsT1fAw5VER1qW_!!2216819813967-0-cib.jpg',
        name: "Shoes for Men Casual Slip on Fashion Sneakers Breathable Running Shoes Outdoor Walking Training Tennis Shoes",
        attributes: [
          { name: 'Color', value: 'Blue' },
          { name: 'Size', value: 'L' }
        ],
        quantity: 1,
        limit: 3,
        totalCost: 1500,
        type: 'normal'
      }
    ]
  },
  {
    id: 2,
    orderNo: 1002,
    items: [
      {
        imageUrl: 'https://cbu01.alicdn.com/img/ibank/O1CN01byzC6x1sHtB3e3QXf_!!2211035925742-0-cib.jpg',
        name: "New Men's Casual Shoes Men's Sneakers Flying Woven Breathable Running Shoes Men's Shoes",
        attributes: [
          { name: 'Color', value: 'Green' },
          { name: 'Size', value: 'S' }
        ],
        quantity: 3,
        limit: 10,
        totalCost: 3000,
        type: 'normal'
      }
    ]
  },
  {
    id: 3,
    orderNo: 1003,
    items: [
      {
        imageUrl: 'https://cbu01.alicdn.com/img/ibank/O1CN01xn0VsT1fAw5VER1qW_!!2216819813967-0-cib.jpg',
        name: "Shoes for Men Casual Slip on Fashion Sneakers Breathable Running Shoes Outdoor Walking Training Tennis Shoes",
        attributes: [
          { name: 'Color', value: 'Yellow' },
          { name: 'Size', value: 'XL' }
        ],
        quantity: 1,
        limit: 4,
        totalCost: 2500,
        type: 'normal'
      },
      {
        imageUrl: 'https://cbu01.alicdn.com/img/ibank/O1CN01byzC6x1sHtB3e3QXf_!!2211035925742-0-cib.jpg',
        name: "New Men's Casual Shoes Men's Sneakers Flying Woven Breathable Running Shoes Men's Shoes",
        attributes: [
          { name: 'Color', value: 'Purple' },
          { name: 'Size', value: 'M' }
        ],
        quantity: 2,
        limit: 7,
        totalCost: 1800,
        type: 'normal'
      },
      {
        imageUrl: 'https://cbu01.alicdn.com/img/ibank/O1CN01xn0VsT1fAw5VER1qW_!!2216819813967-0-cib.jpg',
        name: "New Men's Casual Shoes Men's Sneakers Flying Woven Breathable Running Shoes Men's Shoes",
        attributes: [
          { name: 'Color', value: 'Black' },
          { name: 'Size', value: 'L' }
        ],
        quantity: 5,
        limit: 12,
        totalCost: 5000,
        type: 'normal'
      }
    ]
  },
  {
    id: 4,
    orderNo: 1004,
    items: [
      {
        imageUrl: 'https://cbu01.alicdn.com/img/ibank/O1CN01xn0VsT1fAw5VER1qW_!!2216819813967-0-cib.jpg',
        name: "Shoes for Men Casual Slip on Fashion Sneakers Breathable Running Shoes Outdoor Walking Training Tennis Shoes",
        attributes: [
          { name: 'Color', value: 'White' },
          { name: 'Size', value: 'XS' }
        ],
        quantity: 10,
        limit: 15,
        totalCost: 8000,
        type: 'normal'
      }
    ]
  }
];

const TabPanel = ({ children, value, index, ...other }) => {
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            {children}
          </Box>
        )}
      </div>
    );
  }
  
  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

function PurchaseOrderUpsert({ type }) {

    const { id } = useParams()

    const [value, setValue] = useState(0)

    const [orderItemList, setOrderItemList] = useState(list)

    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Purchase Orders", path: "/purchase-orders" }, type && (type==='update'?({ name: "Purchase Order Details", path: id && `/purchase-order/view/${id}` }, { name: "Update" }) : { name: "Create" })]} />
            </Box>

            <Stack alignItems={'center'} justifyContent={'center'} spacing={3}>
                <SimpleCard title={'Purchase Order Details'} sx={{width: '100%'}}>

                </SimpleCard>
                <SimpleCard title={'Item List'} sx={{width: '100%'}}>
                    <Tabs value={value} onChange={(e, val)=>setValue(val)} aria-label="basic tabs example">
                        <Tab label="Order list items" {...a11yProps(0)} />
                        <Tab label="Full item list" {...a11yProps(1)} />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <Stack sx={{height: "max-content", maxHeight: "600px", minHeight: "300px", overflowY: "auto"}}>
                          <TButton title={"Order List"} label={"Order List"} color={"primary"} variant={"contained"} sx={{width: 'max-content'}}></TButton>
                          <br></br>
                          { 
                            orderItemList && orderItemList.length>0 ?
                              orderItemList.map(item => (
                                <Stack>
                                  <Box display={"flex"} alignItems={"center"} justifyContent={"flex-start"} flexWrap={"wrap"} gap={'0.1em'}>
                                    <Checkbox size="small"/>
                                    <Typography variant="body2" sx={{cursor: "pointer"}} onClick={()=>item.id && window.open(`/order/view/${item.id}`, "_blank")}>{`Order No #${item.orderNo && item.orderNo}`}</Typography>                                   
                                  </Box>
                                  <Grid item xs={12}>
                                      {item.items.map((it) => (
                                          <Grid item xs={12}>
                                            <OrderShipmentVariationCard
                                                item={it}
                                            />
                                          </Grid>
                                      ))}
                                  </Grid>
                                  <br></br>
                                </Stack>
                              )) :
                              (
                                <Grid sx={{display: 'flex', width: '100%', height: '40dvh', flexDirection: 'column', gap: '0.8em'}} alignItems={'center'} justifyContent={'center'}>
                                  <Icon sx={{fontSize: '5.5em', color: 'gray', fontWeight: 'small'}}>info_outline</Icon>
                                  <Typography>No order itmes found.</Typography>
                                </Grid>
                              )
                          }
                        </Stack>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Content for Item Two
                    </TabPanel>
                </SimpleCard>
            </Stack>
        </Container>
    );
}

export default PurchaseOrderUpsert;
