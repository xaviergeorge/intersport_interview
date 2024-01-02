import mongoose, { Document, Schema } from 'mongoose';

interface ICartItem {
  productId: string;
  color: string;
  size: string;
  quantity: number;
}

interface ITrackingHistory {
  code: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  timestamp: Date;
}

interface ICart extends Document {
  userId: string;
  items: ICartItem[];
  currentStatus: 'pending' | 'processing' | 'completed' | 'failed';
  currentTrackingCode?: string;
  trackingHistory: ITrackingHistory[];
  createdAt: Date;
  updatedAt: Date;
}

const cartItemSchema = new Schema<ICartItem>({
  productId: { type: String, required: true },
  color: { type: String, required: true },
  size: { type: String, required: true },
  quantity: { type: Number, required: true }
});

const trackingHistorySchema = new Schema<ITrackingHistory>({
  code: { type: String, required: true },
  status: { type: String, required: true, enum: ['pending', 'processing', 'completed', 'failed'] },
  timestamp: { type: Date, default: Date.now }
});

const cartSchema = new Schema<ICart>({
  userId: { type: String, required: true },
  items: [cartItemSchema],
  currentStatus: { type: String, default: 'pending', enum: ['pending', 'processing', 'completed', 'failed'] },
  currentTrackingCode: String,
  trackingHistory: [trackingHistorySchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Cart = mongoose.model<ICart>('Cart', cartSchema);

export default Cart;
