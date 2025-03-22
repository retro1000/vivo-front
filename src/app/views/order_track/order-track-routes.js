import { lazy } from "react";
import Loadable from "app/components/Loadable";


const OrderTrackingPage = Loadable(lazy(() => import('../order_track/OrderTrackingPage.jsx')))


const orderTrackingRoutes = [
  {
    path: "/track-order",
    element: <OrderTrackingPage />
  }
  
];

export default orderTrackingRoutes;
