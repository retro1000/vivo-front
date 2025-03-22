import { lazy } from "react";
import { Navigate } from "react-router-dom";

import AuthGuard from "./auth/AuthGuard";
import { authRoles } from "./auth/authRoles";

import Loadable from "./components/Loadable";
import MatxLayout from "./components/MatxLayout/MatxLayout";

import sessionRoutes from "./views/sessions/session-routes";
import productRoutes from "./views/product/product-routes";
import homeRoutes from "app/views/home/home-routes";
import aboutRoutes from "./views/about/about-routes";
import contactRoutes from "./views/contact/contact-routes";
import orderRoutes from "./views/orders/order-routes";
import profileRoutes from "./views/profile/profile-routes";
import billingRoutes from "./views/billing/billing-routes";
import purchaseOrderRoutes from "./views/purchase_order/purchase-order-routes";
import orderTrackingRoutes from "./views/order_track/order-track-routes";
import inquiriesRoutes from "./views/inquiries/inquiries-routes";

// E-CHART PAGE
const AppEchart = Loadable(lazy(() => import("app/views/charts/echarts/AppEchart")));
// DASHBOARD PAGE
const Analytics = Loadable(lazy(() => import("app/views/dashboard/Analytics")));

const routes = [
  {
    element: (
      // <AuthGuard auth={authRoles.user}>
        <MatxLayout />
      // </AuthGuard>
    ),
    children: [
      ...productRoutes,
      ...orderTrackingRoutes,
      ...inquiriesRoutes,
      ...homeRoutes,
      ...aboutRoutes,
      ...contactRoutes,
      ...sessionRoutes,
      ...orderRoutes,
      ...profileRoutes,
      ...billingRoutes,
      ...purchaseOrderRoutes,
      // dashboard route
      {
        path: "/dashboard/default",
        element: 
          <AuthGuard auth={authRoles.manager}>
            <Analytics />
          </AuthGuard>     
      },
      // e-chart route
      {
        path: "/charts/echarts",
        element: <AppEchart />,
        auth: authRoles.editor
      }
    ]
  },

  // session pages route
];

export default routes;
