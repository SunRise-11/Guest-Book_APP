import axios from "axios";
import { isExpired } from "react-jwt";

import tokenHandler from "./tokenHandler";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = tokenHandler.getLocalAccessToken();
    const refreshToken = tokenHandler.getLocalRefreshToken();
    if (accessToken && refreshToken && config && config.headers) {
      if (isExpired(accessToken)) {
        config.headers["Authorization"] = "Bearer " + refreshToken;
      } else {
        config.headers["Authorization"] = "Bearer " + accessToken;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (
      originalConfig &&
      originalConfig.url !== "/auth/login" &&
      err.response
    ) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await instance.get("/auth/refresh", originalConfig);
          const { access_token } = rs.data;
          console.log(rs.data);
          tokenHandler.updateLocalAccessToken(access_token);
          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);
export default instance;
