import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/v1";

const api = axios.create({
    baseURL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

export default api;
