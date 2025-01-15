import CommonPost from '@/components/common/post/CommonPost.jsx'
import React from 'react'
import { useSelector } from 'react-redux'

const Posts = () => {
    const { posts } = useSelector(state => state.profileSlice)
    return (
        <div className='rounded-t-md mt-2'>
            {
                posts.length && posts.map((post) => <CommonPost post={post} key={post._id} />)
            }
        </div>
    )
}

export default Posts