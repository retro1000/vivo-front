import { useState } from "react";

import { Stack, Box, styled, Tabs, Tab, Typography, Select, Button, Grid, IconButton, Icon, Slide, Card, CardContent, TextField, TableContainer, Table, TableRow, TableCell, Avatar, TableBody, TableHead, MenuItem, InputLabel, FormControl, Pagination  } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import { Breadcrumb, SimpleCard, MuiTable, FilterTable, SearchableSelectMultiple, NumSliderFilter, TimeLine, QuantitySelector, TButton} from "app/components";

import { useNotistack } from 'app/hooks/useNotistack';
import { useParams } from "react-router-dom";
import { useFormatter } from "app/hooks/useFormatter";
import { filter } from "lodash";

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

function OrderView() {

  const { id } = useParams()

  const { formatToLKR } = useFormatter()

  const [order, setOrder] = useState({
    id: '12345',
    address: '123 Main St, Springfield',
    contact: '555-1234',
    status: 'Processing',
    totalAmount: 150.0,
  });

  const [customer, setCustomer] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
  });

  const [items, setItems] = useState([
    { id: 1, totalCost: 200, name: 'Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 ', quantity: 2, cost: 50.0, attributes: [{name: 'Color', value: 'Red'}, {name: 'Size', value: '43'}], imageUrl: '/path/to/image1.jpg' },
    { id: 2, totalCost: 200, name: 'Item 2', quantity: 1, cost: 50.0, attributes: [{name: 'Color', value: 'Red'}, {name: 'Size', value: '43'}], imageUrl: '/path/to/image2.jpg' },
  ]);

  const [updateQty, setUpdateQty] = useState({})

  const options = {
    serverSide: true,
    pagination: false,
    selectableRows: false,
    download: false,
    search: false,
    viewColumns: false,
    print: false,
    filter: false,
    sort: false
  }

  const columns = [
    {
      name: 'id',
      label: 'id',
      options: {display: 'exclude'}
    },
    {
      name: 'Item',
      label: 'Item',
      options: {
        customBodyRender: (value) => (
          <Box display={'flex'} gap={'1em'} justifyContent={'space-between'} alignItems={'flex-start'}>
            <Avatar src={value.imageUrl} alt={value.name} />
            <Box flex={1} display={'flex'} flexDirection={'column'} gap={'0.4em'} justifyContent={'flex-start'} alignItems={'space-between'}>
              <Typography>{value.name}</Typography>
              {
                value.attributes.map((attribute, index) => (
                  <Typography key={index}>{attribute.name}:     {attribute.value}</Typography>
                ))
              }
            </Box>
          </Box>
        )
      }
    },
    {
      name: 'Cost',
      label: 'Cost'
    },
    {
      name: 'Quantity',
      label: 'Quantity',
      options: {
        customBodyRender: (value, tableMeta) => (
          <Box>
            <QuantitySelector 
              count={value.quantity} 
              setCount={
                (val) => {
                  const newList = [...items]
                  const newQty = updateQty
                  items[tableMeta.rowIndex].quantity = val

                  setItems(newList)

                }
              }
              limit={value.limit}
            />
          </Box>
        )
      }
    },
    {
      name: 'Total Cost',
      label: 'Total Cost'
    }
  ]

  const data = items && items.length>0 ? items.map(item => [
    item.id,
    { imageUrl: item.imageUrl, name: item.name, attributes: item.attributes },
    item.cost,
    { quantity: item.quantity, limit: item.limit || 0 },
    item.totalCost
  ]) : [];

  console.log(data)


  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleStatusChange = (event) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      status: event.target.value,
    }));
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Orders", path: "/order/list" }, { name: "view" }]} />
      </Box>
      <br></br>
      <Stack alignItems={'center'} justifyContent={'center'} spacing={3}>
          <Grid container spacing={3}>
          {/* Customer Details */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Customer Details</Typography>
                <Typography variant="body1">Name: {customer.name}</Typography>
                <Typography variant="body1">Email: {customer.email}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Order Details */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6">Order Details</Typography>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={order.address}
                  onChange={handleInputChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Contact Number"
                  name="contact"
                  value={order.contact}
                  onChange={handleInputChange}
                  margin="normal"
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Order Status</InputLabel>
                  <Select
                    name="status"
                    value={order.status}
                    onChange={handleStatusChange}
                    size="small"
                    label="Order Status"
                  >
                    <MenuItem value="Processing">Processing</MenuItem>
                    <MenuItem value="Shipped">Shipped</MenuItem>
                    <MenuItem value="Delivered">Delivered</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                  </Select>
                </FormControl>
                <Typography variant="h6" style={{ marginTop: '16px' }}>
                  Total Amount: ${order.totalAmount.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Ordered Items */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Ordered Items</Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell>Cost</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Total Cost</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Box display={'flex'} gap={'1em'} justifyContent={'space-between'} alignItems={'flex-start'}>
                              <Avatar src={item.imageUrl} alt={item.name} />
                              <Box flex={1} display={'flex'} flexDirection={'column'} gap={'0.4em'} justifyContent={'flex-start'} alignItems={'space-between'}>
                                <Typography>{item.name}</Typography>
                                {
                                  item.attributes.map((attribute, index) => (
                                    <Typography key={index}>{attribute.name}:     {attribute.value}</Typography>
                                  ))
                                }
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>{formatToLKR(item.cost)}</TableCell>
                          <TableCell>{<QuantitySelector count={item.quantity}/>}</TableCell>
                          <TableCell>{formatToLKR((item.cost*item.quantity))}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <br></br>
                <Box display={'flex'} gap={'0.4em'} flexWrap={'wrap'}>
                  <TButton title={'Add product(s)'} label={'Add product(s)'} variant={'outlined'} color={'primary'}></TButton>
                  <TButton title={'Apply Cupon'} label={'Apply Cupon'} variant={'outlined'} color={'primary'}></TButton>
                  <TButton title={'Refund'} label={'Refund'} variant={'outlined'} color={'primary'}></TButton>
                </Box>
              </CardContent>
              <MuiTable newOptions={options} columns={columns} dataTableData={data} />
            </Card>
          </Grid>

          {/* Save Button */}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={() => console.log('Order saved!')}>
              Save Changes
            </Button>
          </Grid>
        </Grid>
          <TimeLine path={`/order/view/get-time-lines/${id}`} />
      </Stack>
      <br></br>
    </Container>
  )  
}

export default OrderView;
