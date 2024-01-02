import {  HttpFunction } from '@google-cloud/functions-framework';
import mongoose from 'mongoose';
import Cart from './models/CartModel';

// Assuming MONGO_URI is set in your environment variables
const mongoURI = process.env.MONGO_URI;

interface PubSubMessage {
    userId: string;
    productId: string;
    color: string;
    size: string;
    quantity: number;
    currentTrackingCode: string;
}

// Connect to MongoDB
mongoose.connect(mongoURI);

export const processAddToCart: HttpFunction = async (req, res) => {
    const message: PubSubMessage = req.body.message;
  
  
  if (message) {
    try {
      // Parse the message data

      // Process the message data (e.g., add item to cart)
    //   const cart = await Cart.findOne({ userId: data.userId });

      // Logic to add item to the cart
      // ...

    //   console.log('Item added to cart:', cart);
    } catch (error) {
      console.error('Error processing message:', error);
    }
  }
};
