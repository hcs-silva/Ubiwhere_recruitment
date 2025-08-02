import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

type PrivateRouteProps = {
  children: React.ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const authContext = useContext(AuthContext);
  const { isLoggedIn, isInitialized } = authContext || { isLoggedIn: false };
  console.log("isLoggedIn:", isLoggedIn);

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  // Check if the user is logged in

  if (!isLoggedIn) {
    toast.error("You must be logged in to access this page.");
    return <Navigate to="/" />;
  }
  return <div>{children}</div>;
};
export default PrivateRoute;
