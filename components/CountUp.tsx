"use client"

import { useEffect, useState, useRef } from "react"

interface CountUpProps {
    end: number
    duration?: number
    suffix?: string
    className?: string
}

const CountUp = ({ end, duration = 2000, suffix = "", className = "" }: CountUpProps) => {
    const [count, setCount] = useState(0)
    const countRef = useRef<number>(0)
    const startTimeRef = useRef<number | null>(null)
    const frameRef = useRef<number | null>(null)

    useEffect(() => {
        // Reset when end value changes
        countRef.current = 0
        startTimeRef.current = null

        const animate = (timestamp: number) => {
            if (startTimeRef.current === null) {
                startTimeRef.current = timestamp
            }

            const progress = timestamp - startTimeRef.current
            const progressRatio = Math.min(progress / duration, 1)

            // Easing function for smoother animation
            const easedProgress = progressRatio === 1 ? 1 : 1 - Math.pow(2, -10 * progressRatio)

            const nextCount = Math.floor(easedProgress * end)

            if (nextCount !== countRef.current) {
                countRef.current = nextCount
                setCount(nextCount)
            }

            if (progressRatio < 1) {
                frameRef.current = requestAnimationFrame(animate)
            } else {
                setCount(end)
            }
        }

        frameRef.current = requestAnimationFrame(animate)

        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current)
            }
        }
    }, [end, duration])

    return (
        <span className={className}>
            {count}
            {suffix}
        </span>
    )
}

export default CountUp
