import About from "../components/frontend/About";
import Contact from "../components/frontend/Contact";
import Home from "../components/frontend/Home";
import ViewCategory from "../components/frontend/collection/ViewCategory";
import ViewProduct from "../components/frontend/collection/ViewProduct";
import ProductDetails from "../components/frontend/collection/ProductDetails";

const publicRouteList = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/collection",
    element: <ViewCategory />,
  },
  {
    path: "/collection/:slug",
    element: <ViewProduct />,
  },
  {
    path: "/collection/:category/:product",
    element: <ProductDetails />,
  },
];

export default publicRouteList;
