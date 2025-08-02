import { useContext, useEffect } from "react";
import{ useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.tsx";
import dashboardStyles from "../styles/DashboardPage.module.css";
import Map from "../components/Map";

function DashboardPage() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthWrapper");
  }
  const navigate = useNavigate();
  const { handleLogout, authenticateUser } = authContext;
  
  useEffect(() => {
    const existingToken = localStorage.getItem("accessToken");
    if (existingToken) {
        authenticateUser(existingToken);
    } else {
        alert("No token found, redirecting to login page.");
       navigate("/")
    }
  }, [authenticateUser, navigate]);

  return (
    <div className={dashboardStyles.dashboardContainer}>
      <h1>Dashboard</h1>
      <Map />
      <button onClick={handleLogout} className={dashboardStyles.logoutButton}>
        Logout
      </button>
    </div>
  );
}

export default DashboardPage;
