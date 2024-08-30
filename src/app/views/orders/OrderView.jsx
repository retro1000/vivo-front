import { useState, useEffect } from "react";

import {
  Stack,
  Box,
  styled,
  Typography,
  Select,
  Grid,
  Card,
  CardContent,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

import {
  Breadcrumb,
  TimeLine,
  TButton,
  PopupFormDialog,
} from "app/components";

import { useNotistack } from "app/hooks/useNotistack";
import { useParams } from "react-router-dom";
import { useFormatter } from "app/hooks/useFormatter";
import { useStatus } from "app/hooks/useStatus";
import useAuth from "app/hooks/useAuth";
import { useAxios } from "app/hooks/useAxios";
import { useTemplate } from "app/hooks/useTemplate";

import OrderItem from "./component/OrderItem";
import OrderDataField from "./component/OrderDataField";

import { themeColors } from "app/components/MatxTheme/themeColors";

import {
  Edit,
  Add,
  AccountBalanceWalletOutlined
} from '@mui/icons-material'
import { rest } from "lodash";


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

  const { api } = useAxios()

  const { triggerNotifications, triggerCommonErrors } = useNotistack();

  // const { role } = useAuth()

  const role = 'ADMIN'

  const { formatToLKR, DefaultDateTimeFormat, DefaultWordFormat, PaymentMethod } = useFormatter();

  const { printTemplate, downloadTemplate } = useTemplate()

  const { OrderStatusBlockUpdate, OrderStatusUpdateList } = useStatus();

  const [order, setOrder] = useState({
    id: "12345",
    cod: 4589,
    tax: 0,
    paymentMethod: "COD",
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
  });

  const [customer, setCustomer] = useState({
    customerId: 1,
    firstName: "John Doe",
    lastName: "Doe",
    email: "john.doe@example.com",
  });

  const [items, setItems] = useState([
    {
      id: 1,
      totalCost: 200,
      name: "Shoes for Men Casual Slip on Fashion Sneakers Breathable Running Shoes Outdoor Walking Training Tennis Shoes",
      quantity: 2,
      cost: 50.0,
      attributes: [
        { name: "Product Id", value: "1005005422533" },
        { name: "Variation Id", value: "14846" },
        { name: "Color", value: "Red" },
        { name: "Size", value: "43" },
      ],
      imageUrl: "https://cbu01.alicdn.com/img/ibank/O1CN01byzC6x1sHtB3e3QXf_!!2211035925742-0-cib.jpg",
    },
    {
      id: 2,
      totalCost: 200,
      name: "New Men's Casual Shoes Men's Sneakers Flying Woven Breathable Running Shoes Men's Shoes",
      quantity: 1,
      cost: 50.0,
      attributes: [
        { name: "Product Id", value: "1005005422533" },
        { name: "Variation Id", value: "14846" },
        { name: "Color", value: "Red" },
        { name: "Size", value: "43" },
      ],
      imageUrl: "https://cbu01.alicdn.com/img/ibank/O1CN01xn0VsT1fAw5VER1qW_!!2216819813967-0-cib.jpg",
    },
  ]);


  useEffect(() => {
    const fetchOrderDetails = async () => {
      await api.get(`/order/view/${id}`)
        .then(response => {
          if(response.status===200){
            setOrder(response.data.order)
            setCustomer(response.data.customer)
            setItems(response.data.item)
          }
        })
        .catch(error => {
          triggerCommonErrors(error)
        })
        .finally(() => {

        })
    }

    fetchOrderDetails()
  }, [])

  const [updateQty, setUpdateQty] = useState({});




  const [editDetailsOn, setEditDetailsOn] = useState(false);

  const [newDetails, setnewDetails] = useState({});

  const editDetailsFields = [
    {
      title: 'Billing Details',
      inputs: [
        {
          key: "billing_addrs_free_solo",
          required: true,
          id: "billing_addrs_free_solo",
          name: "billingAddress",
          label: "Billing Address",
          type: "free_solo",
          placeholder: "Edit billing address",
          options: ['123/F, Main Street, Colombo', '12/F, Main Street, Colombo'],
          multi: false,
          value: newDetails.billingAddress || [order.billingAddress],
          setValue: (val) =>
            setnewDetails({ ...newDetails, billingAddress: val }),
        },
        {
          key: "contact_no_free_solo",
          required: true,
          id: "contact_no_free_solo",
          name: "contactNos",
          label: "Contact Numbers",
          type: "free_solo",
          options: ['+94782987345', '+94782987345', '+94782987343'],
          multi: true,
          placeholder: "Enter contact numbers",
          value: newDetails.contactNos || order.contactNos,
          setValue: (val) =>
            setnewDetails({ ...newDetails, contactNos: val }),
          sx: { width: "50%" },
        },
      ]
    },
    {
      title: 'Shipping Details',
      inputs: [
        {
          key: "shipping_addrs_free_solo",
          required: true,
          id: "shipping_addrs_free_solo",
          name: "shippingAddress",
          label: "Shipping Address",
          type: "free_solo",
          placeholder: "Edit shipping address",
          options: ['123/F, Main Street, Colombo', '12/F, Main Street, Colombo'],
          multi: false,
          value: newDetails.shippingAddress || [order.shippingAddress],
          setValue: (val) =>
            setnewDetails({ ...newDetails, shippingAddress: val }),
        },
        {
          key: "district_select",
          id: "district_select",
          name: "district",
          label: "District",
          required: true,
          type: "select",
          value: newDetails.district || order.district,
          sx: {width: "30%"},
          setValue: (val) =>
            setnewDetails({ ...newDetails, district: val }),
          break: true,
          options: [
            { label: "Colombo", value: "Colombo" },
            { label: "Gampaha", value: "Gampaha" },
          ],
        },
        {
          key: "city_select",
          id: "city_select",
          name: "city",
          label: "City",
          required: true,
          type: "select",
          value: newDetails.city || order.city,
          sx: {width: "30%"},
          setValue: (val) =>
            setnewDetails({ ...newDetails, city: val }),
          break: true,
          options: [
            { label: "Colombo-10", value: "Colombo-10" },
            { label: "Gampaha", value: "Gampaha" },
          ],
        },
      ]
    }
  ]


  const [refundOn, setRefundOn] = useState(false);

  const [refund, setRefund] = useState({});

  const refundFields = [
    {
      title: 'Refund Details',
      inputs: [
        {
          key: "ref_amount_num",
          required: true,
          id: "ref_amount_num",
          name: "amount",
          label: "Refund Amount(LKR)",
          type: "number",
          placeholder: "Enter refund amount",
          value: refund.amount || 0,
          min: 0.1,
          max: order.fees+order.delivery+order.itemSubTotal,
          setValue: (val) =>
            setRefund({ ...refund, amount: val }),
        },
        {
          key: "reason_text",
          required: false,
          id: "reason_text",
          name: "refundReason",
          label: "Refund Reason",
          type: "text",
          placeholder: "Enter refund reason",
          value: refund.refundReason || "",
          setValue: (val) =>
            setRefund({ ...refund, refundReason: val }),
          sx: { width: "100%" },
          rows: 3,
          multiline: true
        },
      ]
    }
  ]




  const [addProductOn, setAddProductOn] = useState(false);

  const [newProducts, setNewProducts] = useState({});

  const addProductFields = [
    {
      title: 'Products',
      inputs: [
        {
          key: "billing_addrs_free_solo",
          required: true,
          id: "billing_addrs_free_solo",
          name: "billingAddress",
          label: "Billing Address",
          type: "free_solo",
          placeholder: "Edit billing address",
          options: ['123/F, Main Street, Colombo', '12/F, Main Street, Colombo'],
          multi: false,
          value: newDetails.billingAddress || [order.billingAddress],
          setValue: (val) =>
            setnewDetails({ ...newDetails, billingAddress: val }),
        },
        {
          key: "qty_num",
          required: true,
          id: "qty_num",
          name: "quantity",
          label: "Quantity",
          type: "number",
          placeholder: "Enter quantity",
          value: newDetails.contactNos || order.contactNos,
          setValue: (val) =>
            setnewDetails({ ...newDetails, contactNos: val }),
          sx: { width: "50%" },
        },
      ]
    }
  ]



  const updateOrderDetails = async () => {
    await api.post('/order/details/update', {orderId: order.id, ...newDetails})
      .then(response => {
        if(response.status===200){
          const newList = {...order, ...newDetails}
          setOrder(newList)
          setnewDetails({})
          triggerNotifications({text: 'Order details successfully updated.', variant: 'success'})
        }
      })
      .catch(error => {
        setnewDetails({})
        triggerCommonErrors(error)
      })
      .finally(() => {

      })
  }

  const createRefund = async () => {
    await api.post('/order/refund', {orderId: order.id, ...refund})
      .then(response => {
        if(response.status===200){
          // const newList = {...order, ...newDetails}
          // setOrder(newList)
          setRefund({})
          triggerNotifications({text: 'Refund successfully created.', variant: 'success'})
        }
      })
      .catch(error => {
        setRefund({})
        triggerCommonErrors(error)
      })
      .finally(() => {

      })
  }

  const addNewProducts = async () => {
    await api.post('/order/details/update', {orderId: order.id, ...newDetails})
      .then(response => {
        if(response.status===200){
          // const newList = {...order, ...newDetails}
          // setOrder(newList)
          setNewProducts({})
          triggerNotifications({text: 'New products successfully added.', variant: 'success'})
        }
      })
      .catch(error => {
        setNewProducts({})
        triggerCommonErrors(error)
      })
      .finally(() => {

      })
  }

  const updateOrderStatus = async (event) => {
    await api.post('/order/status/update', {status: event.target.value})
      .then(response => {
        if(response.status===200){
          const newList = {...order, 'status': event.target.target}
          setOrder(newList)
          triggerNotifications({text: 'Order status successfully updated.', variant: 'success'})
        }
      })
      .catch(error => {
        triggerCommonErrors(error)
      })
      .finally(() => {

      })
  }

  const invoiceData = {
    customerName: customer.firstName+customer.lastName,
    billingAddress: order.billingAddress,
    id: order.id,
    date: order.createDate.split('T')[0],
    items: items.map(item => ({...item, attributes: item.attributes.slice(2)})),
    tax: order.tax,
    delivery: order.delivery,
    fees: order.fees,
    itemSubTotal: order.itemSubTotal
  }

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
                  Order No #{order.orderNo || ""} Details
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
                    <Typography variant="h6" mb={1}>General</Typography>
                    <OrderDataField label={"Order id"}>
                      <Typography variant="body2">{order.id || "-"}</Typography>
                    </OrderDataField>
                    <OrderDataField label={"Order number"}>
                      <Typography variant="body2">{order.orderNo || "-"}</Typography>
                    </OrderDataField>
                    <OrderDataField label={"Order status"}>
                      <Typography variant="body2">{order.status?DefaultWordFormat(order.status):"-"}</Typography>
                    </OrderDataField>
                    <OrderDataField label={"Date created"}>
                      <Typography variant="body2">
                        {order.createDate?DefaultDateTimeFormat(new Date(order.createDate)):"-"}
                      </Typography>
                    </OrderDataField>
                    <OrderDataField label={"Created by"}>
                      <Typography variant="body2">{order.createdBy || "-"}</Typography>
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
                    <Typography variant="h6" mb={1}>Billing</Typography>
                    {
                      customer && order && customer.firstName && customer.lastName && order.billingAddress && (
                        <OrderDataField>
                        <Typography variant="body2">
                          {customer.firstName && customer.lastName?customer.firstName + " " + customer.lastName:"-"}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ textWrap: "wrap", width: "160px" }}
                        >
                          {order.billingAddress}
                        </Typography>
                      </OrderDataField>
                      )
                    }
                    <OrderDataField label={"Email address"}>
                      <Typography
                        color={themeColors.red.palette.primary.main}
                        component={order.email?"a":""}
                        href={order.email?`mailto:${order.email}`:""}
                        variant="body2"
                      >
                        {order.email || "-"}
                      </Typography>
                    </OrderDataField>
                    <OrderDataField label={"Contact numbers"}>
                      {order && order.contactNos && order.contactNos.length>0 ? order.contactNos.map((contactNumber, index) => (
                        <Typography
                          key={index}
                          color={"primary"}
                          component="a"
                          href={`tel:${contactNumber}`}
                          variant="body2"
                        >
                          {contactNumber}
                        </Typography>
                      )) : "-"}
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
                    <Typography variant="h6" mb={1}>Shipping</Typography>
                    {
                      customer && order && customer.firstName && customer.lastName && order.shippingAddress && order.city && order.district && (
                        <OrderDataField>
                        <Typography variant="body2">
                          {customer.firstName && customer.lastName?customer.firstName + " " + customer.lastName:"-"}
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
                      )
                    }
                  </Box>
                  
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"flex-start"}
                    alignItems={"flex-start"}
                    minWidth={"250px"}
                    width={"max-content"}
                  >
                    <Typography variant="h6" mb={1}>Payment</Typography>
                    <OrderDataField label={"Payment completed date"}>
                      <Typography variant="body2">
                        {order.paymentDate
                          ? DefaultDateTimeFormat(new Date(order.paymentDate))
                          : "-"}
                      </Typography>
                    </OrderDataField>
                    <OrderDataField label={"Payment method"}>
                      <Typography variant="body2">
                        {order.paymentMethod?PaymentMethod(order.paymentMethod):'-'}
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
                    <Typography variant="h6" mb={1}>Delivery</Typography>
                    <OrderDataField label={"Delivery service"}>
                      <Typography variant="body2">
                        {order.deliveryService ? (
                          <Typography
                            color={themeColors.red.palette.primary.main}
                            component="a"
                            href={`/delivery-service/view/${order.deliveryService}`}
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
                  order && order.status && role && role!=='GUEST' && role!=='USER' && (
                    <>
                      <FormControl
                        margin="normal"
                        sx={{ width: "30%", maxWidth: "300px", minWidth: "200px" }}
                      >
                        <InputLabel>Order Status</InputLabel>
                        <Select
                          name="status"
                          value={order.status}
                          onChange={updateOrderStatus}
                          size="small"
                          label="Order Status"
                        >
                          {
                            OrderStatusUpdateList(order.status, role).map((state, index) => (
                              <MenuItem key={index} value={state}>{DefaultWordFormat(state)}</MenuItem>
                            ))
                          }
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
                    fun={setEditDetailsOn}
                  ></TButton>
                  {
                    role && role!=='GUEST' && role!=='USER' && 
                    <>
                      <TButton
                        title={"Download invoice"}
                        label={"Download invoice"}
                        variant={"outlined"}
                        color={"primary"}
                        fun={() => downloadTemplate(invoiceData, "invoice")}
                        disabled={OrderStatusBlockUpdate(order.status)}
                      ></TButton>
                      <TButton
                        title={"Print invoice"}
                        label={"Print invoice"}
                        variant={"outlined"}
                        color={"primary"}
                        fun={() => printTemplate(invoiceData, "invoice")}
                        disabled={OrderStatusBlockUpdate(order.status)}
                      ></TButton>
                      <TButton
                        title={"Download packaging slip"}
                        label={"Download packaging slip"}
                        variant={"outlined"}
                        color={"primary"}
                        fun={() => downloadTemplate({}, "packaging_slip")}
                      ></TButton>
                      <TButton
                        title={"Print packaging slip"}
                        label={"Print packaging slip"}
                        variant={"outlined"}
                        color={"primary"}
                        fun={() => printTemplate({}, "packaging_slip")}
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
                      fun={setAddProductOn}
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
                      fun={setRefundOn}
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

      <PopupFormDialog
        open={editDetailsOn}
        title="Edit Details"
        submitButton="Submit"
        titleIcon={<Edit />}
        fields={editDetailsFields}
        setOpen={setEditDetailsOn}
        reasonCloseOn={true}
        setValues={setnewDetails}
        submit={updateOrderDetails}
      />

      <PopupFormDialog
        open={addProductOn}
        title="Add Products"
        submitButton="Add"
        titleIcon={<Add />}
        fields={addProductFields}
        setOpen={setAddProductOn}
        reasonCloseOn={true}
        setValues={setNewProducts}
        submit={addNewProducts}
      />

      <PopupFormDialog
        open={refundOn}
        title="Refund"
        submitButton="Refund"
        titleIcon={<AccountBalanceWalletOutlined />}
        fields={refundFields}
        setOpen={setRefundOn}
        reasonCloseOn={true}
        setValues={setRefund}
        submit={createRefund}
      />
    </Container>
  );
}

export default OrderView;
