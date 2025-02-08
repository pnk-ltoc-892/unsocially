import React from 'react'
import { Skeleton } from '../ui/skeleton.jsx'

const ProfileBarSkeleton = () => {
    return (
        <div className='bg-[#060607] w-full hover:bg-neutral-900/40 flex gap-4 border-neutral-600 rounded-xl cursor-pointer p-4'>
            <div className='cursor-pointer flex justify-start items-center gap-2'>
                <div>
                    <Skeleton className='cursor-pointer h-10 w-10 rounded-full' />
                </div>
                <div className='flex flex-col justify-center gap-2'>
                    <Skeleton className='h-4 w-62' />
                    <Skeleton className='h-4 w-52' />
                </div>
            </div>
        </div>
    )
}

export default ProfileBarSkeleton