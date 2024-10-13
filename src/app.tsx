import "./reset.css";
import "./app.scss";
import { RouterProvider } from "react-router-dom";

import router from "./pages/router";

export const App = () => <RouterProvider router={router} />;
