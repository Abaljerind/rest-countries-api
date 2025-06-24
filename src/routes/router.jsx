import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import { getAllCountries } from "../apis/loaders";
import Layout from "../components/Layout";
import _alpha3Code from "../components/_alpha3Code";
import ErrorPage from "../components/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home />, loader: getAllCountries },
      {
        path: "/detail/:cca3",
        element: <_alpha3Code />,
        loader: getAllCountries,
      },
    ],
  },
]);
