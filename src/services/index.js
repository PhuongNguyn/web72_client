import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://web72.onrender.com",
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

const getProduct = (pageSize = 3, pageIndex = 1) => {
    return axiosInstance.get(`/product/get-paging?pageSize=${pageSize}&pageIndex=${pageIndex}`)
}

const getProductById = (productId) => {
    return axiosInstance.get(`/product/${productId}`)
}

const updateProduct = (id, data) => {
    return axiosInstance.put(`/product/${id}`, data)
}

const deleteProduct = (id) => {
    return axiosInstance.delete(`/product/${id}`)
}

export {
    login,
    createProduct,
    getProduct,
    getProductById,
    updateProduct,
    deleteProduct
}
