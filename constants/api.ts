export const API = {
    // AUTH
    LOGIN: '/api/auth/login',
    GET_CURRENT_USER: '/api/auth',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    LOGOUT: '/api/auth/logout',

    // USER
    CHANGE_PASSWORD: '/api/user/change-password',
    REGISTER: '/api/user/register',
    CHANGE_STATUS: '/api/user/change-status',
    CHANGE_ROLE: '/api/user/change-role',
    GET_UPDATE_DELETE: '/api/user',

    // CATEGORY
    CREATE_CATEGORY: '/api/category/create',
    GET_CATEGORIES: '/api/category/search',
    GET_UPDATE_DELETE_CATEGORY: '/api/category',

    // BLOG
    CREATE_BLOG: '/api/blog/create',
    GET_BLOGS: '/api/blog/search',
    GET_UPDATE_DELETE_BLOG: '/api/blog',

    


    GET_PRODUCTS: '/api/products',
    GET_PRODUCT_DETAIL: '/api/products/:id',
}