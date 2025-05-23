import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployeeProfile from "./pages/EmployeeProfile";  // Import Profile page
import ExpensePage from "./pages/ExpensesEmployee";
import LeavePage from "./pages/EmployeeLeave";
import { UserProvider } from "./contexts/UserContext";
function App() {
  return (
     <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        <Route path="/employee/profile" element={<EmployeeProfile />} />  {/* Use lowercase path */}
         <Route path="/employee/expenses" element={<ExpensePage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/employee/leaves" element={<LeavePage />} />
      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;
