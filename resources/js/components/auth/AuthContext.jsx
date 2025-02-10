import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { publicRoutePaths } from "../../routes"; // Import public route paths

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const navigate = useNavigate();
    const location = useLocation();

    const login = (token) => {
        localStorage.setItem("token", token);
        setToken(token);
        navigate("/home"); // Redirect to home on login
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/login"); // Redirect to login page
    };

    useEffect(() => {
        // ✅ Fix: Check if the user is trying to access a protected route
        if (
            !token &&
            !publicRoutePaths.some((path) => location.pathname.startsWith(path))
        ) {
            navigate("/login");
        }
    }, [token, location.pathname, navigate]);

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// ✅ Named Export (Ensures Compatibility)
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

// ✅ Default Export (Ensures Consistency)
export default AuthContext;
