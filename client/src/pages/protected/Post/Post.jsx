import Comments from '@/components/postPage/Comments.jsx'
import PostContent from '@/components/postPage/PostContent.jsx'
import PostHeader from '@/components/postPage/PostHeader.jsx'
import PostInfo from '@/components/postPage/PostInfo.jsx'
import { getPostById } from '@/store/slices/post-slice.js'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'


const Post = () => {
    const { post } = useSelector( (state) => state.postSlice );
    const { postId } = useParams();

    const dispatch = useDispatch();
    useEffect( () => {
        dispatch(getPostById(postId));
    }, [dispatch] )


    return (
        <div className='h-screen overflow-y-scroll overflow-x-auto'>
            <div className='md:max-w-[50%] mx-auto'>
                {/* // ! Post Card */}
                <div className='bg-[#020202] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 backdrop-saturate-100 backdrop-contrast-100 mt-12 border p-4 rounded-md'>
                    <PostHeader post={post}/>
                    <PostContent post={post}/>
                    <PostInfo post={post}/>
                    <Comments post={post}/>
                </div>
            </div>
        </div>
    )
}

export default Post;