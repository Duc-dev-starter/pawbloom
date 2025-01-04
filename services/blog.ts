import { Blog } from "@/types/blog";
import { BaseService } from "./baseService";
import { API } from "@/constants/api";

export const getBlogs = async() => {
   const response = await BaseService.get({url: '/blogs'});
   return response;
}

export const createCategory = async (data: Blog) => {
    const response = await BaseService.post({url: API.CREATE_BLOG, payload: data});
    return response;
}

export const getCategory = async (id: string) => {
    const response = await BaseService.getById({url: API.GET_UPDATE_DELETE_BLOG, id});
    return response;
}

export const updateCategory = async (id: string, data: Partial<Blog>) => {
    const response = await BaseService.put({url: `${API.GET_UPDATE_DELETE_BLOG}/${id}`, payload: data});
    return response;
}

export const deleteCategory = async (id: string) => {
    const response = await BaseService.delete({url: `${API.GET_UPDATE_DELETE_BLOG}/${id}`});
    return response;
}