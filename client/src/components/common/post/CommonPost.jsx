import React from 'react'
import PostHeader from './PostHeader.jsx'
import PostContent from './PostContent.jsx'
import PostInfo from './PostInfo.jsx'
import { Link } from 'react-router-dom'

const CommonPost = ({ post }) => {
    // console.log(post._id);
    
    return (
        <div className='mt-4 border p-4 rounded-md'>
            <PostHeader post={post} />
            <Link to={`/post/${post?._id}`} className='cursor-pointer' >
                <PostContent post={post} />
            </Link>
            <PostInfo post={post} />
        </div>
    )
}

export default CommonPost