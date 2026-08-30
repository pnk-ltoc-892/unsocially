import { ArrowRight, Cloud, Database, Monitor, Server } from 'lucide-react'

import {
    productFlow,
    productPoints,
    requestSteps,
    stack,
    talkingPoints,
} from '@/components/landing/project.js'

const HowItWorks = () => {
    return (
        <section className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28">
            <div className="glass-card rounded-3xl p-8 sm:p-10">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    For interviews
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight lg:text-4xl">
                    What it is, and how it works
                </h2>
                <p className="mt-4 max-w-2xl text-muted-foreground">
                    Unsocially is a MERN social platform. This page is the product pitch and a walkthrough
                    of the architecture you can talk through in an interview.
                </p>
            </div>

            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
                {productPoints.map((point) => (
                    <li
                        key={point}
                        className="glass-card flex items-start gap-3 rounded-xl px-4 py-3 text-sm"
                    >
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                        {point}
                    </li>
                ))}
            </ul>

            <div className="mt-16">
                <h3 className="text-xl font-semibold">How a request works</h3>
                <div className="mt-8 grid gap-6 md:grid-cols-3">
                    {requestSteps.map((step, index) => (
                        <div key={step.title} className="glass-card relative rounded-2xl p-6">
                            <span className="text-sm text-muted-foreground">{String(index + 1).padStart(2, '0')}</span>
                            <h4 className="mt-3 text-lg font-medium">{step.title}</h4>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-16 overflow-x-auto">
                <h3 className="text-xl font-semibold">Architecture</h3>
                <div className="glass-card mt-8 flex min-w-[640px] items-center justify-between gap-3 rounded-2xl px-6 py-8">
                    <ArchNode icon={Monitor} label="Vite SPA" sub="client/" />
                    <ArrowRight className="h-4 w-4 shrink-0 text-white/30" />
                    <ArchNode icon={Server} label="/api/v1" sub="Express + JWT" />
                    <ArrowRight className="h-4 w-4 shrink-0 text-white/30" />
                    <ArchNode icon={Database} label="MongoDB" sub="socap" />
                    <ArrowRight className="h-4 w-4 shrink-0 text-white/30" />
                    <ArchNode icon={Cloud} label="Cloudinary" sub="images" />
                </div>
            </div>

            <div className="mt-16">
                <h3 className="text-xl font-semibold">Product flow</h3>
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {productFlow.map((item) => (
                        <div key={item.step} className="glass-card space-y-2 rounded-2xl p-5">
                            <span className="font-brand text-3xl text-white/80">{item.step}</span>
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-16">
                <h3 className="text-xl font-semibold">Talking points</h3>
                <ul className="glass-card mt-6 space-y-3 rounded-2xl p-6">
                    {talkingPoints.map((point) => (
                        <li key={point} className="border-l border-white/20 pl-4 text-sm leading-relaxed text-muted-foreground">
                            {point}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-16 flex flex-wrap gap-2">
                {stack.map((item) => (
                    <span
                        key={item}
                        className="glass-card rounded-full px-3 py-1 text-xs font-medium text-white/80"
                    >
                        {item}
                    </span>
                ))}
            </div>
        </section>
    )
}

const ArchNode = ({ icon: Icon, label, sub }) => (
    <div className="flex flex-col items-center gap-2 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/5">
            <Icon className="h-5 w-5" />
        </span>
        <span className="text-sm font-medium">{label}</span>
        <span className="text-xs text-muted-foreground">{sub}</span>
    </div>
)

export default HowItWorks
