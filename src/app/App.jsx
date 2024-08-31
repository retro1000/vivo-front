import { useRoutes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import { MatxTheme } from "./components";
import { AuthProvider } from "./contexts/JWTAuthContext";
import SettingsProvider from "./contexts/SettingsContext";
import routes from "./routes";


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
