/**
 * Represents a product size with its name and available stock.
 */
export interface ProductSize {
  size: string;   // The size name (e.g., "Small", "Medium", "Large")
  stock: number;  // The available stock for this size
}

/**
 * Represents a product option including color, image URL, and available sizes.
 */
export interface ProductOption {
  color: string;        // The color of the product option (e.g., "Red", "Blue")
  image_url: string;    // The URL of the image associated with this option
  sizes: ProductSize[]; // An array of available sizes for this option
}

/**
 * Represents a product with its properties including ID, title, description, base price,
 * image URL, and available options.
 */
export interface Product {
  _id: string;            // The unique identifier for the product
  title: string;          // The title or name of the product
  description: string;    // A brief description of the product
  basePrice: number;      // The base price of the product
  imageUrl: string;      // The URL of the main product image
  options: ProductOption[]; // An array of available options for this product
}

/**
 * Represents a selected product option with size, color, and an image URL.
 */
export interface selectedProductOption {
  size: string;         // The selected size for the product option
  color: string;        // The selected color for the product option
  imageUrl: string;    // The URL of the image associated with the selected option
}
