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

export const getVietnameseStatus = (status: string, type: string) => {
    const statusMap: Record<string, Record<string, string>> = {
        product: {
            published: 'Công khai',
            inactive: 'Ngưng bán',
            draft: 'Nháp',
        },
        category: {
            published: 'Công khai',
            inactive: 'Ẩn',
            draft: 'Nháp',
        },
        blog: {
            published: 'Công khai',
            inactive: 'Ẩn',
            draft: 'Nháp',
        },

    };

    return statusMap[type]?.[status] || 'Nháp';
};
