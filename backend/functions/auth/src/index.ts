import { HttpFunction } from '@google-cloud/functions-framework';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './models/UserModel';
import * as dotenv from 'dotenv';

// Load environment variables from a .env file if MONGO_URI is undefined.
if (process.env.MONOGO_URI === undefined) {
    dotenv.config();
}

// MongoDB URI
const mongoURI = process.env.MONGO_URI || 'your-mongodb-uri';

// Function to connect to the MongoDB database asynchronously.
const connectToDatabase = async () => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(mongoURI);
    }
};

// Function to set CORS (Cross-Origin Resource Sharing) headers.
const setCORSHeaders = (req, res) => {
    const allowedOrigins = ['http://localhost:3000', 'https://gcp-atlas.web.app'];
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.set('Access-Control-Allow-Origin', origin);
    }

    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.set('Access-Control-Allow-Credentials', 'true');
};

/**
 * HTTP Function for user authentication (login and signup).
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @returns {void}
 */
export const auth: HttpFunction = async (req, res) => {
    

    // Set CORS headers for cross-origin requests.
    setCORSHeaders(req, res);

    // Handle OPTIONS request for preflight checks.
    if (req.method === 'OPTIONS') {
        // Send a successful response for OPTIONS requests.
        res.status(204).send('');
        return;
    }

    // Check if only POST requests are allowed.
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Method Not Allowed' });
        return;
    }

    try {
        const path = req.path.toLowerCase();

        // Determine whether it's a login or signup request.
        if (path.includes("/login")) {
            await loginUser(req, res);
        } else if (path.includes("/signup")) {
            await signupUser(req, res);
        } else {
            // Handle unsupported routes with a 404 response.
            res.status(404).send({ message: 'Not Found' });
        }
    } catch (error) {
        // Handle errors and send an internal server error response.
        console.error('Auth error:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

/**
 * Function to handle user login.
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @returns {void}
 */
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    // validate the request body first
    if (!username || !password) {
        // If the username or password is missing, send a 400 Bad Request response.
        return res.status(400).send({ message: 'Missing username or password' });
    }
    // Connect to the MongoDB database.
    await connectToDatabase();

    // Find user by username in the database.
    const user = await User.findOne({ username: username.trim() });

    if (!user) {
        // If the user does not exist, send a 401 Unauthorized response.
        return res.status(401).send({ message: 'Invalid username ' });
    }

    // Compare the provided password with the hashed password in the database.
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        // If the password does not match, send a 401 Unauthorized response.
        return res.status(401).send({ message: 'Invalid username or password' });
    }

    // Remove the password field from the user object before sending it in the response.
    user.password = undefined;

    // TODO: Generate and send a token or session confirmation for successful login.

    // Send a successful response with the user information.
    res.status(200).json({ message: 'Login successful', user });
};

/**
 * Function to handle user signup.
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @returns {void}
 */
const signupUser = async (req, res) => {
    if (req.method !== 'POST') {
        // Send a 405 Method Not Allowed response for non-POST requests.
        return res.status(405).send({ message: 'Method Not Allowed' });
    }

    const { username, password, fullName } = req.body;
    // validate the request body first
    if (!username || !password || !fullName) {
        // If the username, password, or fullName is missing, send a 400 Bad Request response.
        return res.status(400).send({ message: 'Missing username, password, or fullName' });
    }

    // Connect to the MongoDB database.
    await connectToDatabase();

    // Check if a user with the same username already exists in the database.
    const existingUser = await User.findOne({ username });

    if (existingUser) {
        // If a user with the same username exists, send a 409 Conflict response.
        return res.status(409).send({ message: 'Username already in use' });
    }

    // Create a new user object and save it to the database.
    console.log('Creating new user');
    const newUser = new User({ username, password, fullName });
    console.log('Saving new user');
    await newUser.save();

    // Send a 201 Created response with the newly created user information.
    res.status(201).json({ message: 'User created successfully', user: newUser });
};
