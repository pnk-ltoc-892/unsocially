import React from 'react'
import { IoIosArrowDropdown } from "react-icons/io";
import AddPost from '../../components/home/AddPost.jsx';
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

            {/* // ! All Posts */}
            <div className='border-[0.25px] border-neutral-100 rounded-t-xl mt-2'>
                

            </div>

            {/* // ! Replace With Infinite Scroll Pagination */}
            <Button className='w-full'>Load More</Button>
        </div>
    )
}

export default Home