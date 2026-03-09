import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://192.168.0.7:8080', 
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('@NekiEvents:token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;