// src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav style={{ padding: "0.5rem 1rem", borderBottom: "1px solid #ddd" }}>
            <Link to="/dashboard" style={{ marginRight: "1rem" }}>
                Dashboard
            </Link>
            <Link to="/login">Logout</Link>
        </nav>
    );
}
