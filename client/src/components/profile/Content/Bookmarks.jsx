import Loading from '@/components/Common/Loading.jsx';
import CommonPost from '@/components/Common/Post/CommonPost.jsx';
import { getUserBookmarks } from '@/store/slices/profileSlice.js';
import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';


const Bookmarks = () => {
    const { bookmarks, bookmarkControls: { nextPage } } = useSelector(state => state.profileSlice);

    const dispatch = useDispatch();
    const handlePostFetching = () => {
        dispatch(getUserBookmarks());
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
                loader={<Loading />}
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
                        <Loading />
                }
            </InfiniteScroll>
        </div>
    )
}

export default Bookmarks