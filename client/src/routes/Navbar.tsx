import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => (
    <nav className="navbar">
        <ul className="navbar__ul">
            <Link className="navbar__link" to="/">Home</Link>
            <Link className="navbar__link" to="/register">Register</Link>
            <Link className="navbar__link" to="/login">Login</Link>
            <Link className="navbar__link" to="/bye">Bye</Link>
        </ul>
    </nav>
);


