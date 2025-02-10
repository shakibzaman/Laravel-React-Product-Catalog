import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RedirectIfAuthenticated({ children }) {
    const { user } = useAuth(); // Get auth state
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate("/home", { replace: true }); // Redirect if user is logged in
        }
    }, [user, navigate]);

    return children;
}
