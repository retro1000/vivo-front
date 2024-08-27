import { useState } from "react";

import {
  Stack,
  Box,
  styled,
  Tabs,
  Tab,
  Typography,
  Select,
  Button,
  Grid,
  IconButton,
  Icon,
  Slide,
  Card,
  CardContent,
  TextField,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  Avatar,
  TableBody,
  TableHead,
  MenuItem,
  InputLabel,
  FormControl,
  Pagination,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import {
  Breadcrumb,
  SimpleCard,
  FilterTable,
  SearchableSelectMultiple,
  TimeLine,
  QuantitySelector,
  TButton,
} from "app/components";

import { useNotistack } from "app/hooks/useNotistack";
import { useParams } from "react-router-dom";
import { useFormatter } from "app/hooks/useFormatter";
import { useStatus } from "app/hooks/useStatus";
import OrderItem from "./component/OrderItem";
import OrderDataField from "./component/OrderDataField";
import { themeColors } from "app/components/MatxTheme/themeColors";
import useAuth from "app/hooks/useAuth";

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

function OrderView() {
  const { id } = useParams();

  // const { role } = useAuth()

  const role = 'ADMIN'

  const { formatToLKR, DefaultDateTimeFormat, DefaultWordFormat } = useFormatter();

  const { OrderStatusBlockUpdate } = useStatus();

  const [order, setOrder] = useState({
    id: "12345",
    cod: 4589,
    paymentMethod: "Cash on Delivery",
    waybill: "72673738",
    deliveryService: "Koombiyo Delivery",
    createdBy: "damitha",
    contactNos: [
      "+94720985307",
      "+94705274871",
      "+94720985307",
      "+94720985307",
      "+94720985307",
    ],
    email: "damitha@gmail.com",
    createDate: "2024-01-02T09:24:00",
    billingAddress: "123/A Main Steet, Colombo, New Springfield, Sri Lanka",
    shippingAddress: "123 Main St, Springfield",
    district: "Colombo",
    city: "Colombo-10",
    orderNo: "2333",
    contact: "555-1234",
    status: "NEED_TO_IMPORT",
    fees: 345,
    delivery: 400,
    itemSubTotal: 4578,
    // status: 'SHIPPED',
    totalAmount: 150.0,
  });

  const [customer, setCustomer] = useState({
    firstName: "John Doe",
    lastName: "Doe",
    email: "john.doe@example.com",
  });

  const [items, setItems] = useState([
    {
      id: 1,
      totalCost: 200,
      name: "Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 ",
      quantity: 2,
      cost: 50.0,
      attributes: [
        { name: "Product Id", value: "1005005422533" },
        { name: "Variation Id", value: "14846" },
        { name: "Color", value: "Red" },
        { name: "Size", value: "43" },
      ],
      imageUrl: "/assets/images/microphone.jpg",
    },
    {
      id: 2,
      totalCost: 200,
      name: "Item 2",
      quantity: 1,
      cost: 50.0,
      attributes: [
        { name: "Product Id", value: "1005005422533" },
        { name: "Variation Id", value: "14846" },
        { name: "Color", value: "Red" },
        { name: "Size", value: "43" },
      ],
      imageUrl: "/assets/images/microphone.jpg",
    },
  ]);

  const [updateQty, setUpdateQty] = useState({});

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
        <Breadcrumb
          routeSegments={[
            { name: "Orders", path: "/order/list" },
            { name: "view" },
          ]}
        />
      </Box>
      <Stack alignItems={"center"} justifyContent={"center"} spacing={1}>
        <Grid container display={"flex"} gap={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  Order No #{order.orderNo} Details
                </Typography>
                <br></br>
                <Grid display={"flex"} flexWrap={"wrap"} gap={5}>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"flex-start"}
                    alignItems={"flex-start"}
                    minWidth={"250px"}
                    width={"max-content"}
                  >
                    <Typography variant="h6">Billing</Typography>
                    <br></br>
                    <OrderDataField>
                      <Typography variant="body2">
                        {customer.firstName + " " + customer.lastName}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ textWrap: "wrap", width: "160px" }}
                      >
                        {order.billingAddress}
                      </Typography>
                    </OrderDataField>
                    <OrderDataField label={"Email address"}>
                      <Typography
                        color={themeColors.red.palette.primary.main}
                        component="a"
                        href={`mailto:${order.email}`}
                        variant="body2"
                      >
                        {order.email}
                      </Typography>
                    </OrderDataField>
                    <OrderDataField label={"Contact numbers"}>
                      {order.contactNos.map((contactNumber, index) => (
                        <Typography
                          key={index}
                          color={"primary"}
                          component="a"
                          href={`tel:${contactNumber}`}
                          variant="body2"
                        >
                          {contactNumber}
                        </Typography>
                      ))}
                    </OrderDataField>
                  </Box>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"flex-start"}
                    alignItems={"flex-start"}
                    minWidth={"250px"}
                    width={"max-content"}
                  >
                    <Typography variant="h6">Shipping</Typography>
                    <br></br>
                    <OrderDataField>
                      <Typography variant="body2">
                        {customer.firstName + " " + customer.lastName}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ textWrap: "wrap", width: "160px" }}
                      >
                        {order.shippingAddress}
                      </Typography>
                      <Typography variant="body2">{order.city}</Typography>
                      <Typography variant="body2">{order.district}</Typography>
                    </OrderDataField>
                  </Box>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"flex-start"}
                    alignItems={"flex-start"}
                    minWidth={"250px"}
                    width={"max-content"}
                  >
                    <Typography variant="h6">General</Typography>
                    <br></br>
                    <OrderDataField label={"Order id"}>
                      <Typography variant="body2">{order.id}</Typography>
                    </OrderDataField>
                    <OrderDataField label={"Order number"}>
                      <Typography variant="body2">{order.orderNo}</Typography>
                    </OrderDataField>
                    <OrderDataField label={"Order status"}>
                      <Typography variant="body2">{DefaultWordFormat(order.status)}</Typography>
                    </OrderDataField>
                    <OrderDataField label={"Date created"}>
                      <Typography variant="body2">
                        {DefaultDateTimeFormat(new Date(order.createDate))}
                      </Typography>
                    </OrderDataField>
                    <OrderDataField label={"Created by"}>
                      <Typography variant="body2">{order.createdBy}</Typography>
                    </OrderDataField>
                    <OrderDataField label={"Order completed date"}>
                      <Typography variant="body2">
                        {order.orderCompleteDate
                          ? DefaultDateTimeFormat(
                              new Date(order.orderCompleteDate)
                            )
                          : "-"}
                      </Typography>
                    </OrderDataField>
                  </Box>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"flex-start"}
                    alignItems={"flex-start"}
                    minWidth={"250px"}
                    width={"max-content"}
                  >
                    <Typography variant="h6">Payment</Typography>
                    <br></br>
                    <OrderDataField label={"Payment completed date"}>
                      <Typography variant="body2">
                        {order.paymentDate
                          ? DefaultDateTimeFormat(new Date(order.paymentDate))
                          : "-"}
                      </Typography>
                    </OrderDataField>
                    <OrderDataField label={"Payment method"}>
                      <Typography variant="body2">
                        {order.paymentMethod}
                      </Typography>
                    </OrderDataField>
                  </Box>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"flex-start"}
                    alignItems={"flex-start"}
                    minWidth={"250px"}
                    width={"max-content"}
                  >
                    <Typography variant="h6">Delivery</Typography>
                    <br></br>
                    <OrderDataField label={"Delivery service"}>
                      <Typography variant="body2">
                        {order.deliveryService ? (
                          <Typography
                            color={themeColors.red.palette.primary.main}
                            component="a"
                            href={`/deliveryService/view/${order.deliveryService}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="body2"
                          >
                            {order.deliveryService}
                          </Typography>
                        ) : (
                          "-"
                        )}
                      </Typography>
                    </OrderDataField>
                    <OrderDataField label={"Waybill"}>
                      <Typography variant="body2">
                        {order.waybill ? order.waybill : "-"}
                      </Typography>
                    </OrderDataField>
                    <OrderDataField label={"COD amount"}>
                      <Typography variant="body2">
                        {order.cod ? formatToLKR(order.cod) : "-"}
                      </Typography>
                    </OrderDataField>
                  </Box>
                </Grid>
                <br></br>
                <br></br>
                {
                  role && role!=='GUEST' && role!=='USER' && (
                    <>
                      <FormControl
                        margin="normal"
                        sx={{ width: "30%", maxWidth: "300px", minWidth: "200px" }}
                      >
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
                      <br></br>
                      <br></br>
                    </>
                )
                }
                <Box display={"flex"} gap={"0.4em"} flexWrap={"wrap"}>
                  <TButton
                    title={"Edit details"}
                    label={"Edit details"}
                    variant={"outlined"}
                    color={"primary"}
                    disabled={OrderStatusBlockUpdate(order.status)}
                  ></TButton>
                  {
                    role && role!=='GUEST' && role!=='USER' && 
                    <>
                      <TButton
                        title={"Download invoice"}
                        label={"Download invoice"}
                        variant={"outlined"}
                        color={"primary"}
                        disabled={OrderStatusBlockUpdate(order.status)}
                      ></TButton>
                      <TButton
                        title={"Print invoice"}
                        label={"Print invoice"}
                        variant={"outlined"}
                        color={"primary"}
                        disabled={OrderStatusBlockUpdate(order.status)}
                      ></TButton>
                      <TButton
                        title={"Download package slip"}
                        label={"Download package slip"}
                        variant={"outlined"}
                        color={"primary"}
                      ></TButton>
                      <TButton
                        title={"Print package slip"}
                        label={"Print package slip"}
                        variant={"outlined"}
                        color={"primary"}
                      ></TButton>
                    </>
                  }
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Ordered Items */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Ordered Items</Typography>
                <br></br>
                <Grid item xs={12}>
                  {items.map((it) => (
                    <Grid item xs={12}>
                      <OrderItem
                        item={it}
                        blockUpdate={OrderStatusBlockUpdate(order.status)}
                      />
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <OrderItem
                      item={{
                        name: "Handling fee",
                        type: "handle",
                        totalCost: order.fees,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <OrderItem
                      item={{
                        name: "Deliver fee",
                        type: "deliver",
                        totalCost: order.delivery,
                      }}
                    />
                  </Grid>
                </Grid>
                <br></br>
                <Box
                  pr={3}
                  gap={4}
                  width={"100%"}
                  display={"flex"}
                  flexDirection={"row"}
                  alignItems={"flex-end"}
                  justifyContent={"flex-end"}
                >
                  <Box
                    display={"flex"}
                    alignItems={"flex-end"}
                    flexDirection={"column"}
                    gap={2}
                  >
                    <Typography variant="body1">{`Items Subtotal :`}</Typography>
                    <Typography variant="body1">{`Fees :`}</Typography>
                    <Typography variant="body1">{`Shipping :`}</Typography>
                    <Typography variant="body1">{`Order Total :`}</Typography>
                  </Box>
                  <Box
                    display={"flex"}
                    alignItems={"flex-end"}
                    flexDirection={"column"}
                    gap={2}
                  >
                    <Typography variant="body1">{`${formatToLKR(
                      order.itemSubTotal
                    )}`}</Typography>
                    <Typography variant="body1">{`${formatToLKR(
                      order.fees
                    )}`}</Typography>
                    <Typography variant="body1">{`${formatToLKR(
                      order.delivery
                    )}`}</Typography>
                    <Typography variant="body1">{`${formatToLKR(
                      order.itemSubTotal + order.fees + order.delivery
                    )}`}</Typography>
                  </Box>
                </Box>
                <br></br>
                <Box display={"flex"} gap={"0.4em"} flexWrap={"wrap"}>
                  {
                    role && role!=='GUEST' && role!=='USER' && 
                    <TButton
                      title={"Add product(s)"}
                      label={"Add product(s)"}
                      variant={"outlined"}
                      color={"primary"}
                      disabled={OrderStatusBlockUpdate(order.status)}
                    ></TButton>
                  }
                  <TButton
                    title={"Apply cupon"}
                    label={"Apply cupon"}
                    variant={"outlined"}
                    color={"primary"}
                    disabled={OrderStatusBlockUpdate(order.status)}
                  ></TButton>
                  {
                    role && role!=='GUEST' && role!=='USER' &&
                    <TButton
                      title={"Refund"}
                      label={"Refund"}
                      variant={"outlined"}
                      color={"primary"}
                    ></TButton>
                  }
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={8} mb={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Order Notes</Typography>
                <br></br>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={8} mb={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Customer History</Typography>
                <br></br>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h5">Order Timeline</Typography>
        <br></br>
        <TimeLine path={`/order/view/get-time-lines/${id}`} />
      </Stack>
      <br></br>
    </Container>
  );
}

export default OrderView;
