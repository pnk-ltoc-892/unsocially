import CommonPost from '@/components/common/post/CommonPost.jsx';
import SkeletonReveal from '@/components/common/SkeletonReveal.jsx';
import PostSkeleton from '@/components/skeletons/PostSkeleton.jsx';
import { getUserBookmarks } from '@/store/slices/profileSlice.js';
import { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Bookmarks = () => {
    const { username } = useParams();
    const {
        profile,
        bookmarks,
        isContentLoading,
        bookmarkControls: { nextPage, hasNextPage },
    } = useSelector(state => state.profileSlice);
    const profileReady = profile?.username === username;
    const showInitialSkeleton = !profileReady || (bookmarks.length === 0 && (isContentLoading || hasNextPage));
    const showEmpty = profileReady && bookmarks.length === 0 && !isContentLoading && !hasNextPage;

    const dispatch = useDispatch();
    const handlePostFetching = () => {
        if (hasNextPage === true) dispatch(getUserBookmarks());
    }

    useEffect(() => {
        if (profileReady) {
            handlePostFetching();
        }
    }, [username, profileReady])

    return (
        <div>
            <InfiniteScroll
                className='flex flex-col items-center justify-center gap-8 pt-6'
                dataLength={bookmarks?.length}
                next={handlePostFetching}
                hasMore={nextPage != null}
                loader={<div className='w-full skeleton-swap-enter'><PostSkeleton /></div>}
                endMessage={
                    bookmarks.length > 0 ? (
                        <div className='flex h-[50px] w-full items-center justify-center rounded-md py-4 text-center text-white/60'>
                            That's all for now.
                        </div>
                    ) : null
                }
            >
                <SkeletonReveal
                    loading={showInitialSkeleton}
                    stagger={!showEmpty}
                    className='flex w-full flex-col items-center gap-8'
                    skeleton={<PostSkeleton count={3} />}
                >
                    {showEmpty ? (
                        <p className='py-10 text-center text-sm text-white/55'>
                            No saved posts yet.
                        </p>
                    ) : (
                        bookmarks.map((data, index) => (
                            <CommonPost
                                post={data?.Post}
                                key={data?.Post?._id || data?._id}
                                priority={index < 2}
                            />
                        ))
                    )}
                </SkeletonReveal>
            </InfiniteScroll>
        </div>
    )
}

export default Bookmarks
