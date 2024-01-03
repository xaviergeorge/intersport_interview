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

This will compile the React application and output the production-ready files in the `build` directory.

## Usage

Use this project as a starting point for your e-commerce platform. Customize and extend it to suit your specific needs and requirements.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Project Link: [https://github.com/xaviergeorge/intersport_interview](https://github.com/xaviergeorge/intersport_interview)
