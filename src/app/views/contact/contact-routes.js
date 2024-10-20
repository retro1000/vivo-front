import { lazy } from "react";
import Loadable from "app/components/Loadable";

const ContactPage = Loadable(lazy(() => import('../contact/ContactPage.jsx')))
const ContactUsPage = Loadable(lazy(() => import('../contact/ContactUsPage.jsx')))

const contactRoutes = [
  {
    path: "/contact",
    // element: <ContactPage />
    element: <ContactUsPage />
  },
  
];

export default contactRoutes;
