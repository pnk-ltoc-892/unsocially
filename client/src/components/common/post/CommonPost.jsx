import React from 'react'
import PostHeader from './PostHeader.jsx'
import PostContent from './PostContent.jsx'
import PostInfo from './PostInfo.jsx'

const CommonPost = () => {
    return (
        <div className='mt-4 border p-4 rounded-md'>
            <PostHeader post={post} />
            <PostContent post={post} />
            <PostInfo post={post} />
        </div>
    )
}

export default CommonPost