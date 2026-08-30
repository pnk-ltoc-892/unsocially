import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

import Footer from '@/components/landing/Footer.jsx'
import GridIcons from '@/components/landing/GridIcons.jsx'
import Header from '@/components/landing/Header.jsx'
import Heading from '@/components/landing/Heading.jsx'
import HeroScene from '@/components/landing/HeroScene.jsx'
import HowItWorks from '@/components/landing/HowItWorks.jsx'
import { features } from '@/components/landing/features.js'
import { Button } from '@/components/ui/button.jsx'

const Landing = () => {
    const { isAuthenticated } = useSelector(state => state.auth);

    if (isAuthenticated) {
        return <Navigate to="/home" replace />;
    }

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-black text-white">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:32px_32px]"
            />
            <GridIcons />

            <div className="relative">
                <Header />

                <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:py-24">
                    <div className="glass-card space-y-8 rounded-3xl p-8 sm:p-10">
                        <Heading />
                        <p className="max-w-xl text-center text-base leading-relaxed text-white/60 lg:text-left lg:text-lg">
                            Share what you are thinking, follow the people worth following, and keep
                            the conversation going. No noise, no clutter, just the good parts of
                            being social.
                        </p>
                        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                            <Button asChild size="lg">
                                <Link to="/auth/login">
                                    Get started
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <Link to="/auth/login">I already have an account</Link>
                            </Button>
                        </div>
                    </div>
                    <HeroScene />
                </section>

                <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
                    <h2 className="text-center text-3xl font-semibold tracking-tight lg:text-4xl">
                        Everything you need to stay connected
                    </h2>

                    <div className="mt-14 grid gap-6 md:grid-cols-3">
                        {features.map(({ icon: Icon, title, description }) => (
                            <div
                                key={title}
                                className="glass-card rounded-2xl p-8"
                            >
                                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20">
                                    <Icon className="h-7 w-7" />
                                </span>
                                <h3 className="mt-6 text-lg font-medium">{title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-white/55">
                                    {description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <HowItWorks />

                <section className="mx-auto max-w-7xl px-6 pb-24">
                    <div className="glass-card rounded-3xl px-8 py-16 text-center">
                        <h2 className="text-3xl font-semibold tracking-tight lg:text-4xl">
                            Ready to join in?
                        </h2>
                        <p className="mx-auto mt-3 max-w-md text-white/50">
                            Creating an account takes less than a minute.
                        </p>
                        <div className="mt-8">
                            <Button asChild size="lg" variant="secondary">
                                <Link to="/auth/login">
                                    Create your account
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </div>
    )
}

export default Landing
