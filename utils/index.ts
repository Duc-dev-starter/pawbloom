import Path from "@/constants/paths";
import { FilterFn } from "@tanstack/react-table";
// Helper to clean up payload params
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cleanParams = (params: any) => {
    for (const key in params) {
        if (params[key] === '' && params[key] !== 0) {
            delete params[key];
        }
    }
    return params;
};

// eslint-disable-next-line no-undef
export const scrollToTop = (position = 0, behavior: ScrollBehavior = 'smooth') => {
    window.scrollTo({
        top: position,
        behavior,
    });
};

export const getVietnameseStatus = (status: string, type: string) => {
    const statusMap: Record<string, Record<string, string>> = {
        product: {
            Published: 'Công khai',
            Inactive: 'Ngưng bán',
            Draft: 'Nháp',
        },
        category: {
            Published: 'Công khai',
            Inactive: 'Ẩn',
            Draft: 'Nháp',
        },
        blog: {
            Published: 'Công khai',
            Inactive: 'Ẩn',
            Draft: 'Nháp',
        },
        client: {
            active: 'Hoạt động',
            inactive: 'Ngưng hoạt động',
            banned: 'Bị cấm'
        },
        foster: {
            active: 'Hoạt động',
            inactive: 'Ngưng hoạt động',
            banned: 'Bị cấm'
        }
    };

    return statusMap[type]?.[status] || 'Nháp';
};


// Define the custom filter types
declare module "@tanstack/table-core" {
    interface FilterFns {
        multiSelect: FilterFn<unknown>
    }
}

// Define the custom filter function
export const multiSelectFilter: FilterFn<unknown> = (
    row,
    columnId,
    filterValue: string[]
) => {
    const rowValue = (row.getValue(columnId) as string).toLowerCase();
    const lowerCaseFilterValues = filterValue.map((val) => val.toLowerCase());
    return filterValue.length === 0 || lowerCaseFilterValues.includes(rowValue);
};


export const firstLetterCapitialize = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

export const navigateByRole = (role: string, router: { push: (path: string) => void }) => {
    switch (role) {
        case "Adopter":
            router.push(Path.HOME);
            break;
        case "Admin":
            router.push(Path.ADMIN_DASHBOARD);
            break;
        case "Foster":
            router.push(Path.ADMIN_DASHBOARD);
            break;
        default:
            router.push(Path.HOME);
            break;
    }
}

type ToastOptions = {
    title: string;
    description?: string;
    variant?: "default" | "destructive";
};

let showToast: ((options: ToastOptions) => void) | null = null;

export const registerToast = (fn: typeof showToast) => {
    showToast = fn;
};

export const toastService = {
    show: (options: ToastOptions) => {
        if (showToast) showToast(options);
    },
};
