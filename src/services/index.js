import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3001",
})

const login = (username, password) => {
    return axiosInstance.post('/user/login', { username, password })
}

export {
    login
}
