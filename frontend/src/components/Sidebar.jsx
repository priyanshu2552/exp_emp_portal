import React, { useState } from "react";
import "../styles/Sidebar.css";
import profileImage from "../assets/profile1.jpeg";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const user = useUser();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const toggleDropdown = () => setDropdownOpen((prev) => !prev);

    const role = user?.role || "employee";

    const options =
        role === "admin"
            ? [
                { label: "Profile", link: "/admin/profile" },
                { label: "Leave Requests", link: "/admin/leaves" },
                { label: "Expense Requests", link: "/admin/expenses" },
                { label: "Logout", action: handleLogout },
            ]
            : [
                { label: "Profile", link: "/employee/profile" },
                { label: "Leave Request", link: "/employee/leaves" },
                { label: "Expense Claim", link: "/employee/expenses" },
                { label: "Logout", action: handleLogout },
            ];

    return (
        <div className="sidebar">
            <div className="profile-section">
                <img src={profileImage} alt="Profile" className="profile-img" />
                <h3 className="user-name">{user?.name || user?.username || "Loading..."}</h3>
                <p className="user-role">{role.toUpperCase()}</p>
                <div className="dropdown-toggle" onClick={toggleDropdown}>
                    ☰
                </div>
            </div>

            <div className={`sidebar-links ${dropdownOpen ? "open" : ""}`}>
                {options.map(({ label, link, action }, i) =>
                    action ? (
                        <div key={i} className="sidebar-link logout-link" onClick={action}>
                            {label}
                        </div>
                    ) : (
                        <a key={i} href={link} className="sidebar-link">
                            {label}
                        </a>
                    )
                )}
            </div>
        </div>
    );
}
