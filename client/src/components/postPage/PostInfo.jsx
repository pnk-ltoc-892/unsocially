import React from 'react'
import { FaRegHeart, FaRegComment, FaRetweet } from "react-icons/fa6";
import { LuSend } from "react-icons/lu";
import PostInfoIcon from '../common/post/PostInfoIcon.jsx';
import { Bookmark, Heart, MessageCircle, Share } from 'lucide-react';


const PostInfo = ({ post }) => {
    return (
        <div>
            <div className='text-neutral-400 text-sm pb-1 ml-2'>
                <span>{(new Date(post.updatedAt)).toLocaleTimeString()}</span>
                <span className='mx-2'>|</span>
                <span>{(new Date(post.updatedAt)).toDateString()}</span>
            </div>

            <div className='border-y-[1px] py-[0.1rem] text-neutral-400 font-medium text-lg flex justify-around items-center'>
                <PostInfoIcon info={post.likes}>
                    <Heart size={20} className={"hover:text-pink-700"}/>
                </PostInfoIcon>
                <PostInfoIcon info={post.comments}>
                    <MessageCircle size={20} className={"hover:text-green-600"}/>
                </PostInfoIcon>
                <PostInfoIcon>
                    <Share size={20} className={"hover:text-blue-600"}/>
                </PostInfoIcon>
                <PostInfoIcon>
                    <Bookmark size={20} className={"hover:text-blue-600"}/>
                </PostInfoIcon>
            </div>
        </div>
    )
}

export default PostInfo