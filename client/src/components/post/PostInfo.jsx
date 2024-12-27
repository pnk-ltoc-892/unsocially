import React from 'react'
import { FaRegHeart, FaRegComment, FaRetweet } from "react-icons/fa6";
import { LuSend } from "react-icons/lu";
import PostInfoIcon from '../common/post/PostInfoIcon.jsx';


const PostInfo = () => {
    return (
        <div className='w-[80%] mx-auto py-4'>
            <div className='text-neutral-400 font-medium text-lg flex justify-start items-center gap-6'>
                <PostInfoIcon info='127'>
                    <FaRegHeart />
                </PostInfoIcon>
                <PostInfoIcon info='97'>
                    <FaRegComment />
                </PostInfoIcon>
                <PostInfoIcon>
                    <FaRetweet />
                </PostInfoIcon>
                <PostInfoIcon>
                    <LuSend />
                </PostInfoIcon>
            </div>
        </div>
    )
}

export default PostInfo