import React from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Sidebar.css";
import { getLoggedInUser } from "../utils/auth";

export default function AdminDashboard() {
    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="dashboard-content">
                <h1>Admin Dashboard</h1>
                <p>Approve leaves, review claims, and manage users.</p>
            </div>
        </div>
    );
}

