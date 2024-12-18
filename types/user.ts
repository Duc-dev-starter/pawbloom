export type UserStatus = ""

export type User = {
    id: string;
    name: string;
    googleId? : string;
    password?: string;
    createdAt: string;
    updatedAt: string;
}