import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface representing an individual item in the cart.
 * @interface
 */
interface ICartItem {
  productId: string;
  color: string;
  size: string;
  quantity: number;
}

/**
 * Interface representing the entire shopping cart.
 * @interface
 * @extends Document
 */

interface ICart extends Document {
  userId: string;
  items: ICartItem[];
}

/**
 * Schema definition for an individual cart item.
 * @constant
 */
const CartItemSchema: Schema = new Schema({
  productId: { type: String, required: true },
  color: { type: String, required: true },
  size: { type: String, required: true },
  quantity: { type: Number, required: true },
});

/**
 * Schema definition for the entire shopping cart, including an array of cart items.
 * @constant
 */
const CartSchema: Schema = new Schema({
  userId: { type: String, required: true },
  items: [CartItemSchema],
});

/**
 * Mongoose model for the shopping cart.
 * @constant
 */
const Cart = mongoose.model<ICart>('Cart', CartSchema);

export default Cart;
