import React from "react";
import { Button } from "@/components/ui/button";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

type PaginationControlsProps = {
    pageIndex: number;
    pageCount: number;
    canPreviousPage: boolean;
    canNextPage: boolean;
    goToPage: (pageIndex: number) => void;
    nextPage: () => void;
    previousPage: () => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
    pageIndex,
    pageCount,
    canPreviousPage,
    canNextPage,
    goToPage,
    nextPage,
    previousPage,
}) => {
    return (
        <div className="flex items-center gap-6">
            <span className="text-sm text-gray-500">
                Trang {pageIndex + 1} trên {Math.max(1, pageCount)}
            </span>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    className="size-9 w-12"
                    size="sm"
                    onClick={() => goToPage(0)}
                    disabled={!canPreviousPage}
                >
                    <BiFirstPage />
                </Button>

                <Button
                    variant="outline"
                    className="size-9 w-12"
                    size="sm"
                    onClick={previousPage}
                    disabled={!canPreviousPage}
                >
                    <GrFormPrevious />
                </Button>

                <Button
                    variant="outline"
                    className="size-9 w-12"
                    size="sm"
                    onClick={nextPage}
                    disabled={!canNextPage}
                >
                    <GrFormNext />
                </Button>

                <Button
                    variant="outline"
                    className="size-9 w-12"
                    size="sm"
                    onClick={() => goToPage(pageCount - 1)}
                    disabled={!canNextPage}
                >
                    <BiLastPage />
                </Button>
            </div>
        </div>
    );
};

export default PaginationControls;
