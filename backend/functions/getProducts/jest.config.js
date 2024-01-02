// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  // If you have tests in other than `__tests__` directory, adjust the below line
  testMatch: ["**/src/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
};
