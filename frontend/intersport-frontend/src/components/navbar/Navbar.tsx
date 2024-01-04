import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { logout } from "../../redux/slices/userSlice"; // Import logout action
import { Badge, Button, Stack } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

/**
 * The Navbar component for the application.
 * @component
 * @returns {JSX.Element} The JSX representation of the Navbar component.
 */
const Navbar: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  ); // Calculate total items in the cart
  const username = useSelector((state: RootState) => state.user.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Handles the logout action.
   */
  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    navigate("/"); // Navigate to the home page after logout
  };

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {" "}
        {/* Adjusted for spacing */}
        {/* Home Icon to the left */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="home"
          sx={{ mr: 2 }}
        >
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            <HomeIcon />
          </Link>
        </IconButton>
        {/* Title in the center */}
        <Typography
          variant="h6"
          component="div"
          sx={{ textAlign: "center", marginLeft: 2 }}
        >
          Shoppy
        </Typography>
        {/* Right side elements */}
        {isLoggedIn ? (
          <Stack direction="row" alignItems="center" spacing={2}>
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCartIcon />
            </Badge>
            <Typography variant="subtitle1">Hi, {username}</Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Stack>
        ) : (
          <Stack direction="row" alignItems="center" spacing={2}>
            <Link
              to="/login"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Login
            </Link>
            <Link
              to="/signup"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Signup
            </Link>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
