// src/components/Router/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { UseAuthContext } from "../../context/AuthProvider";
import toast from "react-hot-toast";
import Loader from "../Loader";

const ProtectedRoute = ({ children }) => {
    const { isAuth, user } = UseAuthContext();
    const location = useLocation();

    if (!isAuth) {
        return <Navigate to="/signup" replace state={{ from: location }} />;
    }

    return children;
};

export default ProtectedRoute;
