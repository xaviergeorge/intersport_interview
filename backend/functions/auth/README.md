# Auth Google Cloud Function

## Overview

This Google Cloud Function provides user authentication functionality, including login and signup. It connects to a MongoDB database for user management. Follow the steps below to deploy this function.

## Prerequisites

Before deploying the function, make sure you have the following prerequisites:

- **Google Cloud Account:** You need a Google Cloud account. Sign up [here](https://cloud.google.com/).

- **Google Cloud SDK:** Install the [Google Cloud SDK](https://cloud.google.com/sdk) on your local machine for deploying and managing Google Cloud resources.

- **MongoDB Database:** Ensure you have a MongoDB database set up and have the MongoDB connection URI ready.

## Deployment Steps

Follow these steps to deploy the `auth` Google Cloud Function:

1. **Install Dependencies:**

   Install the required Node.js dependencies by running the following command:

   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Create a .env file or set environment variables with your MongoDB URI. Create a .env file with the following content:

   ```makefile
   MONGO_URI=<your-mongodb-uri>
   ```

   Replace <your-mongodb-uri> with your actual MongoDB connection URI.

3. **Build and Start the Function Locally (Optional):**

   You can run the function locally for development purposes using the following command:

   ```bash
   npm start
   ```

   The function will be available at http://localhost:8080.

4. **Running test cases:**

   You can run tests by running

   ```
   npm run test
   ```

5. **Deploy the Function:**

   Deploy the function using the Google Cloud SDK:

   ```bash
   gcloud functions deploy auth \
   --runtime nodejs20 \
   --trigger-http \
   --entry-point auth \
   --set-env-vars MONGO_URI=<your-mongodb-uri>
   Replace <your-mongodb-uri> with your actual MongoDB connection URI.
   ```

## Usage

After deployment, the `auth` function will be accessible via an HTTP endpoint provided by Google Cloud. You can use it for user authentication, including login and signup.

## Additional Notes

- **Data Validity:** Ensure that you provide valid data in your requests to the `auth` function.

- **Security:** Secure your MongoDB database and function endpoints according to your application's security requirements.

- **Security Best Practices:** Follow best practices for securing sensitive information, including environment variables and API keys.

- **Monitoring:** To monitor your deployed function and view logs, you can use Google Cloud Console.

- **CORS Configuration:** If you plan to access this function from a different domain, you might need to configure Cross-Origin Resource Sharing (CORS) settings. You can make adjustments in the function code by modifying the `setCORSHeaders` function.
