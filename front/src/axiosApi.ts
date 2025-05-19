import axios from 'axios';
import { apiUrl } from './GlobalConstants';

const axiosApi = axios.create({
  baseURL: apiUrl,
});

export default axiosApi;
