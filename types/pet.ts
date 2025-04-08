/* eslint-disable @typescript-eslint/no-explicit-any */
export type Pet = {
    id: string;
    name: string;
    breed: string;
    age: number;
    size: string;
    gender: string;
    description: string;
    status: string;
    photoURL: string;
    weight: number;
    color: string;
    price: number;
    neutering: boolean;
    humanFriendly: boolean;
    dietarySpecific: boolean;
    rabiesVaccination: boolean;
    dogFriendly: boolean;
    pottyCare: boolean;
    vaccinations: boolean;
    catFriendly: boolean;
    rescueCenterId: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface PetFilters {
    sort: any;
    type?: string;
    size?: string;
    age?: string;
    gender?: string;
    status?: string;
    search?: string;
}

export interface PetResponse {
    success: boolean;
    data: Pet;
}

export interface PetsResponse {
    success: boolean;
    data: Pet[];
}
