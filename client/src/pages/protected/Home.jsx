import React, { useEffect, useState } from 'react'
import { IoIosArrowDropdown } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';

import CommonPost from '@/components/common/post/CommonPost.jsx';
import { Button } from '@/components/ui/button.jsx';
import { getAllPosts } from '@/store/slices/homeSlice.js';
import InfiniteScroll from 'react-infinite-scroll-component';
import { toast } from '@/hooks/use-toast.js';
import { Loader } from 'lucide-react';


const Home = () => {
    const { posts, nextPage } = useSelector((state) => state.homeSlice);

    const [page, setPage] = useState(0);
    const dispatch = useDispatch();
    const handlePostFetching = () => {
        setPage((prev) => prev + 1);
        console.log(page);

        setTimeout(() => {
            dispatch(getAllPosts(page)).then(() => {
                toast({
                    title: "Post Fetched"
                })
            });
        }, 1000);
    }

    useEffect(() => {
        handlePostFetching();
    }, [])


    return (
        <div className='bg-slate-950' >
            {/* // ! Add Post Filter On This Drop Icon */}
            <div className='py-2 flex justify-center items-center gap-2'>
                <span className='py-2 rounded-full'>
                    ForYou
                </span>
                <span className='text-xl p-1 hover:bg-gray-800/60 rounded-full'><IoIosArrowDropdown /></span>
            </div>

            {/* // ! All Posts */}
            <div className='bg-slate-900 w-[45%] mx-auto rounded-t-md mt-2'>
                <InfiniteScroll
                    dataLength={posts.length}
                    next={handlePostFetching}
                    hasMore={nextPage != null}
                    loader={<Loading />}
                    endMessage={
                        <p className='h-[200]px text-center'>
                            <b>That All Daisy!</b>
                        </p>
                    }
                >
                    {
                        posts?.length
                        ?
                        posts?.map((post, index) => <CommonPost post={post} key={index} />)
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