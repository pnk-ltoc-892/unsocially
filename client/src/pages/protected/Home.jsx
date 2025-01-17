import React, { useEffect } from 'react'
import { IoIosArrowDropdown } from "react-icons/io";
import AddPost from '../../components/home/AddPost.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '@/store/slices/post-slice.js';
import CommonPost from '@/components/common/post/CommonPost.jsx';
import { Button } from '@/components/ui/button.jsx';


const Home = () => {
    const { posts, prevPage, page, nextPage } = useSelector( (state) => state.postSlice );

    const dispatch = useDispatch();

    const handlePostLoading = (value) => {
        dispatch(getAllPosts(page+value));
    }

    useEffect( () => {
        dispatch(getAllPosts());
        // console.log(posts);
    }, [dispatch] ) 
    

    return (
        <div className='w-[45%] mx-auto'>
            {/* // ! Add Post Filter On This Drop Icon */}
            <div className='py-2 flex justify-center items-center gap-2'>
                <span className='py-2 rounded-full'>
                    ForYou
                </span>
                <span className='text-xl p-1 hover:bg-gray-800/60 rounded-full'><IoIosArrowDropdown /></span>
            </div>
            {/* <AddPost /> */}

            {/* // ! All Posts */}
            <div className='rounded-t-md mt-2'>
                {
                    posts.length && posts.map( (post) => <CommonPost post={post} key={post._id} /> )
                }
            </div>

            {/* // ! Replace With Infinite Scroll Pagination */}
            <div className='py-8 flex justify-center items-center gap-4' >
                <Button onClick={() => handlePostLoading(-1)}
                        disabled={prevPage === null}
                >{"<"}</Button>
                <Button>{page}</Button>
                <Button onClick={() => handlePostLoading(1)}
                        disabled={nextPage === null}
                >{">"}</Button>
            </div>
        </div>
    )
}

export default Home