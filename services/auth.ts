import { API } from "@/constants/api"
import { BaseService } from "./baseService"
import { User } from "@/types/user"


export const register = async (data: Partial<User>) => {
    const response = await BaseService.post({ url: API.REGISTER, payload: data });
    return response;
}

export const login = async (data: Partial<User>) => {
    const response = await BaseService.post({ url: API.LOGIN, payload: data });
    return response;
}

export const socialLogin = async (data: { provider: string, idToken: string }) => {
    const response = await BaseService.post({ url: API.SOCIAL_LOGIN, payload: data });
    return response;
}
