import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext"; // Import Auth Context

export default function Navbar() {
    const { logout } = useAuth();

    return (
        <nav style={styles.navbar}>
            <h2 style={styles.logo}>Product Catalog</h2>
            <ul style={styles.navLinks}>
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/user-list">User List</Link>
                </li>
                <li>
                    <Link to="/product-list">Product List</Link>
                </li>
                <li>
                    <button onClick={logout} style={styles.logoutButton}>
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
}

const styles = {
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#333",
        color: "#fff",
    },
    logo: { margin: 0 },
    navLinks: { display: "flex", gap: "15px", listStyle: "none" },
};
