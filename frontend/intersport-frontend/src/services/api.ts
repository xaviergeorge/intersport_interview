import axios, { AxiosInstance } from 'axios';

// Define the base URL for the API, using the environment variable if available.
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

/**
 * Create a configured Axios instance for making API requests.
 *
 * @type {AxiosInstance}
 * @name api
 * @description An Axios instance with the base URL set to the API base URL.
 */
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
