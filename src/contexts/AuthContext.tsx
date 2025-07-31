import { useNavigate } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import type { AxiosRequestConfig } from "axios";


 // Replace with your backend URL
type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => void;
  authenticateUser: (token: string) => void;  
  getAuthConfig: () => AxiosRequestConfig;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
type AuthWrapperProps = {
  children: React.ReactNode;
};

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

const getAuthConfig = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }
  });

  //Check if token exists in localStorage on initial load(to ensute persistence os the authentication state)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && token !== "null") {
      setIsLoggedIn(true);
    }
  }, []);

  const authenticateUser = (token: string) => {
    if (!token || token === "null") {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  };



  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, handleLogout, authenticateUser , getAuthConfig}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthWrapper };
