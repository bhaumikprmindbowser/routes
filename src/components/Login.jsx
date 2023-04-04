import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import useAuth from "../hooks/useAuth";

function Login() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(userName);
    navigate("/");
  };

  return (
    <Box className="App-header">
      <form onSubmit={handleSubmit}>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
          }}
        >
          <input
            type="text"
            name="username"
            id="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Button type="submit" variant="contained">
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default Login;
