// src/functions/authFunction.ts

import { HttpFunction } from '@google-cloud/functions-framework';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './models/UserModel'; // Import your User model
import * as dotenv from 'dotenv';

if (process.env.MONOGO_URI === undefined) {
    dotenv.config();
}

// MongoDB URI
const mongoURI = process.env.MONGO_URI || 'your-mongodb-uri';

// Connect to MongoDB
const connectToDatabase = async () => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(mongoURI);
    }
};

const setCORSHeaders = (req, res) => {
    const allowedOrigins = ['http://localhost:3000', 'https://your-production-url.com'];
    const origin = req.headers.origin;
  
    if (allowedOrigins.includes(origin)) {
      res.set('Access-Control-Allow-Origin', origin);
    } else {
      // Optionally set a default origin, or omit the header
      // res.set('Access-Control-Allow-Origin', 'your-default-origin');
    }
  
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.set('Access-Control-Allow-Credentials', 'true');
};

export const auth: HttpFunction = async (req, res) => {
    await connectToDatabase();
    setCORSHeaders(req, res);

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.status(204).send('');
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Method Not Allowed' });
        return;
    }


    // Set CORS headers
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    try {
        const path = req.path.toLowerCase();

        if (path.includes("/login")) {
            await loginUser(req, res);
        } else if (path.includes("/signup")) {
            await signupUser(req, res);
        } else {
            res.status(404).send({ message: 'Not Found' });
        }
    } catch (error) {
        console.error('Auth error:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    // Find user by username
    const user = await User.findOne({ username: username.trim() });
    if (!user) {
        return res.status(401).send({ message: 'Invalid username ' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        console.log('Password does not match');
        return res.status(401).send({ message: 'Invalid username or password' });
    }
    console.log('Password matches');
    //send back user without password
    user.password = undefined;
    // TODO: Generate and send a token or session confirmation
    res.status(200).json({ message: 'Login successful', user });
};

const signupUser = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send({ message: 'Method Not Allowed' });
    }

    const { username, password, fullName } = req.body;
    

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(409).send({ message: 'Username already in use' });
    }


    // Create new user
    console.log('Creating new user');
    const newUser = new User({ username, password, fullName });
    console.log('Saving new user');
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
};
