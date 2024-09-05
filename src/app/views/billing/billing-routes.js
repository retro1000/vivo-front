import { lazy } from "react";
import Loadable from "app/components/Loadable";
import AuthGuard from "app/auth/AuthGuard";
import { authRoles } from "app/auth/authRoles";


const Checkout = Loadable(lazy(() => import('../billing/Checkout')))
const WishlistPage = Loadable(lazy(() => import('../billing/WishlistPage')))
const Cart = Loadable(lazy(() => import('../billing/CartPage')))




const billingRoutes = [
  {
    path: "/cart/:id",
    element: 
      <AuthGuard auth={authRoles.user}>
        <Cart />
      </AuthGuard>
  },
  {
    path: "/checkout",
    element: 
      <AuthGuard auth={authRoles.user}>
        <Checkout />
      </AuthGuard>
  },
  {
    path: "/wishlist/:id",
    element: 
      <AuthGuard auth={authRoles.user}>
        <WishlistPage />
      </AuthGuard>
  },
];

export default billingRoutes;
