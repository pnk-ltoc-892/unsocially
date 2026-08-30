import { Link } from 'react-router-dom'
import AppBackground from '@/components/common/AppBackground.jsx'

const Error = () => {
    return (
        <div className='relative flex h-screen flex-col items-center justify-center gap-4 text-white'>
            <AppBackground />
            <div className='relative z-10 space-y-4 text-center'>
                <h1 className='text-3xl font-semibold tracking-tight'>
                    Page not found
                </h1>
                <p className='text-sm text-white/60'>
                    That path does not exist. Head back to the start.
                </p>
                <div className='flex items-center justify-center gap-4 text-sm'>
                    <Link to='/' className='underline-offset-4 hover:underline'>
                        Home
                    </Link>
                    <Link to='/home' className='underline-offset-4 hover:underline'>
                        Feed
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Error
