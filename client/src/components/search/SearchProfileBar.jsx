import React from 'react'
import av from "../../../public/avatar.jpg"
import { Avatar } from '@mui/material'


const SearchProfileBar = () => {
    return (
        <div className="flex border-b-[1px] border-neutral-600">
            <div className="flex justify-center px-2 py-2">
                <Avatar
                    alt="Profile"
                    src={av}
                    sx={{ width: 36, height: 36 }}
                />
            </div>

            <div className='flex-1 flex flex-col p-1'>
                <div className='text-md font-semibold'>
                    pnk.dev.892
                </div>
                <div className='text-lg font-normal text-neutral-500'>
                    Pankaj Singh
                </div>
                <div className='mt-2 font-medium'>
                    999k followers
                </div>
            </div>
            <div className="flex justify-center items-start p-4">
                <button className='border border-neutral-600 font-bold rounded-lg px-6 py-1  text-white'>
                    Follow
                </button>
            </div>
        </div>
    )
}

export default SearchProfileBar