import { lazy } from "react";
import Loadable from "app/components/Loadable";


const UpserProduct = Loadable(lazy(() => import("./UpserProduct")));
const ProductList = Loadable(lazy(() => import("./ProductList")));


// const Auth0Login = Loadable(lazy(() => import("./login/Auth0Login")));

const productRoutes = [
  { path: "/product/list", element: <ProductList /> },
  { path: "/product/create", element: <UpserProduct /> }
];

export default productRoutes;
