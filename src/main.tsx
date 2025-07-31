import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { AuthWrapper } from "./contexts/AuthContext.tsx";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <AuthWrapper>
        <App />
      </AuthWrapper>
    </Router>
  </StrictMode>
);
