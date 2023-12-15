import { createBrowserRouter, defer } from "react-router-dom";
import BaseLayout from "./layout/BaseLayout";
import ProtectedRoutes from "./layout/ProtectedRoutes";
import Credits from "./pages/Credits";
import Home from "./pages/Dashboard";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Magazine from "./pages/magazine/Magazine";
import { magazineApi } from "./reducer/services/magazineApi";
import { store } from "./store";
import { recordVisit } from "./utils/recordVisit";

export const router = createBrowserRouter([
  /* -------------------------------- NO LAYOUT ------------------------------- */
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
  /* ------------------------- ACCESSIBLE FOR EVERYONE WITH LAYOUT ------------------------ */
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

          const magazineReq = store.dispatch(magazineApi.endpoints.getMagazine.initiate());
          const magazine = magazineReq.unwrap();
          magazine.catch((err) => {
            console.log(err);
            throw new Response("test", { status: 500 });
          });
          magazineReq.unsubscribe();

          return defer({
            magazine,
          });
        },
      },
    ],
  },
  // ONLY FOR AUTHORED USERS
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
