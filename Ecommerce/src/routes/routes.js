import Dashboard from "../components/admin/Dashboard";
import Profile from "../components/admin/Profile";



const routes = [
  {
    path: "/admin",
    eact:true,
    name:'Admin',
    // element:""   // if you comment thenundefined value will go otherwie give black like element=""
  },
  {
    path: "dashboard",
    eact:true,
    name:'Dashboard',
    element:Dashboard
  },
  {
    path: "profile",
    eact:true,
    name:'Profile',
    element:Profile
  }

];

export default routes;
