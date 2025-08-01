import { useNavigate } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import type { AxiosRequestConfig } from "axios";


 // Replace with your backend URL
type AuthContextType = {
  isLoggedIn: boolean;
  isInitialized: boolean;
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
  const [isInitialized, setIsInitialized] = useState(false);

const getAuthConfig = () => ({
  
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    }
  });

  //Check if token exists in localStorage on initial load(to ensute persistence os the authentication state)
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token && token !== "null") {
      setIsLoggedIn(true);      
    }else {
      setIsLoggedIn(false);
    }
    setIsInitialized(true);
  }, []);

  const authenticateUser = (token: string) => {
    if (!token || token === "null") {
      localStorage.removeItem("accessToken");
      setIsLoggedIn(false);
    } else {
      localStorage.setItem("accessToken", token);
      setIsLoggedIn(true);
    }
  };



  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, handleLogout, authenticateUser , getAuthConfig, isInitialized}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthWrapper };
