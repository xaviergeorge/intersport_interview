import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

// Define an interface for the User document.
interface IUser extends Document {
  username: string;
  password: string;
  fullName: string;
}

// Mongoose schema definition for the User model.
const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
});

/**
 * Middleware function to hash the user's password before saving.
 * @function
 * @param {Function} next - The next function to continue the middleware chain.
 * @returns {void}
 */
UserSchema.pre('save', async function (next) {
  const user = this as IUser;

  // Check if the password is being modified before hashing.
  if (!user.isModified('password')) return next();

  console.log('Hashing password...');

  // Generate a salt and hash the password.
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(user.password, salt);

  // Set the hashed password in the document.
  user.password = hash;
  next();
});

// Create a Mongoose model for the User using the defined interfaces and schema.
const User = mongoose.model<IUser>('User', UserSchema);

// Export the User model for use in other parts of the application.
export default User;
