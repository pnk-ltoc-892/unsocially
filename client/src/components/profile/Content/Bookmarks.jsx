import Loading from '@/components/common/Loading.jsx';
import CommonPost from '@/components/common/post/CommonPost.jsx';
import PostSkeleton from '@/components/skeletons/PostSkeleton.jsx';
import { getUserBookmarks } from '@/store/slices/profileSlice.js';
import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';


const Bookmarks = () => {
    const { bookmarks, bookmarkControls: { nextPage, hasNextPage } } = useSelector(state => state.profileSlice);

    const dispatch = useDispatch();
    const handlePostFetching = () => {
        if(hasNextPage === true) dispatch(getUserBookmarks());
    }

    useEffect(() => {
        handlePostFetching();
    }, []);

    return (
        <div>
            <InfiniteScroll
                className='flex flex-col justify-center items-center gap-8 pt-6'
                dataLength={bookmarks?.length}
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
                    bookmarks?.length
                        ?
                        bookmarks?.map((data, index) => <CommonPost post={data?.Post} key={index} index={index} />)
                        :
                        <PostSkeleton />
                }
            </InfiniteScroll>
        </div>
    )
}

export default Bookmarks