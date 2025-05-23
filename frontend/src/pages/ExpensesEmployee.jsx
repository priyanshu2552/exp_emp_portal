// ExpensePage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../styles/ExpensePage.css";

const ExpensePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    projectName: "",
    description: "",
    locationOfSite: "",
    localCategory: "",
    modeOfTravel: "",
    travelExpense: 0,
    foodExpense: 0,
    stayExpense: 0,
    receiptImage: "",
  });

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/employee/expenses", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setExpenses(res.data || []);
      } catch (error) {
        console.error("Error fetching expenses", error);
      }
    };

    fetchExpenses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/employee/expense", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Expense claim submitted successfully");
      setFormData({
        date: "",
        projectName: "",
        description: "",
        locationOfSite: "",
        localCategory: "",
        modeOfTravel: "",
        travelExpense: 0,
        foodExpense: 0,
        stayExpense: 0,
        receiptImage: "",
      });
      setShowForm(false);
      // Refresh the expense list
      const res = await axios.get("http://localhost:5000/api/employee/expenses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setExpenses(res.data || []);
    } catch (error) {
      alert("Error submitting expense claim");
      console.error(error);
    }
  };

  return (
    <div className="expense-page-wrapper">
      <Sidebar />
      <div className="expense-page-content">
        <div className="expense-header">
          <h2>Expense Claims</h2>
          <button className="generate-new-btn" onClick={() => setShowForm(!showForm)}>
            Generate New
          </button>
        </div>

        {showForm && (
          <div className="expense-form-container">
            <h3>Request Expense Claim</h3>
            <form className="expense-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Project Name</label>
                  <input
                    type="text"
                    name="projectName"
                    placeholder="Project Name"
                    value={formData.projectName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Location of Site</label>
                  <input
                    type="text"
                    name="locationOfSite"
                    placeholder="Location of Site"
                    value={formData.locationOfSite}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Local Category</label>
                  <input
                    type="text"
                    name="localCategory"
                    placeholder="Local Category"
                    value={formData.localCategory}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Mode of Travel</label>
                <input
                  type="text"
                  name="modeOfTravel"
                  placeholder="Mode of Travel"
                  value={formData.modeOfTravel}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Travel Expense (₹)</label>
                  <input
                    type="number"
                    name="travelExpense"
                    placeholder="0"
                    value={formData.travelExpense}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Food Expense (₹)</label>
                  <input
                    type="number"
                    name="foodExpense"
                    placeholder="0"
                    value={formData.foodExpense}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Stay Expense (₹)</label>
                  <input
                    type="number"
                    name="stayExpense"
                    placeholder="0"
                    value={formData.stayExpense}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Receipt Image URL</label>
                <input
                  type="text"
                  name="receiptImage"
                  placeholder="Receipt Image URL"
                  value={formData.receiptImage}
                  onChange={handleChange}
                />
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Submit Claim
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="expense-table-container">
          <h3>Previous Claims</h3>
          {expenses.length === 0 ? (
            <p className="no-expenses">No expense claims submitted yet.</p>
          ) : (
            <table className="expense-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Project</th>
                  <th>Description</th>
                  <th>Location</th>
                  <th>Travel</th>
                  <th>Food</th>
                  <th>Stay</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense, index) => (
                  <tr key={index}>
                    <td>{new Date(expense.date).toLocaleDateString()}</td>
                    <td>{expense.projectName}</td>
                    <td>{expense.description}</td>
                    <td>{expense.locationOfSite}</td>
                    <td>₹{expense.travelExpense}</td>
                    <td>₹{expense.foodExpense}</td>
                    <td>₹{expense.stayExpense}</td>
                    <td>₹{expense.total}</td>
                    <td>
                      <span className={`status-badge ${expense.status.toLowerCase()}`}>
                        {expense.status}
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

export default ExpensePage;