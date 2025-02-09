import Loading from '@/components/common/Loading.jsx';
import CommonPost from '@/components/common/post/CommonPost.jsx'
import PostSkeleton from '@/components/skeletons/PostSkeleton.jsx';
import { getUserPosts } from '@/store/slices/profileSlice.js';
import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';

const Posts = () => {
    const { username } = useParams();
    const { posts, postControls: { nextPage, hasNextPage } } = useSelector(state => state.profileSlice);
    console.log(hasNextPage);
    
    const dispatch = useDispatch();
    const handlePostFetching = () => {
        if(hasNextPage === true) dispatch(getUserPosts(username));
    }


    useEffect(() => {
        handlePostFetching();
    }, [])
    return (
        <div>
            <div className='w-full mx-auto'>
                <InfiniteScroll
                    className='flex flex-col justify-center items-center gap-8 pt-6'
                    dataLength={posts?.length}
                    next={handlePostFetching}
                    hasMore={nextPage != null}
                    loader={<PostSkeleton />}
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
                            <PostSkeleton />
                    }
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default Posts