import mongoose, { Document, Schema } from 'mongoose';

/**
 * Represents a size variant of a product.
 *
 * @typedef {Object} IProductSize
 * @property {string} size - The size of the product variant (required).
 * @property {number} stock - The available stock quantity for this size variant (required).
 */
interface IProductSize {
  size: string;
  stock: number;
}

/**
 * Represents an option variant of a product, such as color and available sizes.
 *
 * @typedef {Object} IProductOption
 * @property {string} color - The color variant of the product (required).
 * @property {string} image_url - The URL for the color variant's image (required).
 * @property {IProductSize[]} sizes - An array of available sizes for this option variant.
 */
interface IProductOption {
  color: string;
  image_url: string;
  sizes: IProductSize[];
}

/**
 * Represents a product in the database.
 *
 * @typedef {Document} IProduct
 * @property {string} title - The title of the product (required).
 * @property {string} description - The description of the product (required).
 * @property {number} basePrice - The base price of the product (required).
 * @property {IProductOption[]} options - An array of available option variants for the product.
 */
interface IProduct extends Document {
  title: string;
  description: string;
  basePrice: number;
  options: IProductOption[];
}

// Define the schema for a product size variant.
const ProductSizeSchema: Schema = new Schema({
  size: { type: String, required: true },
  stock: { type: Number, required: true }
});

// Define the schema for a product option variant.
const ProductOptionSchema: Schema = new Schema({
  color: { type: String, required: true },
  image_url: { type: String, required: true },
  sizes: [ProductSizeSchema] // Define sizes as an array of ProductSizeSchema.
});

// Define the schema for a product.
const ProductSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  basePrice: { type: Number, required: true },
  options: [ProductOptionSchema]
});

// Create a Mongoose model for the Product using the defined interfaces and schema.
const Product = mongoose.model<IProduct>('product', ProductSchema);

export default Product;
