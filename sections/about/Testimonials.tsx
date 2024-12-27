import AnimatedGradientText from '@/components/ui/animated-gradient-text'
import Marquee from '@/components/ui/marquee';
import { reviews } from '@/constants/about';
import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image';
import React from 'react'



const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
    img,
    name,
    username,
    body,
}: {
    img: string;
    name: string;
    username: string;
    body: string;
}) => {
    return (
        <figure
            className={cn(
                "relative w-80 cursor-pointer overflow-hidden rounded-xl border p-4 sm:p-8 flex flex-col justify-between",
                // light styles
                "border-primary/[.15] bg-muted/70 hover:bg-muted/80",
            )}
        >
            <blockquote className="mt-2 text-sm">{body}</blockquote>
            <div className="mt-2 flex flex-row items-center gap-2">
                <Image className="aspect-square rounded-full" width="32" height="32" alt={username} src={img} />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium dark:text-white">
                        {name}
                    </figcaption>
                    <p className="text-xs font-medium dark:text-white/40">{username}</p>
                </div>
            </div>
        </figure>
    );
};

const Testimonials = () => {
    return (
        <section id='testimonials' className='flex w-full flex-col items-center justify-center overflow-hidden py-28'>
            <AnimatedGradientText>
                🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
                <span
                    className={cn(
                        `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                    )}
                >
                    Phản hồi từ khách hàng
                </span>
                <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedGradientText>
            <h2 className='mt-4 text-2xl font-bold xs:text-3xl sm:text-4xl'>Khách hàng của chúng tôi nói gì</h2>
            <p className='mt-4 text-center text-base text-muted-foreground lg:max-w-[75%]'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo ab, amet dignissimos id consequuntur, unde iure sed aliquid qui nobis totam fugit odio repellat harum praesentium neque ducimus provident? Officia.</p>
            <div className="relative mt-16 flex w-full flex-col items-center justify-center overflow-hidden">
                <Marquee pauseOnHover className="[--duration:30s] [--gap:1rem] sm:[--gap:2rem]">
                    {firstRow.map((review) => (
                        <ReviewCard key={review.username} {...review} />
                    ))}
                </Marquee>
                <Marquee reverse pauseOnHover className="mt-1 [--duration:30s] [--gap:1rem] sm:mt-4 sm:[--gap:2rem]">
                    {secondRow.map((review) => (
                        <ReviewCard key={review.username} {...review} />
                    ))}
                </Marquee>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background sm:w-1/4"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background sm:w-1/4"></div>
            </div>
        </section>
    )
}

export default Testimonials