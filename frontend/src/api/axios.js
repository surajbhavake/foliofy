import axios from 'axios'

const api = axios.create({
    baseURL : import.meta.env.VITE_API_URL ||'https://localhost:8000/api',
})

api.interceptors.request.use((config)=>{
    const token = localStorage.getItem('access_token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
});

api.interceptors.response.use(
    (response)=> response,
    async(error)=>{
        const originalRequest = error.config;

        if(error.response?.staus === 401 && !originalRequest._retry){
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refresh_token');

            if(refreshToken){
                try {
                    // {data} = we write it so we can acces whatever is inside that easily 
                    const {data} = await axios.post(`${api.defaults.baseURL}/token/refresh`,{refresh : refreshToken}); //axios.post(URL,DATA) so that's why we wrote refresh
                    localStorage.setItem('access_token',data.access);
                    api.defaults.headers.Authorization = `Bearer ${data.access}`
                    originalRequest.headers.Authorization = `Bearer ${data.access}`
                    return api(originalRequest);

                } catch (refreshError) {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    window.location.href = '/login';
                    return Promise.reject(refreshError)
                }
            }
        }

        return Promise.reject(error)
    }
)