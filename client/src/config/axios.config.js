import axios from "axios";

const customAxios = axios.create({
    baseUrl: process.env.SERVER_BASE_URL,
    timeout:10000,
});

export default customAxios;