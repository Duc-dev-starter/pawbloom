import { HttpStatus } from "@/enum/https";
// import Path from "@/constants/paths";
import axios from "axios";

import { config } from "@/config";
import { toastService } from "@/utils";

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
          case HttpStatus.Unauthorized:
          case HttpStatus.Forbidden: {
            if (!isTokenExpired) {
              isTokenExpired = true
              //toast.error(data.message);
              //   setTimeout(() => {
              //     if (user) {
              //       window.location.href = PATHS.HOME
              //     } else {
              //       return;
              //     }
              //     localStorage.clear();
              //     isTokenExpired = false;
              //   }, 1300);
            }
            break;
          }

          case HttpStatus.NotFound:
            // toast.error(data.message || data.Message);
            //     switch(user.role){
            //       case "member":
            //         window.location.href = Path.NOTFOUND;
            //         break;
            //       case "admin":
            //         window.location.href = '/admin/404';
            //         break;

            //       case "staff":
            //         window.location.href = "/staff/404";
            //         break;
            //       default:
            //         window.location.href = Path.HOME;
            //         break;
            //     }
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