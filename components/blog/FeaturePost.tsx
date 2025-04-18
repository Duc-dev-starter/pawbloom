"use client";

import { getBlogs } from "@/services/blog";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const DEFAULT_IMAGE =
    "https://images.pexels.com/photos/19036832/pexels-photo-19036832/free-photo-of-mountain-reflection-in-lake.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load";

// Dữ liệu sau khi xử lý
interface DisplayBlog {
    id: string;
    title: string;
    categoryName: string;
    createdAt: string;
    slug: string;
    img: string;
}

const FeaturePost = () => {
    const [blogs, setBlogs] = useState<DisplayBlog[]>([]);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await getBlogs();
                const posts = response?.data?.posts;

                if (Array.isArray(posts)) {
                    const sorted: DisplayBlog[] = [...posts]
                        .sort(
                            (a, b) =>
                                new Date(b.createdAt).getTime() -
                                new Date(a.createdAt).getTime()
                        )
                        .slice(0, 4)
                        .map((post) => ({
                            id: post.id,
                            title: post.title,
                            categoryName: post.categoryName,
                            createdAt: post.createdAt.split(" ")[0],
                            slug: `/blog/${post.id}`,
                            img: post.image || DEFAULT_IMAGE, // nếu có field ảnh thì dùng, không thì fallback
                        }));

                    setBlogs(sorted);
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        fetchBlog();
    }, []);

    if (blogs.length === 0) return null;

    return (
        <div className="my-8 flex flex-col gap-10 lg:flex-row">
            {/* First - Featured post */}
            <div className="flex w-full flex-col gap-4 lg:w-1/2">
                <Image
                    src={blogs[0].img}
                    className="h-[290px] rounded-3xl object-cover"
                    width={895}
                    height={290}
                    alt="feature"
                />
                <div className="flex items-center gap-4">
                    <h1 className="font-semibold lg:text-lg">01.</h1>
                    <span className="text-blue-800 lg:text-lg">
                        {blogs[0].categoryName}
                    </span>
                    <span className="text-gray-500">{blogs[0].createdAt}</span>
                </div>
                <Link
                    href={blogs[0].slug}
                    className="text-xl font-semibold lg:text-3xl lg:font-bold"
                >
                    {blogs[0].title}
                </Link>
            </div>

            {/* Others */}
            <div className="flex w-full flex-col gap-4 lg:w-1/2">
                {blogs.slice(1).map((blog, index) => (
                    <div
                        key={blog.id}
                        className="flex justify-between gap-4 lg:h-1/3"
                    >
                        <div className="aspect-video w-1/3">
                            <Image
                                src={blog.img}
                                className="size-full rounded-3xl object-cover"
                                width={298}
                                height={168}
                                alt="blog"
                            />
                        </div>
                        <div className="w-2/3">
                            <div className="mb-4 flex items-center gap-4 text-sm lg:text-base">
                                <h1 className="font-semibold">0{index + 2}.</h1>
                                <span className="text-blue-800">{blog.categoryName}</span>
                                <span className="text-sm text-gray-500">{blog.createdAt}</span>
                            </div>
                            <Link
                                href={blog.slug}
                                className="text-base font-medium sm:text-lg md:text-2xl lg:text-xl xl:text-2xl"
                            >
                                {blog.title}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturePost;
