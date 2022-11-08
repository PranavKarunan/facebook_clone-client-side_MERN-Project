import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Login from "./pages/login";

const LoggedIn = () => {
    const {user} = useSelector((state) =>({ ...state }));
    
    return user ? <Outlet /> : <Login />
}


const NotLoggedIn = () => {
    const {user} =useSelector((state) =>({ ...state }));
  
    
    return user ? <Navigate to = "/"/> : <Outlet />
}


export { LoggedIn ,NotLoggedIn }