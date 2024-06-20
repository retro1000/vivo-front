import { useRoutes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import { MatxTheme } from "./components";
// ALL CONTEXTS
// import { AuthProvider } from "./contexts/Auth0Context";
import { AuthProvider } from "./contexts/JWTAuthContext";
// import { AuthProvider } from "./contexts/FirebaseAuthContext";
import SettingsProvider from "./contexts/SettingsContext";
// ROUTES
import routes from "./routes";
// FAKE SERVER
// import "../fake-db";

import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PRMeRH2QbTEXrdk32yYITCtMpdg9kPum4oFoZKnTn2oO9NW7xin0xdB3HHhMpCMqutF2dXWpAHBqjCE9EDjRkH100Qnx435JO');

export {stripePromise};

export default function App() {
  const content = useRoutes(routes);

  return (
    <SettingsProvider>
      <AuthProvider>
        <MatxTheme>
          <CssBaseline />
          {content}
        </MatxTheme>
      </AuthProvider>
    </SettingsProvider>
  );
}
