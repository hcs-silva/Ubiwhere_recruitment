import LoginPage from "./Pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./Pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import QuakeDetailsPage from "./Pages/QuakeDetailsPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./scss/main.scss";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/earthquake/details/:Id"
          element={
            <ProtectedRoute>
              <QuakeDetailsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      ></ToastContainer>
    </>
  );
}

export default App;
