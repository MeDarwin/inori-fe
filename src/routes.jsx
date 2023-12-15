import { createBrowserRouter } from "react-router-dom";
import BaseLayout from "./layout/BaseLayout";
import ProtectedRoutes from "./layout/ProtectedRoutes";
import Credits from "./pages/Credits";
import Home from "./pages/Dashboard";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Magazine from "./pages/magazine/Magazine";
import { recordVisit } from "./utils/recordVisit";

export const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <Index />,
        loader: async ({ request }) => {
          const url = new URL(request.url);
          recordVisit(url.pathname, "Home");
          return null;
        },
      },
      {
        path: "/magazine",
        element: <Magazine />,
        loader: async ({ request }) => {
          const url = new URL(request.url);
          recordVisit(url.pathname, "Magazine");
          return null;
        },
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    loader: async ({ request }) => {
      const url = new URL(request.url);
      recordVisit(url.pathname, "Login");
      return null;
    },
  },
  {
    path: "/credits",
    element: <Credits />,
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/dashboard",
        element: <Home />,
        loader: async ({ request }) => {
          const url = new URL(request.url);
          recordVisit(url.pathname, "Dashboard");
          return null;
        },
      },
    ],
  },
]);
