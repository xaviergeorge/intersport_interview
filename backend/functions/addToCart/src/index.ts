// src/functions/addToCart.ts
import { HttpFunction } from '@google-cloud/functions-framework';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import Cart from './models/CartModel';

if (process.env.NODE_ENV === 'dev') {
  dotenv.config();
}

const mongoURI = process.env.MONGO_URI || '';

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoURI);
  }
};

const setCORSHeaders = (req, res) => {
  const allowedOrigins = ['http://localhost:3000', 'https://your-production-url.com'];
  console.log('Origin:', req.headers.origin);
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.set('Access-Control-Allow-Origin', origin);
  }

  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', '*');
  
};

export const addToCart: HttpFunction = async (req, res) => {
  setCORSHeaders(req, res);

  if (req.method === 'OPTIONS') {
    res.status(204).send(' ');
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  try {
    const { userId, productId, color, size, quantity } = req.body;
    
    await connectToDatabase();
    
    let cart = await Cart.findOne({ userId });
    
    if (cart) {
      // Find the index of the item in the cart
      console.log('Cart found:', cart);
      const itemIndex = cart.items.findIndex(item => 
        item.productId === productId && 
        item.color === color && 
        item.size === size
      );

      if (itemIndex > -1) {
        // Update quantity if item exists
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add new item if it doesn't exist
        cart.items.push({ productId, color, size, quantity });
      }
    } else {
      console.log('No cart found, creating new cart');
      // Create a new cart if it doesn't exist
      cart = new Cart({ userId, items: [{ productId, color, size, quantity }] });
      console.log('New cart:', cart);
    }
    console.log('Saving cart...');
    await cart.save();
    console.log('Cart saved:', cart);
    res.status(200).json({ message: 'Item added to cart', cart });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).send('Internal Server Error');
  }
};
