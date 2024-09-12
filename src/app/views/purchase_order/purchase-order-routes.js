import { lazy } from "react";
import Loadable from "app/components/Loadable";
import { authRoles } from "app/auth/authRoles";
import AuthGuard from "app/auth/AuthGuard";


const PurchaseOrderView = Loadable(lazy(() => import("./PurchaseOrderView")));
const PurchaseOrderList = Loadable(lazy(() => import("./PurchaseOrderList")));
const PurchaseOrderUpsert = Loadable(lazy(() => import("./PurchaseOrderUpsert")));


const purchaseOrderRoutes = [
  { 
    path: "/purchase-order/view/:id",
    element: 
      <AuthGuard auth={authRoles.manager}>
        <PurchaseOrderView />
      </AuthGuard>
  },
  { 
    path: "/purchase-order/update/:id",
    element: 
      <AuthGuard auth={authRoles.manager}>
        <PurchaseOrderUpsert  type={"update"}/>
      </AuthGuard>
  },
  { 
    path: "/purchase-order/create",
    element: 
    //   <AuthGuard auth={authRoles.manager}>
        <PurchaseOrderUpsert type={"create"}/>
    //   </AuthGuard>
  },
  { 
    path: "/purchase-orders",
    element: 
      <AuthGuard auth={authRoles.manager}>
        <PurchaseOrderList />
      </AuthGuard>
  }
];

export default purchaseOrderRoutes;
