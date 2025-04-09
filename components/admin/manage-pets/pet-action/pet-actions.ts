"use client"

import type { Pet } from "@/types/pet"
import {
	getPet,
	updatePet as updatePetApi,
	deletePet as deletePetApi,
	createPet as createPetApi,
	updatePetImage,
} from "@/services/pet"

// Create a new pet
export async function createPet(formData: FormData) {
	try {
		// Extract all form data and convert to proper JSON object
		// const petData = {
		// 	name: formData.get("name") as string,
		// 	breed: formData.get("breed") as string,
		// 	price: Number(formData.get("price")),
		// 	age: Number(formData.get("age")),
		// 	weight: Number(formData.get("weight")),
		// 	status: formData.get("status") as string,
		// 	gender: formData.get("gender") as string,
		// 	size: formData.get("size") as string,
		// 	color: formData.get("color") as string,
		// 	description: formData.get("description") as string,
		// 	photoURL: formData.get("photoURL") as string,
		// 	neutering: formData.get("neutering") === "true",
		// 	humanFriendly: formData.get("humanFriendly") === "true",
		// 	dietarySpecific: formData.get("dietarySpecific") === "true",
		// 	rabiesVaccination: formData.get("rabiesVaccination") === "true",
		// 	dogFriendly: formData.get("dogFriendly") === "true",
		// 	pottyCare: formData.get("pottyCare") === "true",
		// 	vaccinations: formData.get("vaccinations") === "true",
		// 	catFriendly: formData.get("catFriendly") === "true",
		// }

		// Use your actual API service with JSON payload
		const response = await createPetApi(formData)

		if (!response.success) {
			throw new Error("Failed to create pet")
		}

		// Get the newly created pet ID for image upload
		const petId = response.data.id

		// Handle image upload if provided
		const imageFile = formData.get("imageFile") as File
		if (imageFile && imageFile.size > 0) {
			await updatePetImage(petId, imageFile)
		}

		return { success: true }
	} catch (error) {
		console.error("Error creating pet:", error)
		return { success: false, error: "Failed to create pet" }
	}
}

// Update an existing pet
export async function updatePet(id: string, formData: FormData) {
	try {
		// Extract all form data and convert to proper JSON object
		const petData = {
			name: formData.get("name") as string,
			breed: formData.get("breed") as string,
			price: Number(formData.get("price")),
			age: Number(formData.get("age")),
			weight: Number(formData.get("weight")),
			status: formData.get("status") as string,
			gender: formData.get("gender") as string,
			size: formData.get("size") as string,
			color: formData.get("color") as string,
			description: formData.get("description") as string,
			photoURL: formData.get("photoURL") as string,
			neutering: formData.get("neutering") === "true",
			humanFriendly: formData.get("humanFriendly") === "true",
			dietarySpecific: formData.get("dietarySpecific") === "true",
			rabiesVaccination: formData.get("rabiesVaccination") === "true",
			dogFriendly: formData.get("dogFriendly") === "true",
			pottyCare: formData.get("pottyCare") === "true",
			vaccinations: formData.get("vaccinations") === "true",
			catFriendly: formData.get("catFriendly") === "true",
		}

		// Use your actual API service with JSON payload
		const response = await updatePetApi(id, petData)

		if (!response.success) {
			throw new Error("Failed to update pet")
		}

		return { success: true }
	} catch (error) {
		console.error("Error updating pet:", error)
		return { success: false, error: "Failed to update pet" }
	}
}

// Update pet image
export async function updatePetImageAction(id: string, imageFile: File) {
	try {
		const response = await updatePetImage(id, imageFile)
		return response
	} catch (error) {
		console.error("Error updating pet image:", error)
		return { success: false, error: "Failed to update pet image" }
	}
}

// Delete a pet
export async function deletePet(id: string) {
	try {
		// Use your actual API service
		const response = await deletePetApi(id)

		if (!response.success) {
			throw new Error("Failed to delete pet")
		}

		return { success: true }
	} catch (error) {
		console.error("Error deleting pet:", error)
		return { success: false, error: "Failed to delete pet" }
	}
}

// Get a single pet by ID
export async function getPetById(id: string): Promise<Pet | null> {
	try {
		// Use your actual API service
		const response = await getPet(id)

		if (!response.success) {
			throw new Error("Failed to fetch pet")
		}

		return response.data.pet
	} catch (error) {
		console.error("Error fetching pet:", error)
		return null
	}
}
