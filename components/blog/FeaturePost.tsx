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
        slug: "/blog/mountain-reflection",
    },
    {
        id: 2,
        img: "https://images.pexels.com/photos/17867705/pexels-photo-17867705/free-photo-of-crowd-of-hikers-on-the-mountain-ridge-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
        category: "Travel",
        createdAt: "2023-11-15",
        title: "Hikers on the Mountain Ridge at Dusk",
        slug: "/blog/hikers-at-dusk",
    },
    {
        id: 3,
        img: "https://images.pexels.com/photos/21812160/pexels-photo-21812160/free-photo-of-puerta-colonial-color-rojo-de-guanajuato-mexico.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
        category: "Architecture",
        createdAt: "2023-11-10",
        title: "Colonial Red Door in Guanajuato, Mexico",
        slug: "/blog/colonial-red-door",
    },
    {
        id: 4,
        img: "https://images.pexels.com/photos/20832069/pexels-photo-20832069/free-photo-of-a-narrow-street-with-buildings-and-cars.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
        category: "Street",
        createdAt: "2023-10-30",
        title: "A Narrow Street with Buildings and Cars",
        slug: "/blog/narrow-street",
    },
];

const FeaturePost = () => {
    return (
        <div className="mt-8 flex flex-col gap-10 lg:flex-row">
            {/* First */}
            <div className="flex w-full flex-col gap-4 lg:w-1/2">
                {/* image */}
                {posts[0].img && <Image
                    src={posts[0].img}
                    className="h-[290px] rounded-3xl object-cover"
                    width="895"
                    alt="test"
                    height={0}
                />}
                {/* details */}
                <div className="flex items-center gap-4">
                    <h1 className="font-semibold lg:text-lg">01.</h1>
                    <a className="text-blue-800 lg:text-lg">{posts[0].category}</a>
                    <span className="text-gray-500">{posts[0].createdAt}</span>
                </div>
                {/* title */}
                <Link
                    href={posts[0].slug}
                    className="text-xl font-semibold lg:text-3xl lg:font-bold"
                >
                    {posts[0].title}
                </Link>
            </div>
            {/* Others */}
            <div className="flex w-full flex-col gap-4 lg:w-1/2">
                {/* second */}
                {posts[1] && <div className="flex justify-between gap-4 lg:h-1/3">
                    {posts[1].img && <div className="aspect-video w-1/3">
                        <Image
                            src={posts[1].img}
                            className="size-full rounded-3xl object-cover"
                            width="298"
                            height={0}
                            alt="test"
                        />
                    </div>}
                    {/* details and title */}
                    <div className="w-2/3">
                        {/* details */}
                        <div className="mb-4 flex items-center gap-4 text-sm lg:text-base">
                            <h1 className="font-semibold">02.</h1>
                            <a className="text-blue-800">{posts[1].category}</a>
                            <span className="text-sm text-gray-500">test</span>
                        </div>
                        {/* title */}
                        <Link
                            href={posts[1].slug}
                            className="text-base font-medium sm:text-lg md:text-2xl lg:text-xl xl:text-2xl"
                        >
                            {posts[1].title}
                        </Link>
                    </div>
                </div>}
                {/* third */}
                {posts[2] && <div className="flex justify-between gap-4 lg:h-1/3">
                    {posts[2].img && <div className="aspect-video w-1/3">
                        <Image
                            src={posts[2].img}
                            className="size-full rounded-3xl object-cover"
                            width="298"
                            alt="test"
                            height={0}

                        />
                    </div>}
                    {/* details and title */}
                    <div className="w-2/3">
                        {/* details */}
                        <div className="mb-4 flex items-center gap-4 text-sm lg:text-base">
                            <h1 className="font-semibold">02.</h1>
                            <a className="text-blue-800">{posts[2].category}</a>
                            <span className="text-sm text-gray-500">test</span>
                        </div>
                        {/* title */}
                        <Link
                            href={posts[1].slug}
                            className="text-base font-medium sm:text-lg md:text-2xl lg:text-xl xl:text-2xl"
                        >
                            {posts[2].title}
                        </Link>
                    </div>
                </div>}
                {/* fourth */}
                {posts[3] && <div className="flex justify-between gap-4 lg:h-1/3">
                    {posts[3].img && <div className="aspect-video w-1/3">
                        <Image
                            src={posts[3].img}
                            className="size-full rounded-3xl object-cover"
                            width="298"
                            alt="test"
                            height={0}


                        />
                    </div>}
                    {/* details and title */}
                    <div className="w-2/3">
                        {/* details */}
                        <div className="mb-4 flex items-center gap-4 text-sm lg:text-base">
                            <h1 className="font-semibold">02.</h1>
                            <a className="text-blue-800">{posts[3].category}</a>
                            <span className="text-sm text-gray-500">test</span>
                        </div>
                        {/* title */}
                        <Link
                            href={posts[3].slug}
                            className="text-base font-medium sm:text-lg md:text-2xl lg:text-xl xl:text-2xl"
                        >
                            {posts[3].title}
                        </Link>
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default FeaturePost;
