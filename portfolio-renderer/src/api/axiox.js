import axios from 'axios';


const api = axios.create({
    baseURL: '/api/public',
})

export default api;