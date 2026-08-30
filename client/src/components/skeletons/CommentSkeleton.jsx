import { Skeleton } from '../ui/skeleton.jsx'

const CommentSkeletonCard = () => {
    return (
        <div aria-hidden className='flex w-full gap-3 py-3'>
            <Skeleton className='h-8 w-8 shrink-0 rounded-full' />
            <div className='flex flex-1 flex-col gap-2 pt-0.5'>
                <Skeleton className='h-3 w-3/4' />
                <Skeleton className='h-3 w-1/3' />
            </div>
        </div>
    )
}

const CommentSkeleton = ({ count = 1 }) => {
    return (
        <>
            {Array.from({ length: count }, (_, index) => (
                <CommentSkeletonCard key={index} />
            ))}
        </>
    )
}

export default CommentSkeleton
