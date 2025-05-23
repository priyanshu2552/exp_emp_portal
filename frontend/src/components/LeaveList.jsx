import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/LeaveList.css";

const LeaveList = () => {
  const [leaves, setLeaves] = useState([]);

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

  return (
    <div className="leave-list-table-wrapper">
      <h3>Previous Leave Requests</h3>
      {leaves.length === 0 ? (
        <p>No leave requests submitted yet.</p>
      ) : (
        <table className="leave-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{leave.startDate}</td>
                <td>{leave.endDate}</td>
                <td>{leave.reason}</td>
                <td>{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LeaveList;
