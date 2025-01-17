import { getPostComments, toggleCommentLike } from '@/store/slices/commentSlice.js';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';


const CommentInfo = ({ comment }) => {
    const { postId } = useParams();

    const dispatch = useDispatch();
    const handleCommentLike = (commentId) => {
        dispatch(toggleCommentLike(commentId)).then( () => {
            dispatch(getPostComments(postId));
        } );
    }

    return (
        <div
            className='flex items-center cursor-pointer py-[0.1rem] rounded-full'>
            <div className='flex justify-center items-center p-[0.25rem] rounded-full' onClick={() => handleCommentLike(comment._id)}>
                <Heart active={comment?.isLiked} className={!comment?.isLiked ? "hover:text-pink-700" : ""} />
            </div>
            {comment.Likes && <span className='text-[0.75rem]'>{comment.Likes}</span>}
        </div>
    )
}



const Heart = ({ active, className }) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={active ? "rgb(190 24 93)" : "none"} stroke="currentColor" strokeWidth={active ? "0" : "2"} strokeLinecap="round" strokeLinejoin="round" className={`${className} lucide lucide-heart`}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
}


export default CommentInfo;