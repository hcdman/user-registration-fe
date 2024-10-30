import axios from "axios";

const AxiosClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        scheme: 'https'
    }
});

export default AxiosClient;