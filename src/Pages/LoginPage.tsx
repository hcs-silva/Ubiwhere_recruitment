import { useState } from "react";
import axios from "axios";
import styles from "../styles/LoginPage.module.css";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.tsx";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
const navigate = useNavigate();
   const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthWrapper");
  }
    const { setIsLoggedIn } = authContext;

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();

    const userToLogin = {
      email,
      password,
    };
    console.log(userToLogin);
    try {
      const response = await axios.post(`${BACKEND_URL}/token`, userToLogin);
      console.log(response.data);
        localStorage.setItem("accessToken", response.data.access_token);
      localStorage.setItem("refreshToken", response.data.refresh_token);
      setIsLoggedIn(true);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <label>
          Email:
          <br />
          <input
            type="text"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default LoginPage;
