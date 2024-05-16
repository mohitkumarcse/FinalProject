import React from "react";
import Dashboard from "../components/admin/Dashboard";
import Profile from "../components/admin/Profile";
import AddCategory from "../components/admin/category/AddCategory";
import ViewCategory from "../components/admin/category/ViewCategory";
import EditCategory from "../components/admin/category/EditCategory";
import ViewProduct from "../components/admin/product/ViewProduct";
import AddProduct from "../components/admin/product/AddProduct";

const routes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/add-category",
    element: <AddCategory />,
  },
  {
    path: "/view-category",
    element: <ViewCategory />,
  },
  {
    path: "/edit-category/:id",
    element: <EditCategory />,
  },
  {
    path: "/add-product",
    element: <AddProduct />,
  },
  {
    path: "/view-product",
    element: <ViewProduct />,
  },
];

export default routes;
