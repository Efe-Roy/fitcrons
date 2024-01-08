import axios from "axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const URL =
  process.env.NODE_ENV === "production"
    ? ""
    : "http://127.0.0.1:8000";

// console.log(URL);\

const API = axios.create({ baseURL: `${URL}` });

API.interceptors.request.use((req) => {
  if (Cookies.get("userDataFit")) {
    req.headers.Authorization = `Token  ${
      JSON.parse(Cookies.get("userDataFit")).token
    }`;
  }
  return req;
});

export default API
