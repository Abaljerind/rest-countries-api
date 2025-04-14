import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import { getAllCountries } from "../apis/loaders";
import Layout from "../components/Layout";
import _alpha3Code from "../components/_alpha3Code";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home />, loader: getAllCountries },
      {
        path: "/detail/:alpha3Code",
        element: <_alpha3Code />,
        loader: getAllCountries,
      },
    ],
  },
]);
