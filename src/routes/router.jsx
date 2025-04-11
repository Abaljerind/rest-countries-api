import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import { getAllCountries } from "../apis/loaders";
import Layout from "../components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ path: "/", element: <Home />, loader: getAllCountries }],
  },
]);
