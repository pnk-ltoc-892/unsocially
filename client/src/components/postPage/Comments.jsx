import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar.jsx'
import { avatar } from '@/config/index.js'
import Comment from '../Comments/Comment.jsx'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addPostComment, getPostComments, resetComments } from '@/store/slices/commentSlice.js'
import { adjustCommentCount } from '@/store/slices/post-slice.js'
import InfiniteScroll from 'react-infinite-scroll-component'
import CommentSkeleton from '../skeletons/CommentSkeleton.jsx'
import SkeletonReveal from '../common/SkeletonReveal.jsx'


const Comments = () => {
    const { postId } = useParams();
    const { user } = useSelector(state => state.auth);
    const { comments, isLoading, nextPage, hasNextPage, loadedPostId } = useSelector(state => state.commentSlice);
    const showInitialSkeleton = comments.length === 0 && (isLoading || hasNextPage);
    const showEmpty = comments.length === 0 && !isLoading && !hasNextPage;

    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const dispatch = useDispatch();
    const submitComment = () => {
        const content = comment.trim();
        if (!content || isSubmitting) return;
        setIsSubmitting(true);
        dispatch(addPostComment({
            postId,
            data: { content },
            author: {
                _id: user?._id,
                username: user?.username,
                fullname: user?.fullname,
                avatar: user?.avatar,
            },
        }))
            .unwrap()
            .then(() => {
                setComment('');
                dispatch(adjustCommentCount(1));
            })
            .catch(() => {})
            .finally(() => {
                setIsSubmitting(false);
            });
    }

    const handleCommentFetching = () => {
        if (hasNextPage === true) dispatch(getPostComments(postId));
    }

    useEffect(() => {
        if (loadedPostId === postId) return;
        dispatch(resetComments());
        dispatch(getPostComments(postId));
        // loadedPostId is read once per post so toggling the panel does not refetch.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postId, dispatch])

    return (
        <section className='glass-card flex flex-col overflow-hidden rounded-2xl'>
            <div className='border-b border-white/10 px-5 py-3'>
                <h2 className='text-sm font-semibold tracking-tight text-white'>
                    {comments.length > 0 ? `${comments.length} comments` : 'Comments'}
                </h2>
            </div>

            <div className='max-h-[420px] overflow-y-auto px-5'>
                <InfiniteScroll
                    className='divide-y divide-white/5'
                    dataLength={comments?.length}
                    next={handleCommentFetching}
                    hasMore={nextPage != null}
                    loader={<div className='skeleton-swap-enter'><CommentSkeleton /></div>}
                    endMessage={null}
                >
                    <SkeletonReveal
                        loading={showInitialSkeleton}
                        stagger={!showEmpty}
                        skeleton={<CommentSkeleton count={3} />}
                    >
                        {showEmpty ? (
                            <p className='py-10 text-center text-sm text-white/45'>
                                Be the first to comment.
                            </p>
                        ) : (
                            comments.map((item) => (
                                <Comment comment={item} key={item?._id} />
                            ))
                        )}
                    </SkeletonReveal>
                </InfiniteScroll>
            </div>

            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    submitComment();
                }}
                className='flex items-center gap-3 border-t border-white/10 px-5 py-3'
            >
                <Avatar className='h-8 w-8 shrink-0'>
                    <AvatarImage src={user?.avatar || avatar} className='object-cover' />
                    <AvatarFallback>{user?.username?.[0] || ""}</AvatarFallback>
                </Avatar>
                <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="h-9 flex-1 bg-transparent text-sm text-white placeholder:text-white/35 focus-visible:outline-none"
                />
                <button
                    type="submit"
                    disabled={comment.trim() === '' || isSubmitting}
                    className='text-sm font-semibold text-white disabled:text-white/25'
                >
                    {isSubmitting ? 'Posting' : 'Post'}
                </button>
            </form>
        </section>
    )
}

export default Comments;
