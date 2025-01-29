import React, { useEffect, useState } from 'react'
import { IoIosArrowDropdown } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';

import CommonPost from '@/components/Common/Post/CommonPost.jsx';
import { getAllPosts } from '@/store/slices/homeSlice.js';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader } from 'lucide-react';


const Home = () => {
    const { posts, nextPage } = useSelector((state) => state.homeSlice);

    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const handlePostFetching = () => {
        setTimeout(() => {
            dispatch(getAllPosts(page+1)).then( () => {
                setPage((prev) => prev + 1);
            } )
        }, 1000);
    }

    useEffect(() => {
        // handlePostFetching();
        dispatch(getAllPosts(1))
    }, [])


    return (
        <div className=''>
            {/* // ! Add Post Filter On This Drop Icon */}
            <div className='py-2 flex justify-center items-center gap-2'>
                <span className='py-2 rounded-full'>
                    ForYou
                </span>
                <span className='text-xl p-1 hover:bg-gray-800/60 rounded-full'><IoIosArrowDropdown /></span>
            </div>

            {/* // ! All Posts */}
            <div className='w-[45%] mx-auto'>
                <InfiniteScroll
                    className='flex flex-col justify-center items-center gap-4'
                    dataLength={posts.length}
                    next={handlePostFetching}
                    hasMore={nextPage != null}
                    loader={<Loading />}
                    endMessage={
                        <div className='w-full py-4 bg-black rounded-md text-center'>
                            That All Daisy!
                        </div>
                    }
                >
                    {
                        posts?.length
                        ?
                        posts?.map((post, index) => <CommonPost post={post} key={index} index={index} />)
                        :
                        <Loading />
                    }
                </InfiniteScroll>
            </div>
        </div>
    )
}

const Loading = () => {
    return (
        <div className='flex justify-center items-center py-4 text-4xl' >
            <Loader />
        </div>
    )
}

export default Home