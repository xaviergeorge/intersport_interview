// src/components/Navbar/Navbar.tsx

import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { logout } from "../../redux/slices/userSlice"; // import logout action
import { Button } from "@mui/material";

const Navbar: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const username = useSelector((state: RootState) => state.user.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    navigate("/"); // Navigate to home page after logout
  };
  return (
    <AppBar position="static">
      <Toolbar>
        {/* Home Icon */}
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <IconButton edge="start" color="inherit" aria-label="home">
            <HomeIcon />
          </IconButton>
        </Link>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My E-commerce Store
        </Typography>

        {isLoggedIn ? (
          <>
            <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
              Hi, {username}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                color: "inherit",
                textDecoration: "none",
                marginRight: "1rem",
              }}
            >
              Login
            </Link>
            <Link
              to="/signup"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Signup
            </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
