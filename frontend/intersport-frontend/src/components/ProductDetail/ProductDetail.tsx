import React, { useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

import { useDispatch } from "react-redux";
import { addToCart as addToCartAction } from "../../redux/slices/cartSlice";
import { Product, selectedProductOption } from "../../types/product";
import ProductOptions from "./ProductOptions";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";
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

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    setIsLoading(true);
    // Replace with actual API call to backend
    console.log(
      "sending request to add to cart to url:",
      `${API_BASE_URL}/addToCart`
    );
    console.log(
      "sending the body:",
      JSON.stringify({
        userId: "123456",
        productId: _id,
        quantity: 1,
        color: selectedOption.color,
        size: selectedOption.size,
      })
    );
    fetch(`${API_BASE_URL}/addToCart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "123456",
        productId: _id,
        quantity: 1,
        color: selectedOption.color,
        size: selectedOption.size,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
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
        console.error("Error adding to cart:", error);
        setSnackbarMessage("Failed to add to cart. Please try again.");
        setSnackbarType("error");
        setSnackbarOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleSnackbarClose = (
    event: React.SyntheticEvent<any>,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

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
          <CardMedia
            component="img"
            height="200" // Fixed height for the image
            image={selectedOption.imageUrl}
            alt={title}
            sx={{
              objectFit: "cover", // This will cover the area without changing aspect ratio
              width: "100%", // This makes the image responsive within the card
            }}
          />
          <Box
            sx={{
              maxWidth: "345px", // Fixed width for the card
              width: "100%", // Responsive to the outer container
              m: "auto",
              bgcolor: "background.paper",
              boxShadow: 1,
              borderRadius: 2,
            }}
          >
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
          </Box>
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarType} // This will either be "error" or "success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductDetail;
