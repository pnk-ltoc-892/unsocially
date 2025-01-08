import React, { useEffect, useState } from 'react'
import { IoIosArrowDropdown } from "react-icons/io";
import AddPost from '../../components/home/AddPost.jsx';
import Post from '../../components/home/Post.jsx';
import { Button } from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '@/store/slices/post-slice.js';


const Home = () => {
    // const { isLoading, posts } = useSelector(state => state.postSlice);
    // const dispatch = useDispatch();


    // useEffect(() => {
    //     dispatch(getAllPosts());
    //     console.log('Fetching Posts');

    // }, [dispatch])


    return (
        <div className='w-[50%] mx-auto'>
            {/* // ! Add Post Filter On This Drop Icon */}
            <div className='py-2 flex justify-center items-center gap-2'>
                <span className='py-2 rounded-full'>
                    ForYou
                </span>
                <span className='text-xl p-1 hover:bg-gray-800/60 rounded-full'><IoIosArrowDropdown /></span>
            </div>
            <AddPost />
            <div className='border-[0.25px] border-neutral-100 rounded-t-xl mt-2'>
                {/* {
                    posts && posts.length > 0 && posts.map((post) => (
                        <Post key={post._id}
                            post={post}
                        />
                    ))
                } */}

                {/* // ! Replace With Infinite Scroll Pagination */}
                <Button className='w-full'>Load More</Button>
            </div>
        </div>
    )
}

export default Home