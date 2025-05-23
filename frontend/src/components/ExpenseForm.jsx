import React, { useState } from "react";
import axios from "axios";
import "../styles/ExpenseForm.css";

const ExpenseForm = () => {
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
    } catch (error) {
      alert("Error submitting expense claim");
      console.error(error);
    }
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h3>Request Expense Claim</h3>
      <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      <input type="text" name="projectName" placeholder="Project Name" value={formData.projectName} onChange={handleChange} required />
      <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
      <input type="text" name="locationOfSite" placeholder="Location of Site" value={formData.locationOfSite} onChange={handleChange} required />
      <input type="text" name="localCategory" placeholder="Local Category" value={formData.localCategory} onChange={handleChange} required />
      <input type="text" name="modeOfTravel" placeholder="Mode of Travel" value={formData.modeOfTravel} onChange={handleChange} required />
      <input type="number" name="travelExpense" placeholder="Travel Expense" value={formData.travelExpense} onChange={handleChange} />
      <input type="number" name="foodExpense" placeholder="Food Expense" value={formData.foodExpense} onChange={handleChange} />
      <input type="number" name="stayExpense" placeholder="Stay Expense" value={formData.stayExpense} onChange={handleChange} />
      <input type="text" name="receiptImage" placeholder="Receipt Image URL" value={formData.receiptImage} onChange={handleChange} />
      <button type="submit">Submit Claim</button>
    </form>
  );
};

export default ExpenseForm;
