export const API = {
    // AUTH
    LOGIN: '/api/auth/login',
    GET_CURRENT_USER: '/api/auth',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    LOGOUT: '/api/auth/logout',

    // USER
    GET_USERS: '/api/users/search',
    CHANGE_PASSWORD: '/api/users/change-password',
    REGISTER: '/api/users/register',
    CHANGE_STATUS: '/api/users/change-status',
    CHANGE_ROLE: '/api/users/change-role',
    GET_UPDATE_DELETE_USER: '/api/users',

    // CATEGORY
    CREATE_CATEGORY: '/api/categories/create',
    GET_CATEGORIES: '/api/categories/search',
    GET_UPDATE_DELETE_CATEGORY: '/api/categories',

    // BLOG
    CREATE_BLOG: '/api/blogs/create',
    GET_BLOGS: '/api/blogs/search',
    GET_UPDATE_DELETE_BLOG: '/api/blog',

    // PRODUCT
    CREATE_PRODUCT: '/api/products/create',
    GET_PRODUCTS: '/api/products/search',
    GET_UPDATE_DELETE_PRODUCT: '/api/products',

    // PET
    CREATE_PET: '/api/pets/create',
    GET_PETS: '/api/pets/search',
    GET_UPDATE_DELETE_PET: '/api/products',
}