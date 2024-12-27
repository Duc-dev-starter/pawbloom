import AnimatedGradientText from '@/components/ui/animated-gradient-text'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import Marquee from '@/components/ui/marquee'
import { avatar, heroImages } from '@/constants/about'
import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaStar } from 'react-icons/fa6'


const MarqueeColumn = ({
    reverse, duration, className
}: {
    reverse: boolean,
    duration: string,
    className?: string
}) => {
    return <Marquee reverse={reverse} pauseOnHover vertical className={cn("w-full relative h-full flex flex-col justify-center items-center", className)}
        style={{
            "--duration": duration
        }}
    >
        {
            heroImages.sort(() => Math.random() - 0.5).map((image, index) => (
                <Image key={index} src={image.src} alt={image.alt} height={200} width={200} priority className='size-full
                  rounded object-cover opacity-[.25] transition-opacity duration-300 
                  ease-in-out hover:opacity-100'/>
            ))
        }
    </Marquee>
}

const HeroSections = () => {
    return (
        <section id='hero' className='relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden'>
            <div className='relative z-40 mx-auto flex w-fit flex-col items-center justify-center space-y-4 px-6 text-center backdrop-blur-[2px] sm:px-0'>
                <AnimatedGradientText>
                    🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
                    <span
                        className={cn(
                            `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                        )}
                    >
                        Cùng khám phá về chúng tôi
                    </span>
                    <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                </AnimatedGradientText>
                <h1 className='text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl'>Cùng khám phá về chúng tôi</h1>
                <p className='mx-auto mb-8 max-w-3xl text-sm text-gray-600 xs:text-base sm:text-lg md:text-xl'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus, eaque, blanditiis atque sed ut ipsum quae nulla totam, magni obcaecati aperiam voluptatum quod deserunt inventore? Asperiores impedit sunt adipisci perspiciatis?</p>
                <div className='mb-4 flex items-center space-x-2'>
                    <div className='mb-4 flex items-center -space-x-5 overflow-hidden sm:-space-x-4'>
                        {
                            avatar.map((avatar, index) => (
                                <Avatar key={index} className='inline-block border-2 border-background'>
                                    <AvatarImage src={avatar.src} className='h-full object-cover' />
                                    <AvatarFallback>{avatar.fallback}</AvatarFallback>
                                </Avatar>
                            ))
                        }
                    </div>
                    <span className='text-sm font-medium'>Được yêu thích bởi hơn 100 khách hàng</span>
                </div>
                <Link href="#">
                    <Button className='h-12 rounded-md text-base'>
                        <span><FaStar className='text-yellow-400' /></span>Nhận nuôi thú cưng đầu tiên ngay <span><FaStar className='text-yellow-400' /></span>
                    </Button>
                </Link>
            </div>
            <div className='absolute top-0 z-10 grid w-full grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
                <MarqueeColumn reverse={false} duration='120s' />
                <MarqueeColumn reverse={true} duration='120s' />
                <MarqueeColumn reverse={false} duration='120s' />
                <MarqueeColumn reverse={true} duration='120s' className='hidden md:flex' />
                <MarqueeColumn reverse={false} duration='120s' className='hidden lg:flex' />
                <MarqueeColumn reverse={true} duration='120s' className='hiddenlg:flex' />
            </div>
        </section>
    )
}

export default HeroSections