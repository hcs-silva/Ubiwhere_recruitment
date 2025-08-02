import { useContext, useEffect } from "react";
import{ useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.tsx";
import styles from "../styles/DashboardPage.module.css";
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
    <div className={styles.dashboardContainer}>
      <h1>This is the dashboard</h1>
      <Map />
      <button onClick={handleLogout} className={styles.Button}>
        Logout
      </button>
    </div>
  );
}

export default DashboardPage;
