// EmployeeProfile.js
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/EmployeeProfile.css";

export default function EmployeeProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!userString || !token) {
      setError("User not logged in or token missing");
      setLoading(false);
      return;
    }

    const user = JSON.parse(userString);

    fetch(`http://localhost:5000/api/employee/dashboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile");
        return res.json();
      })
      .then((data) => setProfile(data))
      .catch(() => setProfile(user)) // fallback to local storage user data
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading-spinner">Loading profile...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="profile-page-wrapper">
      <Sidebar name={profile?.name} role={profile?.role} />
      <div className="profile-page-content">
        <div className="profile-header">
          <h1>My Profile</h1>
          <p>View your account information</p>
        </div>

        <div className="profile-container">
          <div className="profile-card">
            <div className="profile-card-header">
              <h2>Personal Information</h2>
            </div>

            <div className="profile-details">
              <div className="detail-row">
                <span className="detail-label">Full Name</span>
                <span className="detail-value">{profile?.name || "N/A"}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email Address</span>
                <span className="detail-value">{profile?.email || "N/A"}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Employee ID</span>
                <span className="detail-value">{profile?.employeeId || "N/A"}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Department</span>
                <span className="detail-value">{profile?.department || "N/A"}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Position</span>
                <span className="detail-value">{profile?.position || "N/A"}</span>
              </div>
            </div>
          </div>

          <div className="stats-card">
            <h3>Activity Summary</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">{profile?.leavesTaken || 0}</span>
                <span className="stat-label">Leaves Taken</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{profile?.pendingLeaveRequests || 0}</span>
                <span className="stat-label">Pending Leaves</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{profile?.approvedExpenseClaims || 0}</span>
                <span className="stat-label">Approved Claims</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{profile?.pendingExpenseClaims || 0}</span>
                <span className="stat-label">Pending Claims</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}