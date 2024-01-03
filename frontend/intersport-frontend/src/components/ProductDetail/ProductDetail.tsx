import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

import { useDispatch } from "react-redux";
import { addToCart as addToCartAction } from "../../redux/slices/cartSlice";
import { Product, selectedProductOption } from "../../types/product";
import ProductOptions from "./ProductOptions";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import api from "../../services/api";
import CustomSnackbar from "../UI/CustomSnackbar";

/**
 * ProductDetail component displays detailed product information and handles adding products to the cart.
 *
 * @param {Product} props - The product details.
 * @returns {JSX.Element} - React component.
 */
const ProductDetail: React.FC<Product> = ({
  _id,
  title,
  description,
  basePrice,
  imageUrl,
  options,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState<"success" | "error">(
    "success"
  );
  const [selectedOption, setSelectedOption] = useState<selectedProductOption>({
    size: "",
    color: "",
    imageUrl: imageUrl, // Initialize with the default imageUrl
  });

  // Check if the user is logged in and get the user ID from Redux state
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const userId = useSelector((state: RootState) => state.user.userId);

  const dispatch = useDispatch();
  /**
   * Handles adding the selected product to the cart.
   */
  const handleAddToCart = () => {
    setIsLoading(true);

    if (!isLoggedIn) {
      // User is not logged in, show a snackbar message
      setSnackbarMessage("Please log in to add items to the cart.");
      setSnackbarType("error");
      setSnackbarOpen(true);
      setIsLoading(false);
      return;
    }
    // Make an API request to add the product to the cart
    api
      .post("/addToCart", {
        userId: userId,
        productId: _id,
        quantity: 1,
        color: selectedOption.color,
        size: selectedOption.size,
      })
      .then((response) => {
        // Dispatch Redux action to update cart state
        dispatch(
          addToCartAction({
            productId: _id,
            quantity: 1,
            color: selectedOption.color,
            size: selectedOption.size,
          })
        );
        setSnackbarMessage("Item successfully added to cart.");
        setSnackbarType("success");
        setSnackbarOpen(true);
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error adding to cart:", error);
        setSnackbarMessage("Failed to add to cart. Please try again.");
        setSnackbarType("error");
        setSnackbarOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  /**
   * Handles selecting a product option.
   *
   * @param {selectedProductOption} option - The selected product option.
   */
  const onSelectOption = (option: { size: string; color: string }) => {
    const selectedColorOption = options.find((o) => o.color === option.color);
    const newImageUrl = selectedColorOption
      ? selectedColorOption.image_url
      : imageUrl;
    setSelectedOption({ ...option, imageUrl: newImageUrl });
  };

  return (
    <>
      <Box
        sx={{
          maxWidth: 500, // Adjust if necessary
          my: 4,
          mx: "auto",
          bgcolor: "background.paper",
          boxShadow: 3,
          borderRadius: 2,
          p: 2,
        }}
      >
        <Card>
          <Box
            sx={{
              height: 0,
              overflow: "hidden",
              paddingTop: "56.25%", // for a 16:9 aspect ratio, adjust as needed
              position: "relative",
              width: "100%", // This makes the container responsive
            }}
          >
            <img
              src={selectedOption.imageUrl}
              alt={title}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
            <Typography variant="h6">${basePrice}</Typography>

            <ProductOptions
              options={options}
              selectedOption={selectedOption}
              onSelectOption={onSelectOption}
            />
          </CardContent>

          <CardActions>
            {selectedOption.size && selectedOption.color && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddToCart}
                disabled={isLoading}
              >
                {isLoading ? "Adding..." : "Add to Cart"}
              </Button>
            )}
          </CardActions>
        </Card>
      </Box>
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarType}
        onClose={(e) => setSnackbarOpen(false)}
      />
    </>
  );
};

export default ProductDetail;
