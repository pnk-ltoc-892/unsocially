import React, { useState } from 'react'
import { Ellipsis } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar.jsx'
import { avatar } from '@/config/index.js'
import CommentInfo from './CommentInfo.jsx'


const Comment = ({ comment }) => {
    return (
        <div className='p-4 pb-1 w-full border rounded-md'>
            <div className='flex gap-2' >
                <div>
                    <Avatar className='cursor-pointer h-10 w-10'>
                        <AvatarImage src={comment?.author?.avatar || avatar} className='object-cover' />
                        <AvatarFallback>{comment?.author?.username[0] || ""}</AvatarFallback>
                    </Avatar>
                </div>
                <div className='flex flex-1 flex-col justify-start items-start'>
                    <div className='w-full flex justify-between items-center'>
                        <div>
                            <div className='text-sm font-semibold tracking-wide hover:underline'>
                                @{comment?.author?.username || ""}
                            </div>
                            <div className='text-xs font-normal text-neutral-300'>
                                {comment?.author?.fullname || ""}
                            </div>
                        </div>
                        <div className='hover:bg-neutral-600/20 rounded-full p-0.5 cursor-pointer'>
                            <Ellipsis />
                        </div>
                    </div>
                    <div className='mt-1 cursor-pointer text-md'>
                        {comment.content}
                    </div>
                </div>
            </div>
            <div className='flex justify-between items-center' >
                <CommentInfo comment={comment} />
                <CommentTimeStamp timeStamp={comment.updatedAt} />
            </div>
        </div>
    )
}

const CommentTimeStamp = ({ timeStamp }) => {
    return (
        <div className='text-neutral-400 text-xs py-1 mr-2 flex justify-end'>
            <span>{(new Date(timeStamp)).toLocaleTimeString()}</span>
            <span className='mx-2'>|</span>
            <span>{(new Date(timeStamp)).toDateString()}</span>
        </div>
    )
}

export default Comment