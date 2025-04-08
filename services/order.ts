/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseService } from "./baseService";
import { API } from "@/constants/api";

export const getApplications = async () => {
    const response = await BaseService.get({ url: API.GET_APPLICATIONS });
    console.log(response);
    return response;
}

export const createOrder = async (data: any) => {
    const response = await BaseService.post({ url: API.CREATE_ORDER, payload: data });
    return response;
}


export const cancelOrder = async (orderId: string) => {
    const response = await BaseService.put({ url: `${API.CREATE_ORDER}/${orderId}` });
    return response;
}

