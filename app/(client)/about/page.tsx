import type { CSSProperties } from "react"

import type { Metadata } from "next"
import Marquee from "@/components/ui/marquee"
import { avatar, faqs, heroImages, reviews } from "@/constants/about"
import Image from "next/image"
import AnimatedGradientText from "@/components/ui/animated-gradient-text"
import { cn } from "@/lib/utils"
import { ChevronRight, ImageIcon, Package2, PanelLeft } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { FaStar } from "react-icons/fa6"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const generateMetadata = (): Metadata => ({
    title: "Về chúng tôi",
    description: "Tìm hiểu thêm về chúng tôi và sứ mệnh của chúng tôi.",
    keywords: ["về chúng tôi", "sứ mệnh", "nhiệm vụ"],
    openGraph: {
        title: "Về chúng tôi",
        description: "Tìm hiểu thêm về chúng tôi.",
        images: "/images/about.jpg",
    },
})

const MarqueeColumn = ({
    reverse,
    duration,
    className,
}: {
    reverse: boolean
    duration: string
    className?: string
}) => {
    return (
        <Marquee
            reverse={reverse}
            pauseOnHover
            vertical
            className={cn("w-full relative h-full flex flex-col justify-center items-center", className)}
            style={
                {
                    "--duration": duration,
                } as CSSProperties
            }
        >
            {heroImages
                .sort(() => Math.random() - 0.5)
                .map((image, index) => (
                    <Image
                        key={index}
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        height={200}
                        width={200}
                        priority
                        className="size-full
                  rounded object-cover opacity-[.25] transition-opacity duration-300 
                  ease-in-out hover:opacity-100"
                    />
                ))}
        </Marquee>
    )
}

const featureList = [
    {
        title: "Lý do thành lập",
        description:
            "PawBloom ra đời nhằm giải quyết vấn đề ngày càng tăng về thú cưng bị bỏ rơi dẫn đến những ảnh hưởng đến tính mạng của các bé và khó khăn trong việc kết nối những người nhận nuôi với các trung tâm cứu hộ. Cách tạo ra một nền tảng tập trung, giúp quá trình nhận nuôi nên dễ dàng và nhanh chóng hơn.",
        icon: <ImageIcon className="size-6" strokeWidth={1.5} />,
    },
    {
        title: "Vì tương lai tốt đẹp cho những người bạn bốn chân",
        description:
            "PawBloom được thành lập với mục tiêu kết nối những trạm cứu trợ động vật với những người có lòng yêu thương, sẵn sàng trao cho các bé một mái ấm mới. Chúng tôi tin rằng mỗi chú chó, chú mèo đều xứng đáng có một cuộc sống tốt đẹp hơn và nhiệm vụ của chúng tôi là trở thành cầu nối giúp hiện thực hóa ước mơ đó.",
        icon: <Package2 className="size-6" strokeWidth={1.5} />,
    },
    {
        title: "Sứ mệnh",
        description:
            "Sứ mệnh của Pawbloom là tạo ra một nền tảng đơn giản và nhân văn, kết nối thú cưng cần nhà với những người yêu thương chúng. Bằng cách cung cấp dịch vụ toàn diện để sử dụng, Pawbloom mong muốn giảm thiểu số lượng thú cưng vô gia cư và thúc đẩy việc nuôi dưỡng thú cưng có trách nhiệm.",
        icon: <PanelLeft className="size-6" strokeWidth={1.5} />,
    },
]

const teamMembers = [
    {
        name: "Quách Nguyễn Toàn Phát",
        role: "CEO",
        description: "Người sáng lập và điều hành Pawbloom với tầm nhìn kết nối mọi thú cưng với mái ấm yêu thương.",
        image: "https://th.bing.com/th/id/OIP.TxF10TSKWhxYpnvzCSwrQwHaHa?rs=1&pid=ImgDetMain",
    },
    {
        name: "Phan Hoàng Bảo Trân",
        role: "CFO",
        description: "Quản lý tài chính và đảm bảo sự phát triển bền vững của Pawbloom.",
        image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1586&q=80",
    },
    {
        name: "Lê Minh Đức",
        role: "CDO",
        description: "Phụ trách phát triển và thiết kế trải nghiệm người dùng tại Pawbloom.",
        image: "https://motionbgs.com/media/1115/sanji-smoking-one-piece.jpg",
    },
    {
        name: "Nguyễn Thanh Tùng",
        role: "CMO",
        description: "Xây dựng chiến lược marketing và phát triển thương hiệu Pawbloom.",
        image: "https://otakukart.com/wp-content/uploads/2022/09/Chopper-Introduced..jpg",
    },
    {
        name: "Phạm Hoàng Minh Khôi",
        role: "CCO",
        description: "Phụ trách truyền thông và xây dựng cộng đồng yêu thương thú cưng.",
        image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1586&q=80",
    },
    {
        name: "Phạm Minh Khôi",
        role: "CTO",
        description: "Phát triển công nghệ và nền tảng kỹ thuật cho Pawbloom.",
        image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1586&q=80",
    },
];



