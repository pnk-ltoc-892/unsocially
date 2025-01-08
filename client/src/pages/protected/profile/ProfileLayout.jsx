// import { MyProfileCard } from '@/components/profile/MyProfileCard.jsx'
import React from 'react'
import { Outlet } from 'react-router-dom'


const ProfileLayout = () => {

    return (
        <div className='px-12 md:px-0 md:max-w-[60%] mx-auto my-4'>
            {/* <div className='p-2 flex justify-center items-center'>
                My Profile
            </div> */}

            {/* // ! Profile Card */}
            <div>
                <Outlet />
            </div>

        </div>
    )
}

export default ProfileLayout