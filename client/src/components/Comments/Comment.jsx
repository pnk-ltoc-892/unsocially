import React, { useState } from 'react'
import { Ellipsis } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar.jsx'
import { avatar } from '@/config/index.js'
import CommentInfo from './CommentInfo.jsx'

const Comment = ({ comment }) => {
    return (
        <div className='p-4 pb-1 w-full border rounded-md'>
            <div className='flex gap-2' >
                <div>
                    <Avatar className='cursor-pointer h-10 w-10'>
                        <AvatarImage src={avatar} className='object-cover' />
                        {/* <AvatarImage src={post?.author?.avatar || avatar} className='object-cover' />
                        <AvatarFallback>{post?.author?.username[0] || ""}</AvatarFallback> */}
                    </Avatar>
                </div>
                <div className='flex flex-1 flex-col justify-start items-start'>
                    <div className='w-full flex justify-between items-center'>
                        <div>
                            <div className='text-sm font-semibold tracking-wide hover:underline'>
                                {/* @{post?.author?.username || ""} */}
                                pnk.dev.ultimate
                            </div>
                            <div className='text-xs font-normal text-neutral-300'>
                                {/* {post?.author?.fullname || ""} */}
                                Pankaj Singh
                            </div>
                        </div>
                        <div className='hover:bg-neutral-600/20 rounded-full p-0.5 cursor-pointer'>
                            <Ellipsis />
                        </div>
                    </div>
                    <div className='mt-1 cursor-pointer text-md'>
                        {comment.comment}
                    </div>
                </div>
            </div>
            <div className='flex justify-between items-center' >
                <CommentInfo comment={comment} />
                <CommentTimeStamp comment={Comment} />
            </div>
        </div>
    )
}

const CommentTimeStamp = ({ comment }) => {
    return (
        <div className='text-neutral-400 text-xs py-1 mr-2 flex justify-end'>
            <span>{(new Date()).toLocaleTimeString()}</span>
            <span className='mx-2'>|</span>
            <span>{(new Date()).toDateString()}</span>
        </div>
    )
}

export default Comment