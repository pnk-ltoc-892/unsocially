import Wordmark from '@/components/landing/Wordmark.jsx'

const linkGroups = [
    {
        heading: 'Platform',
        links: [
            { text: 'Feed', href: '/home' },
            { text: 'Discover people', href: '/people' },
            { text: 'Search', href: '/search' },
        ],
    },
    {
        heading: 'Resources',
        links: [
            { text: 'Getting started', href: '/auth/login' },
            { text: 'Contributing', href: 'https://github.com/pnk-ltoc-892/unsocially/blob/main/CONTRIBUTING.md' },
            { text: 'Source code', href: 'https://github.com/pnk-ltoc-892/unsocially' },
        ],
    },
    {
        heading: 'Community',
        links: [
            { text: 'Report an issue', href: 'https://github.com/pnk-ltoc-892/unsocially/issues' },
            { text: 'Discussions', href: 'https://github.com/pnk-ltoc-892/unsocially/discussions' },
        ],
    },
]

const Footer = () => {
    return (
        <footer className="relative border-t border-white/10 py-12">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-10">
                    <Wordmark className="text-4xl" />
                </div>
                <div className="grid grid-cols-2 gap-8 lg:grid-cols-3">
                    {linkGroups.map(({ heading, links }) => (
                        <div key={heading}>
                            <h3 className="mb-4 text-sm font-semibold text-foreground">{heading}</h3>
                            <ul className="space-y-2">
                                {links.map((link) => (
                                    <li key={link.text}>
                                        <a
                                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                            href={link.href}
                                        >
                                            {link.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <p className="mt-10 border-t border-white/10 pt-6 text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} unsocially
                </p>
            </div>
        </footer>
    )
}

export default Footer
