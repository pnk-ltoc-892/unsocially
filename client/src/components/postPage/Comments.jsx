import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar.jsx'
import { avatar } from '@/config/index.js'
import Comment from '../Comments/Comment.jsx'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addPostComment, getPostComments } from '@/store/slices/commentSlice.js'
import { Button } from '../ui/button.jsx'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loading from '../common/Loading.jsx'
import CommentSkeleton from '../skeletons/CommentSkeleton.jsx'


const Comments = () => {
    const { postId } = useParams();
    const { user } = useSelector(state => state.auth);
    const { comments, nextPage, hasNextPage } = useSelector(state => state.commentSlice);

    const [comment, setComment] = useState('');
    
    const dispatch = useDispatch();
    const handleAddComment = () => {
        const data = { content: comment };
        dispatch(addPostComment({ postId, data })).then(() => {
            setComment('');            
            // dispatch(addComment(comment));  // ! Need to return whole data, after applying aggregation
            window.location.reload();
        })
    }

    const handleCommentFetching = () => {
        // ! if nextPage is present or first API Call, 
        // ! Then only call API
        if(hasNextPage === true) dispatch(getPostComments(postId));
    }

    useEffect(() => {
        handleCommentFetching();
    }, [])

    return (
        <div>
            <div className='mt-4 bg-[#000000] flex justify-center items-center gap-2' >
                <div>
                    <Avatar className='cursor-pointer h-10 w-10'>
                        <AvatarImage src={user?.avatar || avatar} className='object-cover' />
                        <AvatarFallback>{user?.username[0] || ""}</AvatarFallback>
                    </Avatar>
                </div>
                <textarea
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    type="text"
                    placeholder="Add a Comment..."
                    className="flex h-[100px] w-full resize-none rounded-sm border-[1px] border-neutral-700 bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-lg"
                />
                <Button onClick={handleAddComment} disabled={comment === ''}>
                    <span>Add</span>
                </Button>
            </div>

            {/* // ! Comments-Rendering */}
            <div className=''>
                <span>Comments</span>
                <InfiniteScroll
                    className='flex flex-col justify-center items-center gap-6'
                    dataLength={comments?.length}
                    next={handleCommentFetching}
                    hasMore={nextPage != null}
                    loader={<CommentSkeleton />}
                    endMessage={
                        <div className='h-[50px] w-full py-4 rounded-md text-center flex justify-center items-center'>
                            That All Daisy!
                        </div>
                    }
                >
                    {
                        comments?.length
                            ?
                            comments?.map((comment, index) => <Comment comment={comment} key={comment?._id} />)
                            :
                            <CommentSkeleton />
                    }
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default Comments;