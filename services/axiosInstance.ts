import { HttpStatus } from "@/enum/https";
// import Path from "@/constants/paths";
import axios from "axios";

import { config } from "@/config";
import { toastService } from "@/utils";
import Path from "@/constants/paths";

export const axiosInstance = axios.create({
  baseURL: config.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 300000,
  timeoutErrorMessage: `Connection is timeout exceeded`
})

let isTokenExpired = false;
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
      console.log("Setting Content-Type to multipart/form-data");
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(response);
    if (response.status === HttpStatus.Success || response.status === HttpStatus.Created) {
      return response.data;
    }
  },
  (error) => {
    if (error.response) {
      const { data } = error.response;
      console.log(error.response);
      if (data.errors && data.errors.length > 0) {
        data.errors.forEach((error: { field: string, message: string[] }) => {
          const errorMessage = error.message.join(', ');
          toastService.show({
            variant: "destructive",
            title: "Hệ thống gặp trục trặc",
            description: `${error.field}: ${errorMessage}`,
          })
          console.log(errorMessage);
        });
      }

      else {
        console.log('o day')
        switch (error.response.status || error.status) {
          case HttpStatus.Unauthorized: {
            if (!isTokenExpired) {
              isTokenExpired = true
              toastService.show({
                variant: "destructive",
                title: "Lỗi xác thực",
                description: `${data.message || data.Message}`,
              })
              setTimeout(() => {
                // window.location.href = Path.HOME
                localStorage.clear();
                isTokenExpired = false;
              }, 1300);
            }
            break;
          }

          case HttpStatus.NotFound:
            toastService.show({
              variant: "destructive",
              title: "Không tìm thấy",
              description: `${data.message || data.Message}`,
            })
            setTimeout(() => {
              window.location.href = '/not-found'
            }, 1300);
            break;

          case HttpStatus.InternalServerError:
            console.log('o day 500')
            toastService.show({
              variant: "destructive",
              title: "Hệ thống gặp trục trặc",
              description: `${data.message || data.Message}`,
            })
            // window.location.href = Path.INTERNAL_SERVER_ERROR;
            break;

          default:
            toastService.show({
              variant: "destructive",
              title: "Hệ thống gặp trục trặc",
              description: `${data.message || data.Message}`,
            })
            break;
        }
      }

      return Promise.reject(error.response.data);
    } else {
      //toast.error('Network error');
      return Promise.reject(error);
    }
  }
);