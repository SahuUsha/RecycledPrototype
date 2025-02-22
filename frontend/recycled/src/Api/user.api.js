import { api } from "../api.js";

export const loginUser=async(data)=>{
    try {
        const response = await api.post('/users/login',data)
        return response.data;
    } catch (error) {
        console.log(error)
        throw error.response?.data || error
    }
};


export const getUserDetails = async () => {
    try {
        const response = await api.get('/users/dashboard');
        return response.data;
    } catch (error) {
        console.error("Error fetching user details:", error);
        throw error.response?.data || error;
    }
};