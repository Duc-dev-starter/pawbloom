import { BaseService } from "./baseService";
import { API } from "@/constants/api";
import { User } from "@/types/user";

export const getUsers = async () => {
    const response = await BaseService.get({ url: API.GET_USERS });
    console.log(response);
    return response;
}

export const getUser = async (id: string) => {
    const response = await BaseService.getById({ url: API.GET_UPDATE_DELETE_USER, id });
    return response;
}

export const updateUser = async (id: string, data: Partial<User>) => {
    const response = await BaseService.put({ url: `${API.GET_UPDATE_DELETE_USER}/${id}`, payload: data });
    return response;
}

export const deleteUser = async (id: string) => {
    const response = await BaseService.delete({ url: `${API.GET_UPDATE_DELETE_USER}/${id}` });
    return response;
}

export const getCurrentUser = async () => {
    const response = await BaseService.get({ url: `${API.GET_CURRENT_USER}` });
    return response;
}
