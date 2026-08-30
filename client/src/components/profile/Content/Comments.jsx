import Comment from "@/components/Comments/Comment.jsx";
import SkeletonReveal from "@/components/common/SkeletonReveal.jsx";
import CommentSkeleton from "@/components/skeletons/CommentSkeleton.jsx";
import { getUserComments } from "@/store/slices/profileSlice.js";
import { useEffect } from "react"
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";

const Comments = () => {
    const { username } = useParams();
    const {
        profile,
        comments,
        isContentLoading,
        commentControls: { nextPage, hasNextPage },
    } = useSelector(state => state.profileSlice);
    const profileReady = profile?.username === username;
    const showInitialSkeleton = !profileReady || (comments.length === 0 && (isContentLoading || hasNextPage));
    const showEmpty = profileReady && comments.length === 0 && !isContentLoading && !hasNextPage;

    const dispatch = useDispatch();
    const handleCommentFetching = () => {
        if (profile?._id && hasNextPage === true) {
            dispatch(getUserComments(profile._id));
        }
    }

    useEffect(() => {
        if (profileReady) {
            handleCommentFetching();
        }
    }, [profileReady, profile?._id])

    return (
        <div>
            <InfiniteScroll
                className='flex flex-col items-center justify-center gap-7 pt-6'
                dataLength={comments?.length}
                next={handleCommentFetching}
                hasMore={nextPage != null}
                loader={<div className='w-full skeleton-swap-enter'><CommentSkeleton /></div>}
                endMessage={
                    comments.length > 0 ? (
                        <div className='flex h-[50px] w-full items-center justify-center rounded-md py-4 text-center text-white/60'>
                            That's all for now.
                        </div>
                    ) : null
                }
            >
                <SkeletonReveal
                    loading={showInitialSkeleton}
                    stagger={!showEmpty}
                    className='flex w-full flex-col items-center gap-7'
                    skeleton={<CommentSkeleton count={3} />}
                >
                    {showEmpty ? (
                        <p className='py-10 text-center text-sm text-white/55'>
                            No comments yet.
                        </p>
                    ) : (
                        comments.map((comment) => (
                            <div key={comment._id} className="glass-card w-full rounded-xl px-4 text-slate-300">
                                <Comment comment={comment} />
                            </div>
                        ))
                    )}
                </SkeletonReveal>
            </InfiniteScroll>
        </div>
    )
}

export default Comments
