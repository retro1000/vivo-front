import { lazy } from "react";
import Loadable from "app/components/Loadable";
import { authRoles } from "app/auth/authRoles";
import AuthGuard from "app/auth/AuthGuard";


const OrderList = Loadable(lazy(() => import("./OrderList")));
const OrderView = Loadable(lazy(() => import("./OrderView")));

const orderRoutes = [
  { 
    path: "/order/list",
    element: 
      <AuthGuard auth={authRoles.manager}>
        <OrderList />
      </AuthGuard>
  },
  { 
    path: "/order/view/:id",
    element: 
      // <AuthGuard auth={authRoles.manager}>
        <OrderView />
      // </AuthGuard>
  },
];

export default orderRoutes;
