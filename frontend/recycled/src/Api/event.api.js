import axios from "axios";

const API_URL = 'https://recycledprototype.onrender.com/api/event';

const token = localStorage.getItem('accessToken')

console.log("it is token: ",token)
export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,  // Send the token in the Authorization header
    },
});

api.interceptors.request.use((config) => {
    // const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const fetchAllEvent = async () => {
   
    try {
        const response = await api.get('/getallEvent');
        console.log('Events:', response);
        return response
    } catch (error) {
        console.error('Error fetching videos:', error);
    }
};
export const joinEvent = async (eventId) => {
    try {
        const response = await api.post(`/join/${eventId}`);
        console.log("Joined Event Response:", response);
        return response;
    } catch (error) {
        console.error("Error joining event:", error);
        throw error;
    }
};

export const addEvent = async (formData) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("image", formData.image);
  
      const response = await api.post("/addEvent", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log("Added Event Response:", response);
      return response;
    } catch (error) {
      console.error("Error adding event:", error);
      throw error;
    }
  };