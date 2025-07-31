import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.tsx";
import styles from "../styles/DashboardPage.module.css";
import Map from "../components/Map";

function DashboardPage() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthWrapper");
  }
  const { handleLogout } = authContext;


 

  return (
    <>
      <h1>This is the dashboard</h1>
      <Map/>
      <button onClick={handleLogout} className={styles.Button}>
        Logout
      </button>
    </>
  );
}

export default DashboardPage;
