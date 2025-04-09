export const API = {
    // AUTH
    LOGIN: '/api/auth/login',
    GET_CURRENT_USER: '/api/auth',
    REGISTER: '/api/auth/register',
    SOCIAL_LOGIN: '/api/auth/social-login',
    LOGOUT: '/api/auth/logout',

    // USER
    GET_USERS: '/api/users/search',
    CHANGE_PASSWORD: '/api/users/change-password',
    CHANGE_STATUS: '/api/users/change-status',
    CHANGE_ROLE: '/api/users/change-role',
    RESEND_VERIFICATION_EMAIL: '/api/users/resend-verification-email',
    GET_UPDATE_DELETE_USER: '/api/users',
    RESET_PASSWORD: '/api/users/reset-password',

    // BLOG CATEGORIES
    CREATE_BLOG_CATEGORY: '/api/blogCategories',
    GET_BLOG_CATEGORIES: '/api/blogCategories',
    GET_UPDATE_DELETE_BLOG_CATEGORY: '/api/blogCategories',

    // CATEGORY
    CREATE_CATEGORY: '/api/categories/create',
    GET_CATEGORIES: '/api/categories',
    GET_UPDATE_DELETE_CATEGORY: '/api/categories',

    // BLOG
    CREATE_BLOG: '/api/blogs',
    GET_BLOGS: '/api/blogs',
    GET_UPDATE_DELETE_BLOG: '/api/blogs',

    // POST
    CREATE_POST: '/api/posts/create',
    GET_POSTS: '/api/posts/search',
    GET_UPDATE_DELETE_POST: '/api/posts',

    // PRODUCT
    CREATE_PRODUCT: '/api/products/create',
    GET_PRODUCTS: '/api/products/search',
    GET_UPDATE_DELETE_PRODUCT: '/api/products',

    // PET
    CREATE_PET: '/api/Pets',
    GET_PETS: '/api/Pets',
    GET_UPDATE_DELETE_PET: '/api/Pets',
    UPDATE_STATUS_PET: '/api/Pets',
    GET_PET_SEARCH_PAGE: '/api/Pets?',

    // FOSTER
    GET_FOSTERS: '/api/fosters',

    // APPLICATION
    GET_APPLICATIONS: '/api/applications/adopter',
    GET_APPLICATIONS_BY_FOSTER: '/api/applications',
    CREATE_APPLICATION: '/api/applications',

    // Order
    CREATE_ORDER: '/api/payments/create-order'
}