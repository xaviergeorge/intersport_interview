import mongoose, { Document, Schema } from 'mongoose';

interface IProductSize {
  size: string;
  stock: number;
}

interface IProductOption {
  color: string;
  image_url: string;  // URL for the color variant
  sizes: IProductSize[];  // Array of sizes
}

interface IProduct extends Document {
  title: string;
  description: string;
  basePrice: number;  // Base price of the product
  options: IProductOption[];
}

const ProductSizeSchema: Schema = new Schema({
  size: { type: String, required: true },
  stock: { type: Number, required: true }
});

const ProductOptionSchema: Schema = new Schema({
  color: { type: String, required: true },
  image_url: { type: String, required: true },
  sizes: [ProductSizeSchema]  // Define sizes as an array of ProductSizeSchema
});

const ProductSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  basePrice: { type: Number, required: true },
  options: [ProductOptionSchema]
});


const Product = mongoose.model<IProduct>('product', ProductSchema);


export default Product;