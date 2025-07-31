import LoginPage from "./Pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./Pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;
