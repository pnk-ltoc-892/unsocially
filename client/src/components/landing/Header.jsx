import { Link } from 'react-router-dom'

import Wordmark from '@/components/landing/Wordmark.jsx'
import { Button } from '@/components/ui/button.jsx'

const Header = () => {
    return (
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-lg">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <Link to="/" className="text-foreground">
                    <Wordmark className="text-3xl" />
                </Link>

                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link to="/auth/login">Log in</Link>
                    </Button>
                    <Button asChild size="sm">
                        <Link to="/auth/login">Get started</Link>
                    </Button>
                </div>
            </div>
        </nav>
    )
}

export default Header
