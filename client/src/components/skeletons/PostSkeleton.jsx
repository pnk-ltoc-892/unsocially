import React from 'react'
import { Skeleton } from '../ui/skeleton.jsx'


const PostSkeleton = () => {
    return (
        <div className='w-[90%] relative bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-100 backdrop-saturate-100 backdrop-contrast-100 border px-[1rem] pt-[0.75rem] pb-0 rounded-md text-slate-300 bg-black mb-8 '>
            {/* // Header */}
            <div className='flex justify-between items-center border-b-[1px] pb-2'>
                <div className='cursor-pointer flex justify-start items-center gap-2'>
                    <div>
                        <Skeleton className='cursor-pointer h-10 w-10 rounded-full' />
                    </div>
                    <div className='flex flex-col justify-center gap-2'>
                        <Skeleton className='h-4 w-52' />
                        <Skeleton className='h-4 w-42' />
                    </div>
                </div>
            </div>

            {/* // Content */}
            <div className='flex flex-col justify-center gap-4 py-4'>
                <Skeleton className='h-14 w-full' />
            </div>

            {/* // Footer */}
            <div className='border-t-[1px] py-2 text-neutral-400 font-medium text-lg flex justify-around items-center'>
                <Skeleton className='h-4 w-full' />
            </div>
        </div>
    )
}

export default PostSkeleton