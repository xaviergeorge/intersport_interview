import React, { useState } from "react";
import { Box, Container, TextField, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/slices/userSlice";
import api from "../../services/api";
import CustomSnackbar from "../UI/CustomSnackbar";

/**
 * The LoginPage component for user authentication.
 * @component
 * @returns {JSX.Element} The JSX representation of the LoginPage component.
 */
const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Handles the Snackbar close event.
   * @param {React.SyntheticEvent<any, Event> | Event} event - The event object.
   * @param {string | undefined} reason - The reason for closing the Snackbar.
   */
  const handleSnackbarClose = (
    event: React.SyntheticEvent<any, Event> | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  /**
   * Handles the user login submission.
   * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
   */
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      const data = await response.data;

      if (!response) {
        throw new Error(data.message || "Login failed");
      }
      dispatch(login({ username: data.user.username, userId: data.user._id }));

      setSnackbarMessage("Login successful");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      navigate("/");
    } catch (error) {
      const message = (error as Error).message || "An unknown error occurred";
      setSnackbarMessage(message);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
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
          Sign in
        </Typography>
        <form onSubmit={handleLogin}>
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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </form>
      </Box>
      <CustomSnackbar
        open={openSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => handleSnackbarClose}
      />
    </Container>
  );
};

export default LoginPage;
