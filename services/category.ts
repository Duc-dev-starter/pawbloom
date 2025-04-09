import { Product } from "@/types/product";
import { BaseService } from "./baseService";
import { API } from "@/constants/api";
import { Category } from "@/types/category";

export const getCategories = async () => {
    const response = await BaseService.get({ url: API.GET_CATEGORIES });
    return response;
}

export const createCategory = async (data: Category) => {
    const response = await BaseService.post({ url: API.CREATE_CATEGORY, payload: data });
    return response;
}

export const getCategory = async (id: string) => {
    const response = await BaseService.getById({ url: API.GET_UPDATE_DELETE_CATEGORY, id });
    return response;
}

export const updateCategory = async (id: string, data: Partial<Category>) => {
    const response = await BaseService.put({ url: `${API.GET_UPDATE_DELETE_CATEGORY}/${id}`, payload: data });
    return response;
}

export const deleteCategory = async (id: string) => {
    const response = await BaseService.delete({ url: `${API.GET_UPDATE_DELETE_CATEGORY}/${id}` });
    return response;
}