import React from 'react'
import { Avatar } from '@mui/material'
import { avatar } from '@/config/index.js'


const SearchProfileBar = ({profile}) => {

    return (
        
        <div className="flex border-b-[1px] border-neutral-600 cursor-pointer mb-2">
            <div className="flex justify-center items-center px-2 py-1">
                <Avatar
                    alt="Profile"
                    src={profile?.avatar || avatar}
                    sx={{ width: 62, height: 62 }}
                />
            </div>

            <div className='flex-1 flex flex-col py-2 ml-3'>
                <div className='text-lg tracking-wide font-semibold'>
                    {profile?.username || "dev.ultimate.892"}
                </div>
                <div className='text-[1.2rem] font-normal text-neutral-300'>
                    {profile?.fullname || "User Singh"}
                </div>
                {/* <div className='mt-2 font-medium'>
                    {profile?.followers || "0"} Followers
                </div> */}
            </div>
            <div className="flex justify-center items-center">
                <button className="px-10 text-lg font-semibold text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-[#000000] hover:text-white focus:z-10 focus:ring-2 focus:ring-neutral-600">
                    Follow
                </button>
            </div>
        </div>
    )
}

export default SearchProfileBar