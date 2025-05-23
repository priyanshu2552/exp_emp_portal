import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ExpenseList.css";

const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);

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

    return (
        <div className="expense-list">
            <h3>Previous Claims</h3>
            {expenses.length === 0 ? (
                <p>No expense claims submitted yet.</p>
            ) : (
                expenses.map((expense, index) => (
                    <div key={index} className="expense-card">
                        <p><strong>Date:</strong> {expense.date}</p>
                        <p><strong>Project:</strong> {expense.projectName}</p>
                        <p><strong>Description:</strong> {expense.description}</p>
                        <p><strong>Location:</strong> {expense.locationOfSite}</p>
                        <p><strong>Travel:</strong> ₹{expense.travelExpense}</p>
                        <p><strong>Food:</strong> ₹{expense.foodExpense}</p>
                        <p><strong>Stay:</strong> ₹{expense.stayExpense}</p>
                        <p><strong>Total:</strong> ₹{expense.total}</p>
                        <p><strong>Status:</strong> {expense.status}</p>
                        {expense.receiptImage && (
                            <img src={expense.receiptImage} alt="Receipt" className="receipt-img" />
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default ExpenseList;
