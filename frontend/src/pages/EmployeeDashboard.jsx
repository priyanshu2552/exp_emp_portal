import React from "react";
import Sidebar from '../components/Sidebar'
import EmployeeProfile from "./EmployeeProfile"; // import profile component
import { getLoggedInUser } from "../utils/auth";

export default function EmployeeDashboard() {
    const user = getLoggedInUser();

    return (
        <div className="dashboard-container">
            <Sidebar name={user?.name} role={user?.role} />
            <div className="profile-content">
                {/* Profile content goes here */}
            </div>
        </div>
    );
}
