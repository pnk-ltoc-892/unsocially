import { cn } from '@/lib/utils'
import { features } from '@/components/landing/features.js'
import Wordmark from '@/components/landing/Wordmark.jsx'

const BrandPanel = ({ className, showWordmark = true }) => {
    return (
        <aside
            className={cn(
                'relative z-10 hidden lg:flex flex-col justify-between overflow-hidden bg-transparent p-12 text-white',
                className
            )}
        >
            <div className="relative">
                {showWordmark && <Wordmark className="text-5xl" />}
            </div>

            <div className="relative space-y-10">
                <h2 className="max-w-md text-4xl font-semibold leading-tight tracking-tight">
                    A quieter place to be social.
                </h2>

                <ul className="space-y-7">
                    {features.map(({ icon: Icon, title, description }) => (
                        <li key={title} className="flex gap-4">
                            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/5">
                                <Icon className="h-5 w-5 text-white" />
                            </span>
                            <div className="space-y-1">
                                <p className="font-medium">{title}</p>
                                <p className="max-w-sm text-sm leading-relaxed text-white/55">{description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <p className="relative text-sm text-white/40">
                Connect. Share. Engage.
            </p>
        </aside>
    )
}

export default BrandPanel
