# getProducts Google Cloud Function

## Overview

This Google Cloud Function retrieves a list of products from a MongoDB database and provides them in JSON format. Follow the steps below to deploy this function.

## Prerequisites

Before deploying the function, make sure you have the following prerequisites:

- **Google Cloud Account:** You need a Google Cloud account. Sign up [here](https://cloud.google.com/).

- **Google Cloud SDK:** Install the [Google Cloud SDK](https://cloud.google.com/sdk) on your local machine for deploying and managing Google Cloud resources.

- **MongoDB Database:** Ensure you have a MongoDB database set up and have the MongoDB connection URI ready.

## Deployment Steps

Follow these steps to deploy the `getProducts` Google Cloud Function:

1. **Install Dependencies:**

   Install the required Node.js dependencies by running the following command:

   ```bash
   npm install
   ```

2. **Configure Environment Variables:**

   Create a .env file or set environment variables with your MongoDB URI. Create a .env file with the following content:

   ```
   MONGO_URI=<your-mongodb-uri>
   ```

   Replace <your-mongodb-uri> with your actual MongoDB connection URI.

3. **Build and Start the Function Locally (Optional):**
   You can run the function locally for development purposes using the following command:

   ```
    npm start
   ```

   The function will be available at http://localhost:8080.
   Deploy the Function:

4. **Deploy the function using the Google Cloud SDK:**

   ```
   gcloud functions deploy getProducts \
   --runtime nodejs20 \
   --trigger-http \
   --entry-point getProducts \
   --set-env-vars MONGO_URI=<your-mongodb-uri>
   ```

   Replace <your-mongodb-uri> with your actual MongoDB connection URI.

##Usage
After deployment, the getProducts function will be accessible via an HTTP endpoint provided by Google Cloud. You can retrieve the list of products by making a GET request to this endpoint.

### Additional Notes

- **Data Validity:** Ensure that you provide valid data in your GET requests to the `getProducts` function.

- **Security:** Secure your MongoDB database and function endpoints as per your application's security requirements.

- **Security Best Practices:** Follow best practices for securing sensitive information, including environment variables and API keys.

- **Monitoring:** To monitor your deployed function and view logs, you can use Google Cloud Console.

- **CORS Configuration:** If you plan to access this function from a different domain, you might need to configure Cross-Origin Resource Sharing (CORS) settings. You can make adjustments in the function code by modifying the `setCORSHeaders` function.
