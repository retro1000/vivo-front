import { lazy } from "react";
import Loadable from "app/components/Loadable";
import { authRoles } from "app/auth/authRoles";
import AuthGuard from "app/auth/AuthGuard";


const UpserProduct = Loadable(lazy(() => import("./UpserProduct")));
const ProductList = Loadable(lazy(() => import("./ProductList")));
const ProductView = Loadable(lazy(() => import("./ProductView")));


const productRoutes = [
  { 
    path: "/product/list",
    element: 
      <AuthGuard auth={authRoles.manager}>
        <ProductList />
      </AuthGuard>
  },
  { 
    path: "/product/create",
    element: 
      <AuthGuard auth={authRoles.manager}>
        <UpserProduct />
      </AuthGuard>
  },
  { 
    path: "/product/view/:id",
    element: 
      // <AuthGuard auth={authRoles.manager}>
        <ProductView />
      // </AuthGuard>
  }
];

export default productRoutes;
