import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000'
});

export default {
  getManufacturers: (filters = {}) => apiClient.get('/manufacturers', { 
params: filters }),
  getProducts: (filters = {}) => apiClient.get('/products', { params: 
filters })
};