const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)

const ReviewCard = ({
    img,
    name,
    username,
    body,
}: {
    img: string
    name: string
    username: string
    body: string
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
                <Image
                    className="aspect-square rounded-full"
                    width="32"
                    height="32"
                    alt={username}
                    src={img || "/placeholder.svg"}
                />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium dark:text-white">{name}</figcaption>
                    <p className="text-xs font-medium dark:text-white/40">{username}</p>
                </div>
            </div>
        </figure>
    )
}

const Question = ({ question, answer }: { question: string; answer: string }) => {
    return (
        <AccordionItem value={question}>
            <AccordionTrigger className="text-left">{question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{answer}</AccordionContent>
        </AccordionItem>
    )
}

const TeamMemberCard = ({
    name,
    role,
    description,
    image,
}: { name: string; role: string; description: string; image: string }) => {
    return (
        <div className="flex flex-col items-center">
            <div className="mb-4 overflow-hidden rounded-full border-4 border-brand/20 p-1">
                <Image
                    src={image || "/placeholder.svg"}
                    alt={name}
                    width={150}
                    height={150}
                    className="aspect-square rounded-full object-cover transition-transform duration-300 hover:scale-110"
                />
            </div>
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="mb-2 text-brand font-medium">{role}</p>
            <p className="text-center text-sm text-muted-foreground">{description}</p>
        </div>
    )
}

const AboutPage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <section
                id="hero"
                className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden"
            >
                <div className="relative z-40 mx-auto flex w-fit flex-col items-center justify-center space-y-4 px-6 text-center backdrop-blur-[2px] sm:px-0">
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
                    <h1 className="text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                        Câu chuyện của Pawbloom
                    </h1>
                    <p className="mx-auto mb-8 max-w-3xl text-sm text-gray-600 xs:text-base sm:text-lg md:text-xl">
                        Pawbloom được thành lập với tình yêu dành cho những người bạn bốn chân. Chúng tôi tin rằng mỗi thú cưng đều
                        xứng đáng có một mái ấm yêu thương, và chúng tôi đang nỗ lực mỗi ngày để biến điều đó thành hiện thực.
                    </p>
                    <div className="mb-4 flex items-center space-x-2">
                        <div className="mb-4 flex items-center -space-x-5 overflow-hidden sm:-space-x-4">
                            {avatar.map((avatar, index) => (
                                <Avatar key={index} className="inline-block border-2 border-background">
                                    <AvatarImage src={avatar.src || "/placeholder.svg"} className="h-full object-cover" />
                                    <AvatarFallback>{avatar.fallback}</AvatarFallback>
                                </Avatar>
                            ))}
                        </div>
                        <span className="text-sm font-medium">Được yêu thích bởi hơn 100 khách hàng</span>
                    </div>
                    <Link href="/adopt">
                        <Button className="h-12 rounded-md text-base">
                            <span>
                                <FaStar className="text-yellow-400" />
                            </span>
                            Nhận nuôi thú cưng đầu tiên ngay{" "}
                            <span>
                                <FaStar className="text-yellow-400" />
                            </span>
                        </Button>
                    </Link>
                </div>
                <div className="absolute top-0 z-10 grid w-full grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    <MarqueeColumn reverse={false} duration="120s" />
                    <MarqueeColumn reverse={true} duration="120s" />
                    <MarqueeColumn reverse={false} duration="120s" />
                    <MarqueeColumn reverse={true} duration="120s" className="hidden md:flex" />
                    <MarqueeColumn reverse={false} duration="120s" className="hidden lg:flex" />
                    <MarqueeColumn reverse={true} duration="120s" className="hidden lg:flex" />
                </div>
            </section>

            <section id="features" className="flex w-full flex-col items-center justify-center py-32">
                <div className="container relative grid grid-cols-1 gap-8 px-6 xs:px-8 sm:mx-8 sm:px-0 lg:mx-auto lg:grid-cols-2">
                    <div className="col-span-full space-y-4">
                        <AnimatedGradientText className="ml-0 bg-background backdrop-blur-0">
                            <span
                                className={cn(
                                    `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                                )}
                            >
                                Giới thiệu Pawbloom
                            </span>
                            <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                        </AnimatedGradientText>
                        <h2 className="text-2xl font-bold xs:text-3xl sm:text-4xl">Mở ra cơ hội cho những mái ấm mới</h2>
                        <p className="text-sm text-muted-foreground xs:text-base lg:max-w-[75%]">
                            Pawbloom là nền tảng kết nối giữa những trạm cứu trợ động vật và những người muốn nhận nuôi thú cưng.
                            Chúng tôi tin rằng mỗi thú cưng đều xứng đáng có một mái ấm yêu thương và chúng tôi đang nỗ lực để biến
                            điều đó thành hiện thực.
                        </p>
                    </div>

                    <div className="order-2 flex flex-col items-start justify-start lg:order-1">
                        {featureList.map((feature) => (
                            <div key={feature.title} className="flex items-start gap-2 rounded-lg py-8 sm:gap-4 lg:p-12">
                                <span className="rounded-md p-0 text-foreground sm:bg-foreground sm:p-2 sm:text-background">
                                    {feature.icon}
                                </span>
                                <div>
                                    <h3 className="text-xl font-medium sm:text-2xl">{feature.title}</h3>
                                    <p className="text-sm text-muted-foreground xs:text-base">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div
                        className={cn(
                            "h-fit lg:sticky top-32 pl-16 pt-16 rounded-lg border border-r-gray-300 border-b-gray-300 animate-gradient bg-gradient-to-r from-[#627fab] via-[#b95480] to-[#627fab] bg-[length:var(--bg-size)_100%] [--bg-size:400%] order-1 lg:order-2",
                        )}
                    >
                        <Image
                            src="/assets/images/homepage.png"
                            alt="Pawbloom homepage"
                            width={120}
                            height={120}
                            className="h-auto w-full rounded-tl-lg"
                        />
                    </div>
                </div>
            </section>

            <section id="team" className="flex w-full flex-col items-center justify-center py-20 bg-gray-50">
                <div className="container px-6 mx-auto">
                    <AnimatedGradientText>
                        👥 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
                        <span
                            className={cn(
                                `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                            )}
                        >
                            Đội ngũ của chúng tôi
                        </span>
                        <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                    </AnimatedGradientText>
                    <h2 className="mt-4 text-center text-2xl font-bold xs:text-3xl sm:text-4xl">Những người sáng lập Pawbloom</h2>
                    <p className="mt-4 text-center text-base text-muted-foreground max-w-3xl mx-auto">
                        Đội ngũ của chúng tôi gồm những người trẻ đầy nhiệt huyết và tình yêu dành cho động vật. Chúng tôi cùng nhau
                        xây dựng Pawbloom với mong muốn tạo ra một nền tảng kết nối và mang lại cơ hội thứ hai cho những thú cưng
                        cần một mái ấm.
                    </p>

                    <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                        {teamMembers.map((member, index) => (
                            <TeamMemberCard key={index} {...member} />
                        ))}
                    </div>
                </div>
            </section>

            <section
                id="testimonials"
                className="flex w-full flex-col items-center justify-center overflow-hidden pb-28 pt-20"
            >
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
                <h2 className="mt-4 text-2xl font-bold xs:text-3xl sm:text-4xl">Khách hàng của chúng tôi nói gì</h2>
                <p className="mt-4 text-center text-base text-muted-foreground lg:max-w-[75%]">
                    Hàng trăm gia đình đã tìm thấy người bạn bốn chân của mình thông qua Pawbloom. Đây là những câu chuyện và trải
                    nghiệm của họ khi sử dụng dịch vụ của chúng tôi.
                </p>
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
            <section
                id="faqs"
                className="flex w-full flex-col items-center justify-center overflow-hidden px-6 pb-28 pt-20 xs:px-8 sm:mx-8 sm:px-0 lg:mx-auto"
            >
                <AnimatedGradientText>
                    🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
                    <span
                        className={cn(
                            `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                        )}
                    >
                        Câu hỏi thường gặp
                    </span>
                    <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                </AnimatedGradientText>
                <h2 className="mt-4 text-2xl font-bold xs:text-3xl sm:text-4xl">Những câu hỏi thường gặp</h2>
                <p className="mt-4 text-center text-base text-muted-foreground lg:max-w-[75%]">
                    Đây là một số câu hỏi mà chúng tôi thường nhận được từ người dùng. Nếu bạn không tìm thấy câu trả lời cho thắc
                    mắc của mình, hãy liên hệ với chúng tôi.
                </p>

                <Accordion type="single" collapsible className="mx-auto mt-16 w-full max-w-4xl">
                    {faqs.map((faq) => (
                        <Question key={faq.question} {...faq} />
                    ))}
                </Accordion>
            </section>
        </main>
    )
}

export default AboutPage
