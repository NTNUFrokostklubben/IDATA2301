import { Navigate, Outlet } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import {getCookie} from "../../utils/authentication/cookies";
import {getAuthenticatedUser, isAdmin} from "../../utils/authentication/authentication";

const ProtectedRoute = () => {
    const token = getCookie("jwt");

    if (!token) {
        return <Navigate to="/noAccess" />;
    }
    try {
        const decoded = jwtDecode(token);
        const access = isAdmin(getAuthenticatedUser());

        return access ? <Outlet /> : <Navigate to="/noAccess" />;
    } catch (error) {
        return <Navigate to="/noAccess" />;
    }
};

export default ProtectedRoute;