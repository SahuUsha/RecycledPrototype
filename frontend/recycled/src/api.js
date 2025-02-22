import axios from "axios";
// import e from "cors";


const API_URL = 'http://localhost:8000/api';

export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers:{
        'Content-Type': 'application/json'
    },
});

api.interceptors.request.use((config)=>{
    const token = localStorage.getItem('accessToken');
    console.log('Token from localStorage:', token); 
    if(token){
        config.headers.Authorization = `Bearer ${token}`
        console.log('Authorization header set:', config.headers.Authorization);
    }
    return config;
},
 (error)=>{
    console.log(error)
    return Promise.reject(error)
}
)