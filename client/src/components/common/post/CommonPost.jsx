import React from 'react'
import PostHeader from './PostHeader.jsx'
import PostContent from './PostContent.jsx'
import PostInfo from './PostInfo.jsx'
import { Link } from 'react-router-dom'

const CommonPost = ({ post, index }) => {

    return (
        <div className='bg-black border p-4 rounded-md w-full'>
            <PostHeader post={post} />
            <Link to={`/post/${post?._id}`} className='cursor-pointer' >
                <PostContent post={post} />
            </Link>
            <PostInfo postData={post}/>
        </div>
    )
}

export default CommonPost