import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { router } from "./routes";
import { store } from "./store";
import './style/style.css';
import { registerCharts } from "./utils/registerChart";

registerCharts();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
