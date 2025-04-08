export type User = {
    address: string | null;
    bio: string | null;
    createdAt: string;
    email: string;
    emailVerified: boolean;
    fullName: string;
    isActive: boolean;
    lastLoginAt: string;
    oAuth2FacebookId: string | null;
    oAuth2GoogleId: string | null;
    phoneNumber: string;
    profilePictureUrl: string | null;
    role: string;
    updatedAt: string;
    userId: string;
};

export type Client = User & {
    status: "active" | "inactive" | "banned";
};

export type Foster = User & {
    status: "operational" | "closed" | "under_review";
    address: string;
    description: string;
};
