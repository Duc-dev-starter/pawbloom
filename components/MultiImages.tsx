/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useState } from "react";

const MultiImages = ({ items }: { items: any }) => {
    const [index, setIndex] = useState(0);

    return (
        <div>
            <div className="relative h-[500px]">
                <Image
                    src={items[index].image?.url}
                    alt=""
                    fill
                    sizes="50vw"
                    className="rounded-md object-cover"
                />
            </div>
            <div className="mt-3 flex justify-between gap-4">
                {items.map((item: any, i: number) => (
                    <div
                        className="relative mt-8 h-32 w-1/4 cursor-pointer gap-4"
                        key={item.id}
                        onClick={() => setIndex(i)}
                    >
                        <Image
                            src={item.image?.url}
                            alt=""
                            fill
                            sizes="30vw"
                            className="rounded-md object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MultiImages;