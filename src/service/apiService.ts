import axios from "axios";
import { baseURL } from "../constant";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const accessToken = localStorage.getItem("access");
const refreshToken = localStorage.getItem("refresh");
// const refreshAccessToken = async () => {
//   try {
//     const refresh_token = cookies.get("refresh");
//     const response = await axios.post(`${baseURL}/auth/refresh/`, {
//       refresh: refresh_token,
//     });

//     cookies.set("access", response.data.access);
//     cookies.set("refresh", response.data.refresh);
//     return response.data.access;
//   } catch (error) {
//     throw error;
//   }
// };

export const apiService = axios.create({
  baseURL,

  headers: {
    accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
});

export const imageService = axios.create({
  baseURL,

  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${accessToken}`,
  },
});



export const authApiSerivice = axios.create({
  baseURL,
  headers: {
    accept: "application/json",
  },
});
export const mediaApiSerivice = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// apiService.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const access_token = await refreshAccessToken();
//         apiService.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${access_token}`;
//         originalRequest.headers["Authorization"] = `Bearer ${access_token}`;
//         return apiService(originalRequest);
//       } catch (error) {
//         originalRequest._retry = false;
//         window.location.href = "/auth";
//         throw error;
//       }
//     }
//     return Promise.reject(error);
//   }
// );
