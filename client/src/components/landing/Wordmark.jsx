import { cn } from '@/lib/utils'

const Wordmark = ({ className }) => {
    return (
        <span className={cn('font-brand leading-none tracking-normal text-current', className)}>
            unsocially
        </span>
    )
}

export default Wordmark
