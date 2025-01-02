import React from 'react'
import { FaRegHeart, FaRegComment, FaRetweet } from "react-icons/fa6";
import { LuSend } from "react-icons/lu";
import PostInfoIcon from '../common/post/PostInfoIcon.jsx';


const PostInfo = ({post}) => {
    return (
        <div className='w-[80%] mx-auto py-4'>
            <div className='text-neutral-400 font-medium text-lg flex justify-start items-center gap-6'>
                <PostInfoIcon info={post.likes.length}>
                    <FaRegHeart />
                </PostInfoIcon>
                <PostInfoIcon info={post.comments.length}>
                    <FaRegComment />
                </PostInfoIcon>
                <PostInfoIcon info={0} >
                    <FaRetweet />
                </PostInfoIcon>
                <PostInfoIcon info={post.shares} >
                    <LuSend />
                </PostInfoIcon>
            </div>
        </div>
    )
}

export default PostInfo