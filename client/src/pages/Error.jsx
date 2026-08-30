import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <div className='flex h-screen flex-col items-center justify-center gap-4 bg-black text-white'>
            <h1 className='text-3xl font-semibold tracking-tight'>
                Page not found
            </h1>
            <p className='text-sm text-white/60'>
                That path does not exist. Head back to the start.
            </p>
            <div className='flex items-center gap-4 text-sm'>
                <Link to='/' className='underline-offset-4 hover:underline'>
                    Home
                </Link>
                <Link to='/home' className='underline-offset-4 hover:underline'>
                    Feed
                </Link>
            </div>
        </div>
    )
}

export default Error
