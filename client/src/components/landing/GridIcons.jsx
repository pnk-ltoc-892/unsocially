const iconClass = 'h-full w-full text-white/[0.14] animate-icon-float'

const HeartMark = ({ className, style }) => (
    <svg aria-hidden viewBox="0 0 80 80" className={className} style={style} fill="none">
        <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 7" />
        <path
            d="M40 54s-14-8.5-14-18c0-5 4-9 9-9 3 0 5 1.5 5 4 0-2.5 2-4 5-4 5 0 9 4 9 9 0 9.5-14 18-14 18z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
        />
    </svg>
)

const CommentMark = ({ className, style }) => (
    <svg aria-hidden viewBox="0 0 80 80" className={className} style={style} fill="none">
        <rect x="14" y="16" width="52" height="36" rx="10" stroke="currentColor" strokeWidth="2" />
        <path d="M28 52l-6 12 16-12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M26 30h28M26 40h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
)

const PostMark = ({ className, style }) => (
    <svg aria-hidden viewBox="0 0 80 80" className={className} style={style} fill="none">
        <rect x="12" y="14" width="56" height="52" rx="8" stroke="currentColor" strokeWidth="2" />
        <circle cx="30" cy="32" r="6" stroke="currentColor" strokeWidth="2" />
        <path d="M16 56l16-16 10 10 8-8 18 14" stroke="currentColor" strokeWidth="2" />
    </svg>
)

const FriendsMark = ({ className, style }) => (
    <svg aria-hidden viewBox="0 0 80 80" className={className} style={style} fill="none">
        <circle cx="32" cy="28" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M16 56c1.5-10 8-15 16-15s14.5 5 16 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="54" cy="30" r="7" stroke="currentColor" strokeWidth="2" />
        <path d="M48 56c1-8 5-12 11-12 3 0 6 1 8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
)

const PlusMark = ({ className, style }) => (
    <svg aria-hidden viewBox="0 0 80 80" className={className} style={style} fill="none">
        <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 7" />
        <path d="M40 22v36M22 40h36" stroke="currentColor" strokeWidth="2" />
    </svg>
)

const BookmarkMark = ({ className, style }) => (
    <svg aria-hidden viewBox="0 0 80 80" className={className} style={style} fill="none">
        <path d="M24 16h32a4 4 0 014 4v46L40 52 20 66V20a4 4 0 014-4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
)

const ShareMark = ({ className, style }) => (
    <svg aria-hidden viewBox="0 0 80 80" className={className} style={style} fill="none">
        <circle cx="56" cy="20" r="8" stroke="currentColor" strokeWidth="2" />
        <circle cx="20" cy="40" r="8" stroke="currentColor" strokeWidth="2" />
        <circle cx="56" cy="60" r="8" stroke="currentColor" strokeWidth="2" />
        <path d="M27 36l22-12M27 44l22 12" stroke="currentColor" strokeWidth="2" />
    </svg>
)

const marks = [
    { El: HeartMark, top: '7%', left: '4%', size: 72, rotate: -14 },
    { El: PlusMark, top: '12%', left: '22%', size: 56, rotate: 8 },
    { El: CommentMark, top: '6%', left: '72%', size: 64, rotate: 12 },
    { El: FriendsMark, top: '18%', left: '88%', size: 70, rotate: -8 },
    { El: PostMark, top: '28%', left: '8%', size: 60, rotate: 6 },
    { El: BookmarkMark, top: '36%', left: '93%', size: 52, rotate: 16 },
    { El: ShareMark, top: '44%', left: '3%', size: 58, rotate: -18 },
    { El: HeartMark, top: '52%', left: '78%', size: 54, rotate: 10 },
    { El: PlusMark, top: '58%', left: '16%', size: 48, rotate: -6 },
    { El: CommentMark, top: '64%', left: '91%', size: 62, rotate: -12 },
    { El: FriendsMark, top: '70%', left: '6%', size: 66, rotate: 14 },
    { El: PostMark, top: '76%', left: '68%', size: 58, rotate: -10 },
    { El: BookmarkMark, top: '82%', left: '28%', size: 50, rotate: 8 },
    { El: ShareMark, top: '88%', left: '84%', size: 56, rotate: -16 },
    { El: PlusMark, top: '93%', left: '48%', size: 44, rotate: 4 },
    { El: HeartMark, top: '40%', left: '48%', size: 40, rotate: -20 },
]

const GridIcons = () => {
    return (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            {marks.map(({ El, top, left, size, rotate }, index) => (
                <div
                    key={`${top}-${left}-${index}`}
                    className="absolute"
                    style={{
                        top,
                        left,
                        width: size,
                        height: size,
                    }}
                >
                    <El
                        className={iconClass}
                        style={{
                            '--icon-rotate': `${rotate}deg`,
                            animationDelay: `${index * 0.45}s`,
                            animationDuration: `${14 + (index % 5) * 1.6}s`,
                        }}
                    />
                </div>
            ))}
        </div>
    )
}

export default GridIcons
