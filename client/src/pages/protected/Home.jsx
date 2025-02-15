import React, { useEffect, useState } from 'react'
import { IoIosArrowDropdown } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';

import CommonPost from '@/components/common/post/CommonPost.jsx';
import { getAllPosts } from '@/store/slices/homeSlice.js';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '@/components/common/Loading.jsx';
import PostSkeleton from '@/components/skeletons/PostSkeleton.jsx';


const Home = () => {
    const { posts, nextPage, hasNextPage } = useSelector((state) => state.homeSlice);

    const dispatch = useDispatch();
    const handlePostFetching = () => {
        if (hasNextPage === true) dispatch(getAllPosts());
    }

    // ! Fetching Posts, When Component Mounts
    useEffect(() => {
        handlePostFetching();
    }, []);

    return (
        <div>
            {/* // ! Add Post Filter On This Drop Icon */}
            <div className='py-2 flex justify-center items-center gap-2'>
                <span className='py-2 rounded-full'>
                    ForYou
                </span>
                <span className='text-xl p-1 hover:bg-gray-800/60 rounded-full'><IoIosArrowDropdown /></span>
            </div>

            {/* // ! All Posts */}
            <div className='w-[50%] mx-auto'>
                <InfiniteScroll
                    className='flex flex-col justify-center items-center gap-12 pt-12'
                    dataLength={posts?.length}
                    next={handlePostFetching}
                    hasMore={nextPage != null}
                    loader={<><PostSkeleton /><PostSkeleton /></>}
                    endMessage={
                        <div className='h-[50px] w-full py-4 rounded-md text-center flex justify-center items-center'>
                            That All Daisy!
                        </div>
                    }
                >
                    {
                        posts?.length
                            ?
                            posts?.map((post, index) => <CommonPost post={post} key={index} index={index} />)
                            :
                            <>
                                <PostSkeleton />
                                <PostSkeleton />
                                <PostSkeleton />
                                <PostSkeleton />
                                <PostSkeleton />
                            </>
                    }
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default Home