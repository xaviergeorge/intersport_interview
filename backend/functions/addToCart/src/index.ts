import { HttpFunction } from '@google-cloud/functions-framework';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import Cart from './models/CartModel';
import { validateProductOptions } from './utils/validateOptions';

// Load environment variables from a .env file if MONGO_URI is undefined.
if (process.env.MONGO_URI === undefined) {
  dotenv.config();
}

// Retrieve the MongoDB URI from the environment or set it to an empty string.
const mongoURI = process.env.MONGO_URI || '';

// Function to connect to the MongoDB database asynchronously.
const connectToDatabase = async () => {
  // Check if a connection to the database is not already established.
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoURI);
  }
};



// Function to set CORS (Cross-Origin Resource Sharing) headers.
const setCORSHeaders = (req, res) => {
  // Define allowed origins here.
  const allowedOrigins = ['http://localhost:3000', 'https://gcp-atlas.web.app'];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.set('Access-Control-Allow-Origin', origin);
  }

  // Set other CORS headers.
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', '*');
};

/**
 * HTTP Function to add an item to the shopping cart.
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @returns {void}
 */
export const addToCart: HttpFunction = async (req, res) => {
  // Set CORS headers for cross-origin requests.
  setCORSHeaders(req, res);

  // Handle OPTIONS request for preflight checks.
  if (req.method === 'OPTIONS') {
    res.status(204).send(' ');
    return;
  }

  // Check if only POST requests are allowed.
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  try {
    // Extract necessary data from the request body.
    const { userId, productId, color, size, quantity } = req.body;

    // Check if userId, productId, color, size, and quantity are provided and not empty.
    if (!userId || !productId || !color || !size || !quantity) {
      res.status(400).json({ error: 'Missing or invalid data' });
      return;
    }

    // Connect to the MongoDB database.
    await connectToDatabase();

    // Validate product options (color and size) here.
    const isValidProductOption = await validateProductOptions(productId, color, size);

    if (!isValidProductOption) {
      res.status(400).json({ error: 'Invalid product options' });
      return;
    }

    // Find the user's cart by userId.
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Find the index of the item in the cart.
      const itemIndex = cart.items.findIndex(
        (item) =>
          item.productId === productId &&
          item.color === color &&
          item.size === size
      );

      if (itemIndex > -1) {
        // Update quantity if the item exists in the cart.
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add a new item to the cart if it doesn't exist.
        cart.items.push({ productId, color, size, quantity });
      }
    } else {
      // Create a new cart if it doesn't exist.
      cart = new Cart({ userId, items: [{ productId, color, size, quantity }] });
    }

    // Save the updated cart.
    await cart.save();

    // Send a successful response with the updated cart.
    res.status(200).json({ message: 'Item added to cart', cart });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).send('Internal Server Error');
  }
};