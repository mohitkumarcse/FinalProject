import "../../assets/admin/css/styles.css";
import "../../assets/admin/js/scripts";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Routes, Route, Navigate } from "react-router-dom";
import routes from "../../routes/routes";

const AdminLayout = () => {
  console.log(routes);
  return (
    <div className="sb-nav-fixed">
      <Navbar />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidebar />
        </div>

        <div id="layoutSidenav_content">
          <main>
            <Routes>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={`${route.path}`}
                  element={route.element}
                />
              ))}
            </Routes>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
