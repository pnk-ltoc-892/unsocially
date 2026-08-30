import Comments from '@/components/postPage/Comments.jsx'
import PostContent from '@/components/postPage/PostContent.jsx'
import PostHeader from '@/components/postPage/PostHeader.jsx'
import PostInfo from '@/components/postPage/PostInfo.jsx'
import SkeletonReveal from '@/components/common/SkeletonReveal.jsx'
import PostSkeleton from '@/components/skeletons/PostSkeleton.jsx'
import { resetComments } from '@/store/slices/commentSlice.js'
import { getPostById } from '@/store/slices/post-slice.js'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'


const Post = () => {
    const { post, isPostLoading } = useSelector((state) => state.postSlice);
    const { postId } = useParams();
    const hasPost = Boolean(post?._id);
    const [activePostId, setActivePostId] = useState(postId);
    const [commentsOpen, setCommentsOpen] = useState(false);
    const [commentsMounted, setCommentsMounted] = useState(false);

    if (activePostId !== postId) {
        setActivePostId(postId);
        setCommentsOpen(false);
        setCommentsMounted(false);
    }

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetComments());
        dispatch(getPostById(postId));
    }, [dispatch, postId])

    useEffect(() => {
        if (commentsOpen) {
            setCommentsMounted(true);
        }
    }, [commentsOpen])

    return (
        <div className='h-screen overflow-x-hidden overflow-y-scroll'>
            <div className='mx-auto space-y-6 px-4 pb-16 md:max-w-[50%]'>
                <article className='glass-card mt-12 rounded-2xl p-5'>
                    <SkeletonReveal
                        loading={isPostLoading && !hasPost}
                        skeleton={<PostSkeleton />}
                    >
                        {!hasPost ? (
                            <p className='py-12 text-center text-sm text-white/55'>
                                This post could not be found.
                            </p>
                        ) : (
                            <>
                                <PostHeader post={post} />
                                <PostContent post={post} />
                                <PostInfo
                                    postData={post}
                                    commentsOpen={commentsOpen}
                                    onToggleComments={() => setCommentsOpen((open) => !open)}
                                />
                            </>
                        )}
                    </SkeletonReveal>
                </article>

                {hasPost && commentsMounted && (
                    <div className={commentsOpen ? undefined : 'hidden'}>
                        <Comments />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Post
