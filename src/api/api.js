import axios from 'axios'

const API = axios.create({
    baseURL: "https://uniquefitness.onrender.com/api/v1",
});

API.interceptors.request.use((req) =>{
    const token = localStorage.getItem("token")
    if(token) {
        req.headers.Authorization = `Bearer ${token}`
    } 

    return req;
})

export const loginUser = (FormData) => API.post("/user/login", FormData)

export default API