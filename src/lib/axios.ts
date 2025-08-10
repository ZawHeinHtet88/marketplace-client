import { useAuthStore } from "@/modules/auth/store/index.store";
import axios from "axios";
import { toast } from "sonner";

export const API_BASE_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  // timeout: 10000, // 10s timeout
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

// Request Interceptor (Attach Token)
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (Handle Errors)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response) {
    //   if (error.response.status === 401) {
    //     useAuthStore.getState().logout(); // Auto logout on 401
    //     window.location.href = "/login";
    //   }
    // }
    if (error) {
      toast.error(error.response.data.message);
    } else {
      toast.error("error occur");
    }

    return Promise.reject(error);
  }
);
