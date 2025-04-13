import { BaseService } from "./baseService";
import { API } from "@/constants/api";
import { Pet } from "@/types/pet";
import { axiosInstance } from "./axiosInstance";

export const getPets = async () => {
    const response = await BaseService.get({ url: `${API.GET_PETS}?page=1&pageSize=100` });
    return response;
}

export const createPet = async (data: FormData) => {
    console.log('====================================');
    console.log("name: formData.get('name') as string,", data);
    console.log('====================================');
    const response = await BaseService.post({ url: API.GET_PETS, payload: data })
    return response
}


export const getPet = async (id: string) => {
    const response = await BaseService.getById({ url: API.GET_UPDATE_DELETE_PET, id });
    return response;
}


export const updatePet = async (id: string, data: Partial<Pet>) => {
    const requestBody = {
        id,
        ...data,
    };
    console.log('====================================');
    console.log("data before update", requestBody);
    console.log('====================================');
    const response = await BaseService.put({ url: `${API.GET_UPDATE_DELETE_PET}`, payload: requestBody });
    return response;
}

export const deletePet = async (id: string) => {
    const response = await BaseService.delete({ url: `${API.GET_UPDATE_DELETE_PET}/${id}` });
    return response;
}

export const getPetSearchPage = async (params: {
    searchTerm?: string
    page?: number
    pageSize?: number
    status?: string
}) => {
    const queryParams = new URLSearchParams()

    if (params.searchTerm) queryParams.append("searchTerm", params.searchTerm)
    if (params.page) queryParams.append("page", params.page.toString())
    if (params.pageSize) queryParams.append("pageSize", params.pageSize.toString())
    if (params.status) queryParams.append("status", params.status)

    const url = `${API.GET_PETS}/search?${queryParams.toString()}`
    const response = await BaseService.get({ url })
    return response
}

export const getApplications = async () => {
    const response = await BaseService.get({ url: API.GET_APPLICATIONS })
    console.log(response)
    return response
}

export const getApplicationsByFoster = async () => {
    const response = await BaseService.get({ url: API.GET_APPLICATIONS_BY_FOSTER })
    console.log(response)
    return response
}

export const createApplication = async (data: unknown) => {
    const response = await BaseService.post({ url: API.CREATE_APPLICATION, payload: data })
    return response
}
export const updatePetImage = async (id: string, imageFile: File) => {
    const formData = new FormData()
    formData.append("request", imageFile)

    try {
        const response = await axiosInstance.patch(`${API.GET_UPDATE_DELETE_PET}/${id}/image`, formData)

        if (!response) {
            throw new Error(`Failed to update image: ${response} ${response}`)
        }

        const data = await response.data
        return { success: true, data }
    } catch (error) {
        console.error("Error updating pet image:", error)
        return { success: false, error: (error as Error).message }
    }
}
