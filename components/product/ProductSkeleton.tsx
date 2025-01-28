import { Skeleton } from "../ui/skeleton";
import CustomCard from "./CustomCard";

const ProductSkeleton = () => {
    return (
        <CustomCard className="p-4">
            {/* Skeleton cho hình ảnh */}
            <Skeleton className="w-full h-40 mb-4 rounded-md" />

            {/* Skeleton cho tiêu đề */}
            <div className="mb-2">
                <Skeleton className="h-6 w-3/4 rounded-md" />
            </div>

            {/* Skeleton cho giá */}
            <Skeleton className="h-4 w-1/4 rounded-md" />
        </CustomCard>
    );
};

export default ProductSkeleton;
