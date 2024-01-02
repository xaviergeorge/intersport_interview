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

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

const App: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("sending request to url:", `${API_BASE_URL}/getProducts`);
        const response = await fetch(`${API_BASE_URL}/getProducts`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Product[] = await response.json();
        if (data && data.length > 0) {
          console.log("data:", data[0]);
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
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
