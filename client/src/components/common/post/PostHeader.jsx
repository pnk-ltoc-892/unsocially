import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar.jsx'
import { avatar } from '@/config/index.js'
import { Ellipsis } from 'lucide-react'
import { Link } from 'react-router-dom'


const PostHeader = ({ post }) => {
    return (
        <div className='flex justify-between items-center border-b-[1px] pb-2'>
            <Link to={`/profile/user/${post.author.username}`} >
                <div className='cursor-pointer flex justify-start items-center gap-2'>
                    <div>
                        <Avatar className='cursor-pointer h-10 w-10'>
                            <AvatarImage src={post?.author?.avatar || avatar} className='object-cover' />
                            <AvatarFallback>{post?.author?.username[0] || ""}</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className='flex flex-col justify-center'>
                        <div className='text-sm font-semibold tracking-wide hover:underline'>
                            @{post?.author?.username || ""}
                        </div>
                        <div className='text-xs font-normal text-neutral-300'>
                            {post?.author?.fullname || ""}
                        </div>
                    </div>
                </div>
            </Link>
            <div className='hover:bg-neutral-600/20 rounded-full p-0.5 cursor-pointer'>
                <Ellipsis />
            </div>
        </div>
    )
}

export default PostHeader