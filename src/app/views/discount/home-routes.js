import { lazy } from "react";
import Loadable from "app/components/Loadable";
import AuthGuard from "app/auth/AuthGuard";
import { authRoles } from "app/auth/authRoles";

const CreateDiscountPage = Loadable(lazy(() => import('../discount/CreateDiscount')))

const discountRoutes = [
  {
    path: "/discounts/create",
    element: 
      <AuthGuard auth={[...authRoles.guest, ...authRoles.user]}>
        <CreateDiscountPage />
      </AuthGuard>
  }
];

export default discountRoutes;
