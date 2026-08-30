import { toggleCommentLike } from '@/store/slices/commentSlice.js';
import { useState } from 'react'
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
        <button
            type="button"
            onClick={() => handleCommentLike(commentData._id)}
            className='flex items-center gap-1 text-xs text-white/40 hover:text-white'
        >
            <Heart active={commentData?.isLiked} />
            {commentData.Likes > 0 && <span>{commentData.Likes}</span>}
            <span>{commentData?.isLiked ? 'Liked' : 'Like'}</span>
        </button>
    )
}

const Heart = ({ active }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill={active ? "rgb(190 24 93)" : "none"}
            stroke="currentColor"
            strokeWidth={active ? "0" : "2"}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
    )
}

export default CommentInfo;
