/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseService } from "./baseService";
import { API } from "@/constants/api";
import { Pet } from "@/types/pet";
import { axiosInstance } from "./axiosInstance";

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
export const createApplication = async (data: any) => {
    const response = await BaseService.post({ url: API.CREATE_APPLICATION, payload: data });
    return response;
}

export const getPet = async (id: string) => {
    const response = await BaseService.getById({ url: API.GET_UPDATE_DELETE_PET, id });
    return response;
}

export const updatePet = async (id: string, data: Partial<Pet>) => {
    const response = await BaseService.put({ url: `${API.GET_UPDATE_DELETE_PET}/${id}`, payload: data });
    return response;
}

export const deletePet = async (id: string) => {
    const response = await BaseService.delete({ url: `${API.GET_UPDATE_DELETE_PET}/${id}` });
    return response;
}

// Approve or reject an application
export const updateApplicationStatus = async (applicationId: string, option: string) => {
    try {
        const response = await axiosInstance.put(`${process.env.NEXT_PUBLIC_BASE_API_URL}api/Applications`, null, {
            params: { applicationId, option },
        })
        return response.data
    } catch (error) {
        console.error("Error updating application status:", error)
        throw error
    }
}
