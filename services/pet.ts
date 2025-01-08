import { BaseService } from "./baseService";
import { API } from "@/constants/api";
import { Pet } from "@/types/pet";

export const getPets = async () => {
    const response = await BaseService.get({url: API.GET_PETS});
    console.log(response);
    return response;
}
export const createPet = async (data: Pet) => {
    const response = await BaseService.post({url: API.CREATE_PET, payload: data});
    return response;
}

export const getPet = async (id: string) => {
    const response = await BaseService.getById({url: API.GET_UPDATE_DELETE_PET, id});
    return response;
}

export const updatePet = async (id: string, data: Partial<Pet>) => {
    const response = await BaseService.put({url: `${API.GET_UPDATE_DELETE_PET}/${id}`, payload: data});
    return response;
}

export const deletePet = async (id: string) => {
    const response = await BaseService.delete({url: `${API.GET_UPDATE_DELETE_PET}/${id}`});
    return response;
}