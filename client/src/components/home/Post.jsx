import React from 'react'
import PostHeader from '../post/PostHeader.jsx'
import PostContent from '../post/PostContent.jsx'
import PostInfo from '../post/PostInfo.jsx'

const Post = () => {
    return (
        <div className='border-b-[0.25px]'>
            <PostHeader />
            <PostContent />
            <PostInfo />
        </div>
    )
}

export default Post