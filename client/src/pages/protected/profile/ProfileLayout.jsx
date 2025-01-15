// import { MyProfileCard } from '@/components/profile/MyProfileCard.jsx'
import React from 'react'
import { Outlet } from 'react-router-dom'


const ProfileLayout = () => {

    return (
        <div className='px-12 md:px-0 md:max-w-[60%] mx-auto my-4'>
            
            {/* // ! Profile Card */}
            <div>
                <Outlet />
            </div>

        </div>
    )
}

export default ProfileLayout