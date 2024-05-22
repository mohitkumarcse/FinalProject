import { Routes, Route } from "react-router-dom";
import publicRouteList from "../../routes/publicroutelist";
import Navbar from "./Navbar";

const FrontendLayout = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {publicRouteList.map((route, index) => (
          <Route key={index} path={`${route.path}`} element={route.element} />
        ))}
      </Routes>
    </>
  );
};

export default FrontendLayout;
