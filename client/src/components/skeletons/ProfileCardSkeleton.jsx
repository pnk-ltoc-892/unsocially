
import React from 'react'
import { Skeleton } from '../ui/skeleton.jsx'

const ProfileCardSkeleton = () => {
    return (
        <div className='w-full border-[1px] border-neutral-500 rounded-lg p-10'>
                <div className='cursor-pointer flex justify-between items-center gap-2'>
                    <div className='flex flex-col justify-center gap-2'>
                        <Skeleton className='h-6 w-56' />
                        <Skeleton className='h-5 w-42' />
                    </div>
                    <div>
                        <Skeleton className='cursor-pointer h-28 w-28 rounded-full' />
                    </div>
                </div>

            <div className='flex flex-col justify-center gap-4 py-4'>
                <Skeleton className='h-8 w-full' />
                <Skeleton className='h-8 w-full' />
            </div>

            <div className=' py-2 text-neutral-400 font-medium text-lg flex justify-around items-center gap-8'>
                <Skeleton className='h-8 w-40' />
                <Skeleton className='h-8 w-40' />
                <Skeleton className='h-8 w-40' />
            </div>
        </div>
    )
}

export default ProfileCardSkeleton