import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost/loop_backend/api'
});

export default api;