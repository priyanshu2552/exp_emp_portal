import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../styles/EmployeeLeave.css";

const LeavePage = () => {
  const [leaves, setLeaves] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/employee/leaves", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setLeaves(res.data || []);
      } catch (error) {
        console.error("Error fetching leave requests", error);
      }
    };

    fetchLeaves();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/employee/leave", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Leave request submitted successfully!");
      setFormData({ startDate: "", endDate: "", reason: "" });
      setShowForm(false);
      // Refresh the leave list
      const res = await axios.get("http://localhost:5000/api/employee/leaves", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLeaves(res.data || []);
    } catch (error) {
      alert("Error submitting leave request");
      console.error(error);
    }
  };

  return (
    <div className="leave-page-wrapper">
      <Sidebar />
      <div className="leave-page-content">
        <div className="leave-header">
          <h2>Leave Requests</h2>
          <button className="generate-new-btn" onClick={() => setShowForm(!showForm)}>
            Generate New
          </button>
        </div>

        {showForm && (
          <div className="leave-form-container">
            <h3>Submit Leave Request</h3>
            <form className="leave-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Reason</label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  required
                  placeholder="Enter reason for leave..."
                />
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="leave-table-container">
          <h3>Previous Leave Requests</h3>
          {leaves.length === 0 ? (
            <p className="no-leaves">No leave requests submitted yet.</p>
          ) : (
            <table className="leave-table">
              <thead>
                <tr>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave, index) => (
                  <tr key={index}>
                    <td>{new Date(leave.startDate).toLocaleDateString()}</td>
                    <td>{new Date(leave.endDate).toLocaleDateString()}</td>
                    <td>{leave.reason}</td>
                    <td>
                      <span className={`status-badge ${leave.status.toLowerCase()}`}>
                        {leave.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeavePage;