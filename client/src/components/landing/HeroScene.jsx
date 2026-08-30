import { Bookmark, Heart, MessageCircle } from 'lucide-react'

const cards = [
    { x: -108, y: 36, z: -60, rotate: -26, scale: 0.88 },
    { x: 108, y: 44, z: -40, rotate: 24, scale: 0.9 },
    { x: 0, y: 0, z: 72, rotate: -6, scale: 1 },
]

const PostCard = ({ offset }) => {
    return (
        <div
            className="absolute left-1/2 top-10 w-[230px] rounded-2xl border border-white/20 bg-zinc-950 p-4 shadow-[0_28px_50px_rgba(0,0,0,0.65)] [transform-style:preserve-3d]"
            style={{
                transform: `translate3d(calc(-50% + ${offset.x}px), ${offset.y}px, ${offset.z}px) rotateY(${offset.rotate}deg) scale(${offset.scale})`,
            }}
        >
            <div className="flex items-center gap-3">
                <span className="h-8 w-8 rounded-full border border-white/20 bg-white/10" />
                <div className="flex-1 space-y-1.5">
                    <div className="h-2 w-20 rounded-full bg-white/40" />
                    <div className="h-1.5 w-12 rounded-full bg-white/20" />
                </div>
            </div>
            <div className="mt-4 space-y-2">
                <div className="h-1.5 w-full rounded-full bg-white/15" />
                <div className="h-1.5 w-4/5 rounded-full bg-white/10" />
                <div className="h-20 rounded-xl border border-white/10 bg-white/5" />
            </div>
            <div className="mt-4 flex items-center gap-4 text-white/70">
                <Heart className="h-4 w-4" />
                <MessageCircle className="h-4 w-4" />
                <Bookmark className="h-4 w-4" />
            </div>
        </div>
    )
}

const FrameMark = () => (
    <svg
        aria-hidden
        viewBox="0 0 80 80"
        className="absolute -right-2 top-0 h-16 w-16 text-white/25"
        fill="none"
    >
        <rect x="8" y="16" width="56" height="48" rx="8" stroke="currentColor" strokeWidth="2" />
        <circle cx="28" cy="34" r="6" stroke="currentColor" strokeWidth="2" />
        <path d="M16 56l14-16 10 10 8-8 16 14" stroke="currentColor" strokeWidth="2" />
    </svg>
)

const PlusMark = () => (
    <svg
        aria-hidden
        viewBox="0 0 120 120"
        className="absolute -bottom-4 -left-2 h-20 w-20 text-white/20"
        fill="none"
    >
        <circle cx="60" cy="60" r="48" stroke="currentColor" strokeWidth="2" strokeDasharray="6 8" />
        <path d="M60 28v64M28 60h64" stroke="currentColor" strokeWidth="2" />
    </svg>
)

const HeroScene = () => {
    return (
        <div className="relative mx-auto hidden h-[420px] w-full max-w-lg overflow-visible md:block">
            <FrameMark />
            <PlusMark />

            <div className="absolute inset-0 [perspective:1100px] [perspective-origin:50%_40%]">
                <div className="relative h-full w-full [transform-style:preserve-3d] animate-float3d">
                    {cards.map((offset) => (
                        <PostCard key={`${offset.x}-${offset.z}`} offset={offset} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HeroScene
