import CommonPost from '@/components/Common/Post/CommonPost.jsx'
import { Button } from '@/components/ui/button.jsx';
import { getUserPosts } from '@/store/slices/profileSlice.js';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';

const Posts = () => {
    const { username } = useParams();
    const { posts } = useSelector(state => state.profileSlice);

    const handlePostLoading = () => {

    }

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserPosts(username));

    }, [])
    return (
        <div>
            <div className='rounded-t-md mt-2'>
                {
                    posts.length && posts.map((post) => <CommonPost post={post} key={post._id} />)
                }
            </div>
            <div className='py-8 flex justify-center items-center gap-4' >
                <Button onClick={() => handlePostLoading(-1)}
                    // disabled={prevPage === null}
                >{"<"}</Button>
                {/* <Button>{page}</Button> */}
                <Button onClick={() => handlePostLoading(1)}
                    // disabled={nextPage === null}
                >{">"}</Button>
            </div>
        </div>
    )
}

export default Posts