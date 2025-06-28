import axios from 'axios'

const API_URL = process.env.REACT_APP_API_BASE_URL + '/products'

export const getProducts = () => axios.get(API_URL)
export const getProductById = (id) => axios.get(`${API_URL}/${id}`)
export const createProduct = (data) => axios.post(API_URL, data)
export const updateProduct = (id, data) => axios.put(`${API_URL}/${id}`, data)
export const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`)
