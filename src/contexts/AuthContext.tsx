import { useNavigate } from "react-router-dom";
import { useState, createContext } from "react";
// import axios from "axios";

type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
type AuthWrapperProps = {
  children: React.ReactNode;
};

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

 
 
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthWrapper };
