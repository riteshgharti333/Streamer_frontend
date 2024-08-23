import axios from "axios";

const baseUrl = import.meta.env.VITE_API_KEY;

//GET ALL USER
export const getUsers = () =>{
    return axios.get(`${baseUrl}/user`);
}

//GET SINGLE USER
export const getSingleUser = (id) =>{
    return axios.get(`${baseUrl}/user/${id}`);
}

//DELETE USER
export const deleteSingleUser = (id) =>{
    return axios.delete(`${baseUrl}/user/${id}`);
}
