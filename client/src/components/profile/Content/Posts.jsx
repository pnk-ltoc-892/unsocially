import CommonPost from '@/components/common/post/CommonPost.jsx'
import SkeletonReveal from '@/components/common/SkeletonReveal.jsx'
import PostSkeleton from '@/components/skeletons/PostSkeleton.jsx';
import { getUserPosts } from '@/store/slices/profileSlice.js';
import { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';

const Posts = () => {
    const { username } = useParams();
    const {
        profile,
        posts,
        isContentLoading,
        postControls: { nextPage, hasNextPage },
    } = useSelector(state => state.profileSlice);
    const profileReady = profile?.username === username;
    const showInitialSkeleton = !profileReady || (posts.length === 0 && (isContentLoading || hasNextPage));
    const showEmpty = profileReady && posts.length === 0 && !isContentLoading && !hasNextPage;

    const dispatch = useDispatch();
    const handlePostFetching = () => {
        if (hasNextPage === true) dispatch(getUserPosts(username));
    }

    useEffect(() => {
        if (profileReady) {
            handlePostFetching();
        }
    }, [username, profileReady])

    return (
        <div>
            <div className='mx-auto w-full'>
                <InfiniteScroll
                    className='flex flex-col items-center justify-center gap-8 pt-6'
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
                        skeleton={<PostSkeleton count={3} />}
                    >
                        {showEmpty ? (
                            <p className='py-10 text-center text-sm text-white/55'>
                                No posts yet.
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

export default Posts
