"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

// Dữ liệu giả
const posts = [
    {
        id: 1,
        img: "https://images.pexels.com/photos/19036832/pexels-photo-19036832/free-photo-of-mountain-reflection-in-lake.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
        category: "Nature",
        createdAt: "2023-12-01",
        title: "Exploring the Beauty of Mountain Reflection",
        slug: "/posts/mountain-reflection",
    },
    {
        id: 2,
        img: "https://images.pexels.com/photos/17867705/pexels-photo-17867705/free-photo-of-crowd-of-hikers-on-the-mountain-ridge-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
        category: "Travel",
        createdAt: "2023-11-15",
        title: "Hikers on the Mountain Ridge at Dusk",
        slug: "/posts/hikers-at-dusk",
    },
    {
        id: 3,
        img: "https://images.pexels.com/photos/21812160/pexels-photo-21812160/free-photo-of-puerta-colonial-color-rojo-de-guanajuato-mexico.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
        category: "Architecture",
        createdAt: "2023-11-10",
        title: "Colonial Red Door in Guanajuato, Mexico",
        slug: "/posts/colonial-red-door",
    },
    {
        id: 4,
        img: "https://images.pexels.com/photos/20832069/pexels-photo-20832069/free-photo-of-a-narrow-street-with-buildings-and-cars.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
        category: "Street",
        createdAt: "2023-10-30",
        title: "A Narrow Street with Buildings and Cars",
        slug: "/posts/narrow-street",
    },
];

const FeaturePost = () => {
    return (
        <div className="mt-8 flex flex-col lg:flex-row gap-8">
            {/* First */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
                {/* Image */}
                {posts[0].img && (
                    <Image
                        src={posts[0].img}
                        alt={posts[0].title}
                        width={400}
                        height={200}
                        className="rounded-lg object-cover"
                    />
                )}
                {/* Details */}
                <div className="flex items-center gap-4">
                    <h1 className="font-semibold lg:text-lg">01.</h1>
                    <Link href="#">
                        <span className="text-blue-800 lg:text-lg">{posts[0].category}</span>
                    </Link>
                    <span className="text-gray-500">{posts[0].createdAt}</span>
                </div>
                {/* Title */}
                <Link href={posts[0].slug} className="text-xl lg:text-3xl font-semibold lg:font-bold">
                    {posts[0].title}
                </Link>
            </div>

            {/* Others */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
                {posts.slice(1).map((post, index) => (
                    <div className="lg:h-1/3 flex justify-between gap-4" key={post.id}>
                        {/* Image */}
                        {post.img && (
                            <div className="w-1/3">
                                <Image
                                    src={post.img}
                                    alt={post.title}
                                    width={120}
                                    height={120}
                                    className="rounded-lg object-cover w-full h-full"
                                />
                            </div>
                        )}
                        {/* Details and Title */}
                        <div className="w-2/3">
                            <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
                                <h1 className="font-semibold">{`0${index + 2}.`}</h1>
                                <Link href="#">
                                    <span className="text-blue-800">{post.category}</span>
                                </Link>
                                <span className="text-gray-500 text-sm">{post.createdAt}</span>
                            </div>
                            <Link href={post.slug} className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium">
                                {post.title}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturePost;
