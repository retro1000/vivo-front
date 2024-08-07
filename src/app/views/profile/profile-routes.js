import { lazy } from "react";
import Loadable from "app/components/Loadable";
import AuthGuard from "app/auth/AuthGuard";
import { authRoles } from "app/auth/authRoles";


const AccountDetail = Loadable(lazy(() => import("./ProfilePage")));

const profileRoutes = [
  {
    path: "/Profile/:id",
    element: 
      <AuthGuard auth={authRoles.user}>
        <AccountDetail />
      </AuthGuard>
  },
];

export default profileRoutes;
