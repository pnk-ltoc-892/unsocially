import { Avatar, Badge } from '@mui/material'
import React from 'react'
import av from "../../../public/avatar.jpg"

const PostHeader = () => {
    return (
        <div className='p-4 flex gap-4'>
            <div className='cursor-pointer'>
                {/* // ! Link This OPen Profile PopUp Of User  As In threads*/}
                <Badge
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    badgeContent={<span className='bg-white px-1 py-[1px] rounded-full text-black'>+</span>}
                >
                    <Avatar
                        alt="Profile"
                        src={av}
                        sx={{ width: 36, height: 36 }}
                    />
                </Badge>
            </div>
            <div className='ml-2 flex flex-1 justify-between items-center'>
                <div className='flex gap-8'>
                    <div className='font-medium hover:underline cursor-pointer'>pnk.user.awesome</div>
                    <div>24h</div>
                </div>
                <div>
                    :
                </div>
            </div>

        </div>
    )
}

export default PostHeader