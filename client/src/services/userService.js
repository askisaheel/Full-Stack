import axios from 'axios'

const API_URL = process.env.REACT_APP_API_BASE_URL + '/users'

export const register = (data) => axios.post(`${API_URL}/register`, data)
export const login = (data) => axios.post(`${API_URL}/login`, data)
