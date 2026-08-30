import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const EXIT_MS = 220

const prefersReducedMotion = () => (
    typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
)

const SkeletonReveal = ({
    loading,
    skeleton,
    children,
    className,
    stagger = false,
}) => {
    const [showSkeleton, setShowSkeleton] = useState(loading)
    const [exiting, setExiting] = useState(false)

    useEffect(() => {
        if (loading) {
            setShowSkeleton(true)
            setExiting(false)
            return
        }

        if (!showSkeleton) return

        if (prefersReducedMotion()) {
            setShowSkeleton(false)
            setExiting(false)
            return
        }

        setExiting(true)
        const id = window.setTimeout(() => {
            setShowSkeleton(false)
            setExiting(false)
        }, EXIT_MS)

        return () => window.clearTimeout(id)
    }, [loading, showSkeleton])

    if (showSkeleton) {
        return (
            <div
                className={cn(
                    'w-full skeleton-swap',
                    exiting && 'skeleton-swap-exit',
                    className,
                )}
            >
                {skeleton}
            </div>
        )
    }

    return (
        <div
            className={cn(
                stagger ? 'reveal-stagger' : 'skeleton-swap-enter',
                className,
            )}
        >
            {children}
        </div>
    )
}

export default SkeletonReveal
