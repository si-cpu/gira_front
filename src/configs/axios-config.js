import axios from "axios";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    console.log("response interceptor 동작함! 응답에 문제가 발생!");
    console.log(error);

    if (error.response.data.message === "NO_LOGIN") {
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      console.log("응답상태 401 발생! 토큰 재발급 필요!");
      originalRequest._retry = true;

      try {
        const id = localStorage.getItem("USER_ID");
        console.log(id);

        const res = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/user/refresh`,
          { id }
        );

        const token = res.data.result.token;
        sessionStorage.setItem("ACCESS_TOKEN", token);
        originalRequest.headers.Authorization = `Bearer ${token}`;
        axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;

        return axiosInstance(originalRequest);
      } catch (e) {
        console.log("rt가 만료됨!");

        return Promise.reject(e);
      }
    }
  }
);

export default axiosInstance;
