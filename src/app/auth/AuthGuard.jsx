// import { Navigate, useLocation } from "react-router-dom";
// // HOOK
// import useAuth from "app/hooks/useAuth";

// export default function AuthGuard({ children }) {
//   const { isAuthenticated } = useAuth();
//   const { pathname } = useLocation();

//   if (isAuthenticated) return <>{children}</>;

//   return <Navigate replace to="/session/signin" state={{ from: pathname }} />;
// }



import { Navigate, useLocation, Outlet } from "react-router-dom";
import useAuth from "app/hooks/useAuth";

const AuthGuard = ({ auth, children }) => {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();
// console.log(auth)
  if (!auth.includes("GUEST") && (!isAuthenticated || !auth.includes(role))) {
    return <Navigate replace to="/login" state={{ from: location }} />;
  }

  return children;
};


export default AuthGuard;
