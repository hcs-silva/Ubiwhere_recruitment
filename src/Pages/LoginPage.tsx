import { useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  return (
    <>
      <form onSubmit={handleLogin}>
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
