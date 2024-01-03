import React, { useEffect, useState } from "react";
import "./App.css";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import LoadingComponent from "./components/UI/LoadingComponent";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Navbar from "./components/navbar/Navbar";
import { Product } from "./types/product";
import { Box, Typography } from "@mui/material";
import LoginPage from "./components/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import api from "./services/api";
import SignupPage from "./components/Signup/Signup";

/**
 * Main application component.
 */
const App: React.FC = () => {
  // State to store product data, loading status, and error message
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch product data when the component mounts
    const fetchProducts = async () => {
      try {
        const response = await api.get("/getProducts");

        if (!response) {
          throw new Error("Network response was not ok");
        }

        const data: Product[] = await response.data;

        if (data && data.length > 0) {
          // Set the first product in the response as the current product
          setProduct(data[0]);
        } else {
          setError("No products found");
        }
      } catch (error) {
        setError("Failed to fetch products");
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              <Route
                path="/"
                element={
                  isLoading ? (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      minHeight="80vh" // Adjust the height as needed
                    >
                      <LoadingComponent />
                    </Box>
                  ) : error ? (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      minHeight="80vh"
                    >
                      <Typography variant="h5" color="textSecondary">
                        {error}
                      </Typography>
                    </Box>
                  ) : (
                    product && (
                      <ProductDetail
                        _id={product._id}
                        title={product.title}
                        description={product.description}
                        basePrice={product.basePrice}
                        imageUrl={product.options[0].image_url}
                        options={product.options}
                      />
                    )
                  )
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
