import axios, { AxiosInstance, AxiosResponse } from "axios";
import LocalStorage from "../helpers/localstorage2.helper";
import { authentificator } from "../store/auth2.store";

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
}

const instance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_ORIGIN,
  headers: DEFAULT_HEADERS,
});

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshResult = await authentificator.refresh();

      if (refreshResult === 0) {
        originalRequest.headers.Authorization = `Bearer ${LocalStorage.get("at")}`;
        return instance(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
