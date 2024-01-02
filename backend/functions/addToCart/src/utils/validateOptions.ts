import Product from "../models/ProductModel";

/**
 * Function to validate product options (color and size).
 * @param {string} productId - The product ID.
 * @param {string} color - The selected color.
 * @param {string} size - The selected size.
 * @returns {Promise<boolean>} - True if the options are valid, false otherwise.
 */
export const validateProductOptions = async (productId: string, color: string, size: string): Promise<boolean> => {
    try {
      // Find the product by its ID.
      const product = await Product.findById(productId);
  
      if (!product) {
        // Product not found.
        return false;
      }
  
      // Check if the selected color and size exist in any of the product's options.
      for (const option of product.options) {
        if (option.color === color) {
          // Color matches, check if the size exists.
          const foundSize = option.sizes.find((productSize) => productSize.size === size);
          if (foundSize) {
            return true; // Valid color and size combination found.
          }
        }
      }
  
      // No valid color and size combination found.
      return false;
    } catch (error) {
      console.error('Error validating product options:', error);
      return false; // Handle errors as invalid options.
    }
  };