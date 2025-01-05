import { MyProfileCard } from '@/components/profile/MyProfileCard.jsx'
import React from 'react'
import { Outlet } from 'react-router-dom'


const ProfileLayout = () => {

    return (
        <div className='md:max-w-[60%] mx-auto'>
            <div className='p-2 flex justify-center items-center'>
                My Profile
            </div>
            {/* // ! Profile Card */}
            <MyProfileCard />

            <div className='mt-10 border-[1px] border-neutral-500 rounded-lg p-8'>
                {/* // ! For Routes Stats */}
                <div className='flex justify-center items-center text-neutral-100 text-xl font-bold tracking-wide py-4'>
                    <div className='hover:underline'>
                        Posts
                    </div>
                    <div className='px-2'>|</div>
                    <div className='hover:underline'>
                        Threads
                    </div>
                    <div className='px-2'>|</div>
                    <div className='hover:underline'>
                        Reposts
                    </div>
                </div>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default ProfileLayout