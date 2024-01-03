# Intersport Frontend

This project is the frontend of a sample e-commerce website. It provides user authentication, product display, and shopping cart functionality.

## Features

- User Login
- Product Display
- Add to Cart

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Before running the project, ensure you are using the correct version of Node.js as specified in the `.nvmrc` file. It is recommended to use `nvm` (Node Version Manager) to manage and install the correct Node.js version.

- Install `nvm` by following the instructions here: https://github.com/nvm-sh/nvm

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/xaviergeorge/intersport_interview.git
   ```
2. Navigate to the frontend project directory
   ```sh
   cd frontend/intersport-frontend
   ```
3. If you are using `nvm`, ensure you're using the right version of Node.js
   ```sh
   nvm use
   ```
4. Install NPM packages
   ```sh
   npm install
   ```
5. Create a `.env.production` file in the root of the project and specify your API base URL
   ```env
   REACT_APP_API_BASE_URL=<your url here>
   ```

### Running the Project

To run the project in development mode, execute:

```sh
npm start
```

This will start the local server and open the project in your default web browser.

### Building for Production

To build the project for production, run:

```sh
npm run build
```

### Deployment using Firebase

We use Firebase to host and serve our frontend application. Follow these steps to deploy your app using Firebase:

1. **Firebase Login**:

   - Run the command `firebase login` in your terminal.
   - This will open a browser window asking you to log in with your Google account. This step authenticates your Firebase CLI with your Firebase account.

2. **Firebase Initialization**:

   - In your project directory, run `firebase init`.
   - This starts an interactive session for Firebase initialization. You will be asked a series of questions to configure the Firebase services your project will use.
   - For hosting, select 'Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys'.

3. **Build the Project**:

   - Run `npm run build` to create a production build of your project.
   - This compiles your React application into static files in the `build` directory, which are used by Firebase for hosting.

4. **Firebase Deployment**:

   - Deploy your project to Firebase with the `firebase deploy` command.
   - This uploads the static files from the `build` directory to Firebase Hosting.
   - Once deployment is complete, Firebase will provide a URL where your app is hosted.

5. **Update Cloud Functions for CORS Compatibility**:
   - After deployment, Firebase assigns a unique URL to your app.
   - Update this URL in your cloud functions' code to handle CORS (Cross-Origin Resource Sharing) issues. This step ensures your frontend and backend can communicate seamlessly.

Remember to configure your `firebase.json` and `.firebaserc` files to match your project's hosting requirements and directory structure.

## Usage

Use this project as a starting point for your e-commerce platform. Customize and extend it to suit your specific needs and requirements.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Project Link: [https://github.com/xaviergeorge/intersport_interview](https://github.com/xaviergeorge/intersport_interview)

Deployment URL: https://gcp-atlas.web.app/
