import { Skeleton } from '../ui/skeleton.jsx'

const ProfileBarSkeleton = ({ count = 1 }) => {
    return (
        <>
            {Array.from({ length: count }, (_, index) => (
                <div
                    key={index}
                    aria-hidden
                    className='flex w-full gap-4 rounded-xl p-2'
                >
                    <Skeleton className='h-[62px] w-[62px] rounded-full' />
                    <div className='flex flex-1 flex-col justify-center gap-2'>
                        <Skeleton className='h-4 w-40' />
                        <Skeleton className='h-3 w-24' />
                        <Skeleton className='h-3 w-3/4' />
                    </div>
                    <div className='flex items-center'>
                        <Skeleton className='h-4 w-24' />
                    </div>
                </div>
            ))}
        </>
    )
}

export default ProfileBarSkeleton
