// src/components/UserAuth/UserAuth.tsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartItem, setItemQuantity } from "../../redux/slices/cartSlice"; // Import the action
import { RootState } from "../../redux/store"; // Import the RootState type

import "./UserAuth.css";

const UserAuth: React.FC = () => {
  const dispatch = useDispatch();
  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  ); // Calculate total items in cart
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [username, setUsername] = React.useState("User");

  const handleLogin = () => {
    // Dummy login function
    setIsLoggedIn(true);
    setUsername("Username"); // Replace with actual username after implementing authentication
  };

  const handleLogout = () => {
    // Dummy logout function
    setIsLoggedIn(false);
    setUsername("");
  };

  useEffect(() => {
    const fetchCartQuantities = async () => {
      // Replace this with your actual API call
      // For example, an API call that returns an array of cart items with their quantities
      const response = await fetch("/api/cart");
      const cartItems = await response.json();

      // Dispatch an action to set cart quantities in the store
      cartItems.forEach((item: CartItem) => {
        dispatch(
          setItemQuantity({
            productId: item.productId,
            color: item.color,
            size: item.size,
            quantity: item.quantity,
          })
        );
      });
    };

    fetchCartQuantities();
  }, [dispatch]);

  return (
    <div className="userAuth">
      {/* Cart Icon with Badge showing total items */}
      <Badge badgeContent={cartCount} color="error">
        <ShoppingCartIcon />
      </Badge>

      {/* Authentication */}
      {isLoggedIn ? (
        <>
          <span>Hi, {username}</span>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </>
      ) : (
        <Button color="inherit" onClick={handleLogin}>
          Login
        </Button>
      )}
    </div>
  );
};

export default UserAuth;
