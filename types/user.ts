export type User = {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    googleId?: string;
    password?: string;
    createdAt: string;
    updatedAt: string;
};

export type Client = User & {
    status: "active" | "inactive" | "banned"; 
};

export type Foster = User & {
    status: "operational" | "closed" | "under_review"; 
    address: string;
    description: string;
};
