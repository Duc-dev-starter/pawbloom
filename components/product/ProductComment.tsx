"use client";
import Images from "@/constants/image";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import {
    AiOutlineDislike,
    AiOutlineLike,
    AiFillLike,
    AiFillDislike,
} from "react-icons/ai";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const ProductComment = () => {
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [likeCount, setLikeCount] = useState(42); // Số like ban đầu
    const [dislikeCount, setDislikeCount] = useState(0); // Số dislike ban đầu

    const handleLike = () => {
        if (isLiked) {
            setIsLiked(false);
            setLikeCount((prev) => prev - 1);
        } else {
            setIsLiked(true);
            setLikeCount((prev) => prev + 1);
            if (isDisliked) {
                setIsDisliked(false);
                setDislikeCount((prev) => prev - 1);
            }
        }
    };

    const handleDislike = () => {
        if (isDisliked) {
            setIsDisliked(false);
            setDislikeCount((prev) => prev - 1);
        } else {
            setIsDisliked(true);
            setDislikeCount((prev) => prev + 1);
            if (isLiked) {
                setIsLiked(false);
                setLikeCount((prev) => prev - 1);
            }
        }
    };

    return (
        <div className="mb-8 rounded-xl bg-slate-50 p-4">
            <div className="flex items-center gap-4">
                <Image
                    src={Images.LOGO}
                    alt="test"
                    width={12}
                    height={12}
                    className="size-10 rounded-full object-cover"
                />
                <div>
                    <div className="flex items-center gap-3">
                        <span className="font-medium">John Doe</span>
                        <span className="text-sm text-gray-500">2 ngày trước</span>
                    </div>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }, (_, index) => (
                            <StarIcon key={index} className="size-4 text-yellow-400" />
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe qui
                    quod unde doloremque numquam ducimus totam, id dicta soluta, quam
                    nobis expedita sequi at, labore quae architecto aspernatur non
                    repellendus?
                </p>
            </div>
            <div className="mt-4 flex items-center gap-3">
                <p className="text-brand-100">Trả lời</p>

                {/* Like Button with Tooltip */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div
                            className="flex cursor-pointer items-center gap-1"
                            onClick={handleLike}
                        >
                            {isLiked ? <AiFillLike /> : <AiOutlineLike />}
                            <p className="text-gray-500">{likeCount}</p>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        {isLiked ? "Bỏ thích" : "Thích"}
                    </TooltipContent>
                </Tooltip>

                {/* Dislike Button with Tooltip */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div
                            className="flex cursor-pointer items-center gap-1"
                            onClick={handleDislike}
                        >
                            {isDisliked ? <AiFillDislike /> : <AiOutlineDislike />}
                            <p className="text-gray-500">{dislikeCount}</p>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        {isDisliked ? "Bỏ không thích" : "Không thích"}
                    </TooltipContent>
                </Tooltip>
            </div>
        </div>
    );
};

export default ProductComment;
