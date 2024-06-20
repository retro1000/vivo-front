import { lazy } from "react";
import Loadable from "app/components/Loadable";
import { authRoles } from "app/auth/authRoles";
import AuthGuard from "app/auth/AuthGuard";


const Checkout = Loadable(lazy(() => import("./Chechout")));

const checkoutRoutes = [
  { 
    path: "/checkout",
    element: 
      <AuthGuard auth={authRoles.user}>
        <Checkout />
      </AuthGuard>
  }
];

export default checkoutRoutes;
