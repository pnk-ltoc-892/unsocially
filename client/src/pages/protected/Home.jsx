import React from 'react'
import { IoIosArrowDropdown } from "react-icons/io";
import AddPost from '../../components/home/AddPost.jsx';
import Post from '../../components/home/Post.jsx';
import { Button } from '@mui/material';


const Home = () => {
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
            <div className='border border-neutral-900 bg-secondary rounded-t-3xl mt-2'>
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                
                {/* // ! Replace With Infinite Scroll Pagination */}
                <Button className='w-full'>Load More</Button>
            </div>
        </div>
    )
}

export default Home