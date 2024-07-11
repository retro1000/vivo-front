import { lazy } from "react";
import { Navigate } from "react-router-dom";

import AuthGuard from "./auth/AuthGuard";
import { authRoles } from "./auth/authRoles";

import Loadable from "./components/Loadable";
import MatxLayout from "./components/MatxLayout/MatxLayout";

import sessionRoutes from "./views/sessions/session-routes";
import productRoutes from "./views/product/product-routes";
import materialRoutes from "app/views/material-kit/MaterialRoutes";
import homeRoutes from "app/views/home/home-routes";

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
      ...materialRoutes,
      ...productRoutes,
      // ...homeRoutes,
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
  ...sessionRoutes
];

export default routes;
