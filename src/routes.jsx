import { createBrowserRouter, defer } from "react-router-dom";
import BaseLayout from "./layout/BaseLayout";
import ProtectedRoutes from "./layout/ProtectedRoutes";
import Credits from "./pages/Credits";
import Home from "./pages/Dashboard";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Category from "./pages/category/Category";
import MagazineDetail from "./pages/magazine/Detail";
import Magazine from "./pages/magazine/Magazine";
import Profile from "./pages/profile/Profile";
import { categoryApi } from "./reducer/services/categoryApi";
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
          magazineReq.unsubscribe();

          return defer({
            magazine,
          });
        },
      },
      {
        path: "/magazine/:id",
        element: <MagazineDetail />,
        loader: async ({ request, params }) => {
          const url = new URL(request.url);
          const { id } = params;
          recordVisit(url.pathname, "Magazine");

          const magazineDetailReq = store.dispatch(magazineApi.endpoints.getMagazineById.initiate(id));
          const magazineDetail = magazineDetailReq.unwrap();
          magazineDetailReq.unsubscribe();

          return defer({
            magazineDetail,
          });
        },
      },
      {
        path: "/category",
        element: <Category />,
        loader: async ({ request }) => {
          const url = new URL(request.url);
          recordVisit(url.pathname, "Category");

          const categoryReq = store.dispatch(categoryApi.endpoints.getCategories.initiate());
          const category = categoryReq.unwrap();
          categoryReq.unsubscribe();

          return defer({
            category,
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
      {
        path: "/profile",
        element: <Profile />,
        loader: async ({ request }) => {
          const url = new URL(request.url);
          recordVisit(url.pathname, "Profile");
          return null;
        },
      },
    ],
  },
]);
