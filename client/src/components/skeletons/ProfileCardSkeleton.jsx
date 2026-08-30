import { Skeleton } from '../ui/skeleton.jsx'

const ProfileCardSkeleton = ({ count = 1 }) => {
    return (
        <>
            {Array.from({ length: count }, (_, index) => (
                <div key={index} aria-hidden className='w-full p-10'>
                    <div className='flex items-center justify-between gap-4'>
                        <div className='flex flex-col gap-2'>
                            <Skeleton className='h-6 w-56' />
                            <Skeleton className='h-5 w-40' />
                        </div>
                        <Skeleton className='h-28 w-28 rounded-full' />
                    </div>
                    <div className='flex flex-col gap-3 py-6'>
                        <Skeleton className='h-5 w-full' />
                        <Skeleton className='h-5 w-4/5' />
                    </div>
                    <div className='flex justify-around gap-6'>
                        <Skeleton className='h-8 w-24' />
                        <Skeleton className='h-8 w-24' />
                        <Skeleton className='h-8 w-24' />
                    </div>
                </div>
            ))}
        </>
    )
}

export default ProfileCardSkeleton
