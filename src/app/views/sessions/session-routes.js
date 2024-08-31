import { lazy } from "react";
import Loadable from "app/components/Loadable";

const NotFound = Loadable(lazy(() => import("./NotFound")));
const ForgotPassword = Loadable(lazy(() => import("./ForgotPassword")));

// const FirebaseLogin = Loadable(lazy(() => import("./login/FirebaseLogin")));
// const FirebaseRegister = Loadable(lazy(() => import("./register/FirebaseRegister")));

const JwtLogin = Loadable(lazy(() => import("./login/JwtLogin")));
const JwtRegister = Loadable(lazy(() => import("./register/JwtRegister")));
const LoginPage = Loadable(lazy(() => import("./login/LoginPage")));
const SignupPage = Loadable(lazy(() => import("./register/SignupPage")));

// const Auth0Login = Loadable(lazy(() => import("./login/Auth0Login")));

const sessionRoutes = [
  // { path: "/session/signup", element: <JwtRegister /> },
  // { path: "/session/signin", element: <JwtLogin /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/session/forgot-password", element: <ForgotPassword /> },
  { path: "not-found", element: <NotFound /> }
];

export default sessionRoutes;
