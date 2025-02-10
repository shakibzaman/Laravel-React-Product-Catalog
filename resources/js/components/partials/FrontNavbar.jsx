import React from "react";
import { Link } from "react-router-dom";

export default function FrontNavbar() {
    return (
        <nav style={styles.navbar}>
            <h2 style={styles.logo}>Product Catalog</h2>
            <ul style={styles.navLinks}>
                <li>
                    <Link to="/">Product List</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
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
