// src/functions/getProducts.ts

import { HttpFunction } from '@google-cloud/functions-framework';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import Product from './models/ProductModel';

// Load environment variables from .env file in development
if (process.env.NODE_ENV === 'dev') {
  dotenv.config();
}

const mongoURI = process.env.MONGO_URI || '';

// Connect to MongoDB
const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoURI);
  }
};

export const getProducts: HttpFunction = async (req, res) => {
  // Set CORS headers
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.set('Access-Control-Allow-Methods', 'GET');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle OPTIONS method for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(204).send('sending cors');
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  try {
    await connectToDatabase();
    const products = await Product.find({});
    console.log("Returning products:", products);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Error connecting to the database');
  } 
};
