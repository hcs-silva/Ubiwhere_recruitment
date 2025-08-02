import LoginPage from "./Pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./Pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import QuakeDetailsPage from "./Pages/QuakeDetailsPage";

function App() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/earthquake/details/:Id" element={<ProtectedRoute><QuakeDetailsPage /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;
