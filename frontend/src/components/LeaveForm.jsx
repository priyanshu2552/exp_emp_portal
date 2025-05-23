import React, { useState } from "react";
import axios from "axios";
import "../styles/LeaveForm.css";

const LeaveForm = () => {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });

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
    } catch (error) {
      alert("Error submitting leave request");
      console.error(error);
    }
  };

  return (
    <form className="leave-form" onSubmit={handleSubmit}>
      <h3>Submit Leave Request</h3>
      <label>Start Date</label>
      <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />

      <label>End Date</label>
      <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />

      <label>Reason</label>
      <textarea name="reason" value={formData.reason} onChange={handleChange} required placeholder="Enter reason for leave..." />

      <button type="submit">Submit Request</button>
    </form>
  );
};

export default LeaveForm;
