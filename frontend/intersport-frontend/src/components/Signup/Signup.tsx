import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import CustomSnackbar from "../UI/CustomSnackbar";
import axios from "axios";

/**
 * The SignupPage component for user registration.
 * @component
 * @returns {JSX.Element} The JSX representation of the SignupPage component.
 */
const SignupPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post("/auth/signup", {
        username,
        password,
        fullName,
      });

      const data = await response.data;

      if (!response) {
        throw new Error(data.message || "Signup failed");
      }

      setSnackbarMessage("Signup successful. Please login.");
      setSnackbarSeverity("success");
      // Delay navigation to allow Snackbar to be seen
      setTimeout(() => {
        navigate("/login");
      }, 2000); // 2 seconds delay
    } catch (error) {
      let message = "An unknown error occurred";

      // Check if the error is an AxiosError and has a response with the message
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.data.message
      ) {
        message = error.response.data.message;
      }

      setSnackbarMessage(message);
      setSnackbarSeverity("error");
    } finally {
      setOpenSnackbar(true);
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "white",
          padding: 3,
          borderRadius: 1,
          boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form onSubmit={handleSignup}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="fullName"
            label="Full Name"
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Sign Up"}
          </Button>
        </form>
      </Box>
      <CustomSnackbar
        open={openSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setOpenSnackbar(false)}
      />
    </Container>
  );
};

export default SignupPage;
