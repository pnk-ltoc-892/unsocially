import React from 'react'
import { Avatar } from '@mui/material'
import { avatar } from '@/config/index.js'
import { Link } from 'react-router-dom'


const SearchProfileBar = ({ profile }) => {

    return (
        <Link className ="w-full"
            to={`http://localhost:5173/profile/user/${profile.username}/`}
        >
            <div className="hover:slide-top-normal bg-[#060607]  hover:bg-neutral-900/40 flex gap-4 border-neutral-600 rounded-xl cursor-pointer p-2">
                <div className="pl-2 flex justify-center items-center">
                    <Avatar
                        alt="Profile"
                        src={profile?.avatar || avatar}
                        sx={{ width: 62, height: 62 }}
                    />
                </div>

                <div className='flex-1 flex flex-col text-neutral-300'>
                    <div className='flex flex-col'>
                        <div className='text-lg tracking-wide font-semibold text-white'>
                            {profile?.username || ""}
                        </div>
                        <div className='text-[1rem] font-normal'>
                            {profile?.fullname || ""}
                        </div>
                    </div>
                    <div className='max-h-[1.6rem] max-w-full overflow-clip text-[1rem]'>
                        {profile?.bio}
                    </div>
                </div>
                <div className='flex justify-center items-center text-lg font-bold px-8'>
                    <div className='mt-2 font-medium'>
                        {profile?.Followers || "0"} Followers
                    </div>
                </div>
                {/* <div className="flex justify-center items-center">
                <button className="px-10 text-md font-semibold text-white bg-[#000] rounded-full border border-gray-200 hover:bg-white hover:text-black focus:z-10 focus:ring-2 focus:ring-neutral-600">
                    View Profile
                </button>
            </div> */}
            </div>
        </Link>
    )
}

export default SearchProfileBar