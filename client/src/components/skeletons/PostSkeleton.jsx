import { Skeleton } from '../ui/skeleton.jsx'

const PostSkeletonCard = () => {
    return (
        <div aria-hidden className='glass-card w-full rounded-md px-4 pt-3 text-slate-300'>
            <div className='flex items-center gap-3 border-b border-white/10 pb-3'>
                <Skeleton className='h-10 w-10 rounded-full' />
                <div className='flex flex-col gap-2'>
                    <Skeleton className='h-4 w-40' />
                    <Skeleton className='h-3 w-24' />
                </div>
            </div>
            <div className='flex flex-col gap-2 py-4'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-5/6' />
                <Skeleton className='h-4 w-2/3' />
            </div>
            <div className='flex justify-around border-t border-white/10 py-3'>
                <Skeleton className='h-4 w-10' />
                <Skeleton className='h-4 w-10' />
                <Skeleton className='h-4 w-10' />
                <Skeleton className='h-4 w-10' />
            </div>
        </div>
    )
}

const PostSkeleton = ({ count = 1 }) => {
    return (
        <>
            {Array.from({ length: count }, (_, index) => (
                <PostSkeletonCard key={index} />
            ))}
        </>
    )
}

export default PostSkeleton
