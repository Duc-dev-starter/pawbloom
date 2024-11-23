// Helper to clean up payload params
export const cleanParams = (params: any) => {
    for (const key in params) {
        if (params[key] === '' && params[key] !== 0) {
            delete params[key];
        }
    }
    return params;
};

export const scrollToTop = (position = 0, behavior: ScrollBehavior = 'smooth') => {
    window.scrollTo({
        top: position,
        behavior,
    });
};