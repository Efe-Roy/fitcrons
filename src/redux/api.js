import axios from "axios";

// const URL =
//   process.env.NODE_ENV === "production"
//     ? import.meta.env.VITE_BACKEND_URL
//     : "http://127.0.0.1:8000";
const URL =
  process.env.NODE_ENV === "production"
    ? ""
    : "http://127.0.0.1:8000";

// console.log(URL);

const API = axios.create({ baseURL: `${URL}` });

// API.interceptors.request.use((req) => {
//     if (localStorage.getItem("profile")) {
//       req.headers.Authorization = `Token  ${
//         JSON.parse(localStorage.getItem("profile")).token
//       }`;
//     }
//     return req;
//   });

export default API
