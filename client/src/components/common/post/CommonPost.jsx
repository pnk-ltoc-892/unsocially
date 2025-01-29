import React from 'react'
import PostHeader from './PostHeader.jsx'
import PostContent from './PostContent.jsx'
import PostInfo from './PostInfo.jsx'

const CommonPost = ({ post, index }) => {

    return (
        <div className='bg-[#020202] bg-clip-padding backdrop-filter  backdrop-blur-sm bg-opacity-20 backdrop-saturate-100 backdrop-contrast-100 border p-4 pb-0 rounded-md w-full'>
            <PostHeader post={post} />
            <PostContent post={post} />
            <PostInfo postData={post} />
        </div>
    )
}

export default CommonPost