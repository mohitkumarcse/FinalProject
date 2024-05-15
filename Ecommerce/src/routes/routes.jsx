import React from "react";
import Dashboard from "../components/admin/Dashboard";
import Profile from "../components/admin/Profile";
import AddCategory from "../components/admin/category/AddCategory";
import ViewCategory from "../components/admin/category/ViewCategory";
import EditCategory from "../components/admin/category/EditCategory";

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
    path: "/edit-category:id",
    element: <EditCategory />,
  },
];

export default routes;
