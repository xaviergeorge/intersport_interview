import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import api from "./services/api";

const mockedApi = api as jest.Mocked<typeof api>;
// Mock the API module
jest.mock("./services/api", () => ({
  get: jest.fn(),
}));

describe("App", () => {
  // Helper function to render the component within the Redux provider
  const renderApp = () =>
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

  it("renders without crashing", () => {
    renderApp();
  });

  it("renders the Navbar", () => {
    renderApp();
    expect(screen.getByText(/My E-commerce Store/i)).toBeInTheDocument();
  });

  it("displays loading component when isLoading is true", async () => {
    mockedApi.get.mockResolvedValueOnce({ data: [] }); // Mock the API call to resolve with an empty array
    renderApp();
    expect(screen.getByTestId("loading-component")).toBeInTheDocument();
  });

  it("displays an error message when there is an error", async () => {
    mockedApi.get.mockRejectedValueOnce(
      new Error("Network response was not ok")
    );
    renderApp();
    const errorMessage = await screen.findByText(/Failed to fetch products/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it("renders ProductDetail component when a product is fetched", async () => {
    const mockProduct = {
      _id: "123",
      title: "Test Product",
      description: "Test Description",
      basePrice: 29.99,
      imageUrl: "http://example.com/product.jpg",
      options: [
        {
          color: "Blue",
          image_url: "http://example.com/product.jpg",
          sizes: [],
        },
      ],
    };
    mockedApi.get.mockResolvedValueOnce({ data: [mockProduct] }); // Mock the API call to resolve with a product
    renderApp();
    const productElement = await screen.findByText(/Test Product/i);
    expect(productElement).toBeInTheDocument();
  });
});
