// src/models/CartModel.ts

import mongoose, { Schema, Document } from 'mongoose';

interface ICartItem {
  productId: string;
  color: string;
  size: string;
  quantity: number;
}

interface ICart extends Document {
  userId: string;
  items: ICartItem[];
}

const CartItemSchema: Schema = new Schema({
  productId: { type: String, required: true },
  color: { type: String, required: true },
  size: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const CartSchema: Schema = new Schema({
  userId: { type: String, required: true },
  items: [CartItemSchema],
});

const Cart = mongoose.model<ICart>('Cart', CartSchema);

export default Cart;
