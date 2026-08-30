import Wordmark from '@/components/landing/Wordmark.jsx'

const Heading = () => {
    return (
        <div className="flex flex-col items-center lg:items-start">
            <span className="text-center text-lg font-medium tracking-wide text-muted-foreground sm:text-xl lg:text-left">
                Get Social
            </span>
            <Wordmark className="text-6xl sm:text-7xl xl:text-8xl" />
        </div>
    )
}

export default Heading
