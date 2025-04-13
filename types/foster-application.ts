import type { Pet } from "./pet"
import type { User } from "./user"

export interface Application {
	applicationId: string
	status: string
	applicationDate: string
	pet: Pet
	user: User
}

export interface ApplicationResponse {
	data: Application[]
	totalCount: number
	pageCount: number
}
