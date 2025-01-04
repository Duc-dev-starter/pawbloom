import { Product } from "@/types/product";
import { BaseService } from "./baseService";
import { API } from "@/constants/api";

export const getProducts = async () => {
    const response = await BaseService.get({url: '/products'});
    console.log(response);
    return response;
}
export const createProduct = async (data: Product) => {
    const response = await BaseService.post({url: API.GET_UPDATE_DELETE_PRODUCT, payload: data});
    return response;
}

export const getProduct = async (id: string) => {
    const response = await BaseService.getById({url: API.GET_UPDATE_DELETE_PRODUCT, id});
    return response;
}

export const updateProduct = async (id: string, data: Partial<Product>) => {
    const response = await BaseService.put({url: `${API.GET_UPDATE_DELETE_PRODUCT}/${id}`, payload: data});
    return response;
}

export const deleteProduct = async (id: string) => {
    const response = await BaseService.delete({url: `${API.GET_UPDATE_DELETE_PRODUCT}/${id}`});
    return response;
}