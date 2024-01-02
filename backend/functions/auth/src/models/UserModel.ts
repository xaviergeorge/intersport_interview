// src/models/UserModel.ts

import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';


interface IUser extends Document {
  username: string;
  password: string;
  fullName: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
    const user = this as IUser;
    if (!user.isModified('password')) return next();
    console.log('Hashing password...');
    console.log("user", user);
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  });

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
