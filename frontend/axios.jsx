import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/api', // Adjust your API base URL
});

// Add a request interceptor to attach the token to requests
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
