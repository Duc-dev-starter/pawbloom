"use client"

import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { LayoutBGFlicker } from "./bg"
import CountUp from "./CountUp"

interface StatItem {
    value: string
    numericValue: number
    suffix: string
    label: string
}

const StatsSection = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.3 })

    const stats: StatItem[] = [
        { value: "50+", numericValue: 50, suffix: "+", label: "Trạm cứu trợ" },
        { value: "100+", numericValue: 100, suffix: "+", label: "Bé thú cưng" },
        { value: "200+", numericValue: 200, suffix: "+", label: "Sản phẩm" },
    ]

    // Replace with your actual image URL
    const homePageImage =
        "https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1586&q=80"

    return (
        <>
            <section className="md:px-28 md:py-16" ref={ref}>
                <div className="absolute">
                    <LayoutBGFlicker
                        className="inset-0 z-0 size-full [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
                        squareSize={4}
                        gridGap={1}
                        color="#f5bfc1"
                        maxOpacity={0.5}
                        flickerChance={0.1}
                        height={450}
                    />
                </div>
                <div className="relative flex flex-col gap-5 lg:flex-row lg:gap-x-10">
                    <div className="relative z-10 flex flex-1 flex-col gap-6">
                        <h2 className="text-center font-medium italic text-brand-200 lg:text-left">
                            #cơ hội thứ 2, mái ấm mãi mãi
                        </h2>
                        <h1 className="text-center text-3xl font-semibold md:text-5xl lg:text-left">Tìm kiếm thú cưng cho bạn</h1>
                        <p className="text-center text-lg font-medium text-gray-500 md:text-xl lg:text-left">
                            Pawbloom – Nơi kết nối những trái tim yêu thương với những chú thú cưng cần được yêu thương. Chúng tôi
                            giúp tạo dựng mái ấm mới, mang lại cơ hội thứ hai cho thú cưng từ các trạm cứu trợ.
                        </p>

                        <div className="flex justify-center gap-10 lg:justify-start">
                            {stats.map((stat, index) => (
                                <div key={index} className="flex flex-col items-center gap-2 lg:items-start">
                                    <h1 className="text-3xl font-bold text-brand md:text-4xl">
                                        {isInView ? (
                                            <CountUp
                                                end={stat.numericValue}
                                                suffix={stat.suffix}
                                                className="text-3xl font-bold text-brand md:text-4xl"
                                            />
                                        ) : (
                                            stat.value
                                        )}
                                    </h1>
                                    <p className="text-sm text-gray-600 font-medium md:text-base">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative z-10 flex flex-1 justify-center">
                        <Image
                            src={homePageImage || "/placeholder.svg"}
                            alt="Cute dog with friendly expression"
                            width={500}
                            height={500}
                            className="h-auto max-w-full rounded-md object-cover"
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default StatsSection
