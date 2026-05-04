import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { meRequest } from "./api";
import { clearAuthSession, getAuthToken, saveAuthSession } from "./storage";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    async function verifySession() {
      const token = getAuthToken();

      if (!token) {
        setStatus("unauthorized");
        return;
      }

      try {
        const result = await meRequest(token);
        saveAuthSession({ token, user: result.user });
        setStatus("authorized");
      } catch (error) {
        clearAuthSession();
        setStatus("unauthorized");
      }
    }

    verifySession();
  }, []);

  if (status === "checking") {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#475569",
        }}
      >
        Checking your session...
      </div>
    );
  }

  if (status === "unauthorized") {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
