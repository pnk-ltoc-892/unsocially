import React from 'react'
import av from "../../../public/avatar.jpg"
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar.jsx'
import { avatar } from '@/config/index.js'
import { Ellipsis } from 'lucide-react'

const PostHeader = ({ post }) => {
    return (
        <div className='flex justify-between items-center'>
            <div className='cursor-pointer flex justify-start items-center gap-2'>
                <div>
                    <Avatar className='cursor-pointer h-10 w-10'>
                        <AvatarImage src={post?.authorDetails?.avatar || avatar} className='object-cover' />
                        <AvatarFallback>{post?.username || ""}</AvatarFallback>
                    </Avatar>
                </div>
                <div className='flex flex-col justify-center'>
                    <div className='text-sm font-semibold tracking-wide hover:underline'>
                        @{post?.authorDetails?.username || ""}
                    </div>
                    <div className='text-xs font-normal text-neutral-300'>
                        {post?.authorDetails?.fullname || ""}
                    </div>
                </div>
            </div>
            <div className='hover:bg-neutral-600/20 rounded-full p-0.5 cursor-pointer'>
                <Ellipsis />
            </div>
        </div>
    )
}

export default PostHeader