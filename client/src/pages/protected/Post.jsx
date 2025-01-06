import Header from '@/components/header/Header.jsx'
import PostContent from '@/components/postPage/PostContent.jsx'
import PostHeader from '@/components/postPage/PostHeader.jsx'
import PostInfo from '@/components/postPage/PostInfo.jsx'
import React from 'react'

const post = {
    _id: "677bf5e6c4d6426286063cd3",
    content: "Hello, I am Pankaj Singh, this is my very first official post on the platform this post is meant to test out the platform and do the needful changes, I am making this platform from very scratch, with further spreading out the same concept and technology to multiple sub-projects each serving its own sole purpose this is for now and let's see what happens next !",
    images: [
        "https://res.cloudinary.com/learn-backend/image/upload/v1736176934/rrfz8htrggssavifcst8.jpg"
    ],
    tags: [],
    author: "6776e4200704afc3cc619be7",
    authorDetails: {
        username: "pnk.dev.ultimate",
        fullname: "Pankaj Singh",
        avatar: "https://res.cloudinary.com/learn-backend/image/upload/v1736109771/ddsojfxs288svdce7rtd.jpg",
    },
    likes: 980,
    comments: 980,
    createdAt: "2025-01-06T15:25:26.411Z",
    updatedAt: "2025-01-06T15:25:26.411Z"
}


const Post = () => {
    return (
        <div className='h-screen overflow-y-scroll overflow-x-auto'>
            <Header />
            <div className='md:max-w-[50%] mx-auto'>
                {/* // ! Post Card */}
                <div className='mt-4 border p-4'>
                    <PostHeader post={post}/>
                    <PostContent post={post}/>
                    <PostInfo post={post}/>
                </div>
            </div>
        </div>
    )
}

export default Post;