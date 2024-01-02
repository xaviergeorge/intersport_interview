import axios from 'axios';

const API_URL = 'your-api-url'; // Replace with your actual API URL

export const getProductDetails = async (productId: string) => {
  try {
    const response = await axios.get(`${API_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    // Handle error appropriately
    console.error('Error fetching product details:', error);
    throw error;
  }
};
