/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseService } from "./baseService";
import { API } from "@/constants/api";

export const getApplications = async () => {
    const response = await BaseService.get({ url: API.GET_APPLICATIONS });
    console.log(response);
    return response;
}

export const getApplicationsByFoster = async () => {
    const response = await BaseService.get({ url: API.GET_APPLICATIONS_BY_FOSTER });
    console.log(response);
    return response;
}
export const createOrder = async (data: any) => {
    const response = await BaseService.post({ url: API.CREATE_ORDER, payload: data });
    return response;
}


