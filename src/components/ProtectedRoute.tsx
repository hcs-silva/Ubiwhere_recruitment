import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: React.ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const authContext = useContext(AuthContext);
  const { isLoggedIn } = authContext || { isLoggedIn: false };
  console.log("isLoggedIn:", isLoggedIn);

  // Check if the user is logged in

  if (!isLoggedIn) {
    alert("You must be logged in to access this page.");
    return <Navigate to="/" />;
  }
  return <div>{children}</div>;
};
export default PrivateRoute;
