import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// api without jwt bearer auth token for admin login
const api_a = process.env.REACT_APP_PARENT_API

// api with jwt bearer auth token for admin actions
const api_b = axios.create({ baseURL: process.env.REACT_APP_PARENT_API })
api_b.interceptors.request.use((req) => {
    if(localStorage.getItem('admin')){
        req.headers.Authorization = `Bearer ${localStorage.getItem('admin')}`;
    }
    return req;
})

// admin sign in
export const adminSignIn = async(credentials) => {
    try {
        const { data } = await axios.post(`${api_a}/admin-sign-in`, credentials);
        return data;
    } catch (error) {
        return error.response.data;
    }
}

// admin actions
export const addNewUser = async(details) => {
    try {
        const { data } = await api_b.post(`/add-new-user`, details);
        return data;
    } catch (error) {
        return error.response.data;
    }
}

export const deleteUser = async(details) => {
    try {
        const { data } = await api_b.post(`/delete-user`, details);
        return data;
    } catch (error) {
        return error.response.data;
    }
}

export const getAllUsers = async() => {
    try {
        const { data } = await api_b.post(`/get-users`);
        return data;
    } catch (error) {
        return error.response
    }
}

// misc. function

export const isEmailCorrect = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const isUsernameCorrect = (username) => {
    const re = /^[a-zA-Z0-9]+$/;
    return re.test(username)
}