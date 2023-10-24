import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3001",
})

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

const login = (username, password) => {
    return axiosInstance.post('/user/login', { username, password })
}

const createProduct = (data) => {
    return axiosInstance.post('/product', data)
}

export {
    login,
    createProduct
}
