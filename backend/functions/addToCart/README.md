# addToCart Google Cloud Function

## Overview

This is a Google Cloud Function that allows users to add items to their shopping cart. It connects to a MongoDB database to store cart information. Below are the steps to deploy this function.

## Prerequisites

Before deploying the function, ensure you have the following prerequisites:

- **Google Cloud Account:** You need a Google Cloud account. You can sign up [here](https://cloud.google.com/).

- **Google Cloud SDK:** Install the [Google Cloud SDK](https://cloud.google.com/sdk) on your local machine. This is used to deploy and manage Google Cloud resources.

- **MongoDB Database:** You should have a MongoDB database set up to store cart information. Make sure you have the MongoDB connection URI ready.

## Deployment Steps

1. **Install Dependencies:**

   Install the required Node.js dependencies by running the following command:

   ```bash
   npm install
   ```

2. **Configure Environment Variables:**

   Create a `.env` file or set environment variables with your MongoDB URI. You can create a `.env` file with the following content:
   MONGO_URI=<your-mongodb-uri>

   Replace `<your-mongodb-uri>` with your actual MongoDB connection URI.

3. **Build and Start the Function Locally (Optional):**

   You can run the function locally for development purposes by using the following command:

   ```bash
   npm start
   ```

   The function will be available at http://localhost:8080.

4. **Deploy the Function:**

   Use the Google Cloud SDK to deploy the function:

   ```
       gcloud functions deploy addToCart
       --runtime nodejs20
       --trigger-http
       --entry-point addToCart
       --set-env-vars MONGO_URI=<your-mongodb-uri>
   ```

   Replace `<your-mongodb-uri>` with your actual MongoDB connection URI.

5. **Testing:**

   After deployment, the function will be accessible via an HTTP endpoint provided by Google Cloud. You can test it by making POST requests to this endpoint.

6. **Usage:**

   The `addToCart` function accepts POST requests with the following JSON data:

   ```json
   {
     "userId": "user123",
     "productId": "product123",
     "color": "blue",
     "size": "medium",
     "quantity": 2
   }
   ```

**Additional Notes:**

- **Security Best Practices:** Always adhere to best practices for securing sensitive information, including environment variables and API keys.

- **Monitoring:** You can monitor your deployed function and access logs using the Google Cloud Console.

- **CORS Configuration:** If you plan to access this function from a different domain, you might need to configure Cross-Origin Resource Sharing (CORS) settings. You can make adjustments in the function code by modifying the `setCORSHeaders` function.
