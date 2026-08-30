import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import CommonPost from '@/components/common/post/CommonPost.jsx';
import SkeletonReveal from '@/components/common/SkeletonReveal.jsx';
import FeedSwitcher from '@/components/home/FeedSwitcher.jsx';
import { getAllPosts, HOME_FEEDS, setFeed } from '@/store/slices/homeSlice.js';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostSkeleton from '@/components/skeletons/PostSkeleton.jsx';

const emptyCopy = {
    [HOME_FEEDS.forYou]: 'No posts yet. Be the first to share something.',
    [HOME_FEEDS.latest]: 'No posts yet. Be the first to share something.',
    [HOME_FEEDS.following]: 'No posts from people you follow yet.',
};

const Home = () => {
    const { posts, isLoading, nextPage, hasNextPage, feed } = useSelector((state) => state.homeSlice);
    const showInitialSkeleton = posts.length === 0 && (isLoading || hasNextPage);
    const showEmpty = posts.length === 0 && !isLoading && !hasNextPage;

    const dispatch = useDispatch();
    const handlePostFetching = () => {
        if (hasNextPage === true) dispatch(getAllPosts());
    }

    const handleFeedChange = (nextFeed) => {
        if (nextFeed === feed) return;
        dispatch(setFeed(nextFeed));
        dispatch(getAllPosts());
    }

    useEffect(() => {
        handlePostFetching();
    }, []);

    return (
        <div>
            <div className='flex items-center justify-center py-2'>
                <FeedSwitcher feed={feed} onChange={handleFeedChange} />
            </div>

            <div className='mx-auto w-[50%]'>
                <InfiniteScroll
                    key={feed}
                    className='flex flex-col items-center justify-center gap-8 pt-12'
                    dataLength={posts?.length}
                    next={handlePostFetching}
                    hasMore={nextPage != null}
                    loader={<div className='w-full skeleton-swap-enter'><PostSkeleton /></div>}
                    endMessage={
                        posts.length > 0 ? (
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
                        skeleton={<PostSkeleton count={4} />}
                    >
                        {showEmpty ? (
                            <p className='py-12 text-center text-sm text-white/55'>
                                {emptyCopy[feed] || emptyCopy[HOME_FEEDS.forYou]}
                            </p>
                        ) : (
                            posts.map((post, index) => (
                                <CommonPost post={post} key={post._id} priority={index < 2} />
                            ))
                        )}
                    </SkeletonReveal>
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default Home
