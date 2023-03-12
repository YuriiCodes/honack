import axios from 'axios';
import LocalStorageService from "../services/LocalStorageService";
export const API_URL = `${process.env.NX_API_URL}`;

const $api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to add the access token to the header
$api.interceptors.request.use((config) => {
  const accessToken = LocalStorageService.getToken();

  /* eslint-disable */
  config.headers!.Authorization = `Bearer ${accessToken}`;
  return config;
});

export default $api;
