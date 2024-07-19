import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  InvoicesList,
  loader as invoicesLoader,
} from "./components/invoices/InvoicesList";
import InvoiceCreate from "./components/invoices/InvoiceCreate";

import InvoiceDetails, {
  loader as invoiceData,
} from "./components/invoices/InvoiceDetails";
import InvoiceEdit from "./components/invoices/InvoiceEdit";
import LoginForm from "./pages/login/LoginForm";

import {
  PrivateRoutes,
  loader as userLoader,
} from "./pages/user/PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/",
    element: <PrivateRoutes isAuth={true} />,
    loader: userLoader,
    children: [
      {
        index: true,
        element: <InvoicesList />,
        loader: invoicesLoader,
      },
      {
        path: "invoice/:id",
        element: <InvoiceDetails />,
        loader: invoiceData,
      },
      {
        path: "invoice/create",
        element: <InvoiceCreate />,
      },
      {
        path: "invoice/edit/:id",
        element: <InvoiceEdit />,
        loader: invoiceData,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
