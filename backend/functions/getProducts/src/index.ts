import { HttpFunction } from '@google-cloud/functions-framework';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import Product from './models/ProductModel';

// Load environment variables from .env file in development
if (process.env.MONGO_URI === undefined) {
  dotenv.config();
}

// MongoDB URI
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
  const allowedOrigins = ['http://localhost:3000', 'https://gcp-atlas.web.app'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
      res.set('Access-Control-Allow-Origin', origin);
  }

  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.set('Access-Control-Allow-Credentials', 'true');
};

/**
 * HTTP Function to retrieve a list of products.
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @returns {void}
 */
export const getProducts: HttpFunction = async (req, res) => {
  // Set CORS headers for cross-origin requests.
  setCORSHeaders(req, res);

  // Handle OPTIONS method for CORS preflight.
  if (req.method === 'OPTIONS') {
    res.status(204).send(''); // Respond with a successful CORS preflight.
    return;
  }

  // Check if only GET requests are allowed.
  if (req.method !== 'GET') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  try {
    // Connect to the MongoDB database.
    await connectToDatabase();

    // Retrieve a list of all products from the database.
    const products = await Product.find({});
    console.log("Returning products:", products);

    // Send a successful response with the list of products in JSON format.
    res.status(200).json(products);
  } catch (error) {
    // Handle errors and send an internal server error response.
    console.error('Error fetching products:', error);
    res.status(500).send('Error connecting to the database');
  }
};
