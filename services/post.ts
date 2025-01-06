import { BaseService } from "./baseService";
import { API } from "@/constants/api";
import { Post } from "@/types/post";

export const getPosts = async() => {
   const response = await BaseService.get({url: '/blogs'});
   return response;
}

export const createPost = async (data: Post) => {
    const response = await BaseService.post({url: API.CREATE_POST, payload: data});
    return response;
}

export const getPost = async (id: string) => {
    const response = await BaseService.getById({url: API.GET_UPDATE_DELETE_POST, id});
    return response;
}

export const updatePost = async (id: string, data: Partial<Post>) => {
    const response = await BaseService.put({url: `${API.GET_UPDATE_DELETE_POST}/${id}`, payload: data});
    return response;
}

export const deletePost = async (id: string) => {
    const response = await BaseService.delete({url: `${API.GET_UPDATE_DELETE_POST}/${id}`});
    return response;
}