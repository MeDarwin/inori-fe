import { createBrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./layout/ProtectedRoutes";
import Credits from "./pages/Credits";
import Home from "./pages/Home";
import Login from "./pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/credits",
    element: <Credits />,
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
]);
