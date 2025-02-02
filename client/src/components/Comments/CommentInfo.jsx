import { toggleCommentLike } from '@/store/slices/commentSlice.js';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';


const CommentInfo = ({ comment }) => {
    const [commentData, setCommentData] = useState({ ...comment });

    const dispatch = useDispatch();
    const handleCommentLike = (commentId) => {
        const value = commentData.isLiked ? -1 : 1;
        dispatch(toggleCommentLike(commentId)).then(() => {
            setCommentData({ ...commentData, Likes: commentData.Likes + value, isLiked: !commentData.isLiked });
        });
    }

    return (
        <div
            className='flex items-center cursor-pointer py-[0.1rem] rounded-full'>
            <div className='flex justify-center items-center rounded-full' onClick={() => handleCommentLike(commentData._id)}>
                <Like active={commentData?.isLiked} className={!commentData?.isLiked ? "hover:text-green-600" : ""} />
            </div>
            {commentData.Likes > 0 && <span className='text-[0.75rem]'>{commentData.Likes}</span>}
        </div>
    )
}



const Like = ({ active, className }) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={active ? "rgb(22 163 74)" : "none"} stroke="currentColor" strokeWidth={active ? "0" : "2"} strokeLinecap="round" strokeLinejoin="round" className={`${className} lucide lucide-arrow-big-up`}><path d="M9 18v-6H5l7-7 7 7h-4v6H9z"/></svg>
}

export default CommentInfo;