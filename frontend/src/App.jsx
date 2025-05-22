import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* You will later add admin/employee dashboard routes here */}
      </Routes>
    </Router>
  );
}

export default App;
