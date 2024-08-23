import axios from "axios";

const baseUrl = import.meta.env.VITE_API_KEY;

//GET ALL LISTS
export const getLists = () => {
    return axios.get(`${baseUrl}/list`);
  };

//GET QUERY LITS
export const getQueryLists = (query) => {
    return axios.get(`${baseUrl}/list?type=${query}`);
  };

//GET SINGLE LIST
export const getSingleList = (id) => {
    return axios.get(`${baseUrl}/list/${id}`);
  };

