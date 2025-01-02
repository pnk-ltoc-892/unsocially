import React from 'react'
import PostHeader from '../post/PostHeader.jsx'
import PostContent from '../post/PostContent.jsx'
import PostInfo from '../post/PostInfo.jsx'

const Post = ({post}) => {
    return (
        <div className='border-white border-b-[0.25px]'>
            <PostHeader post={post} />
            <PostContent post={post} />
            <PostInfo post={post} />
        </div>
    )
}

export default Post