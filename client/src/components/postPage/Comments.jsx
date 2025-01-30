import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar.jsx'
import { avatar } from '@/config/index.js'
import Comment from '../Comments/Comment.jsx'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addPostComment, getPostComments } from '@/store/slices/commentSlice.js'
import { Button } from '../ui/button.jsx'
import { getPostById } from '@/store/slices/post-slice.js'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Loader } from 'lucide-react'


const Comments = () => {
    const { postId } = useParams();
    const { user } = useSelector(state => state.auth);
    const { comments, nextPage } = useSelector(state => state.commentSlice);

    const [page, setPage] = useState(1);
    console.log("rerender");
    
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const handleAddComment = () => {
        const data = { content: comment };
        
        dispatch(addPostComment({ postId, data })).then(() => {
            dispatch(getPostById(postId));
            handleCommentFetching();
            setComment('');
        })
    }

    const handleCommentFetching = () => {
        setTimeout(() => {
            dispatch(getPostComments({postId, page:page})).then( () => {
                setPage((prev) => prev + 1);
            } )
        }, 500);
    }

    useEffect(() => {
        handleCommentFetching();
    }, [postId])

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
                    dataLength={comments.length}
                    next={handleCommentFetching}
                    hasMore={nextPage != null}
                    loader={<Loading />}
                    endMessage={
                        <div className='h-[50px] w-full py-4 rounded-md text-center flex justify-center items-center'>
                            That All Daisy!
                        </div>
                    }
                >
                    {
                        comments?.length
                        ?
                        comments?.map((comment, index) => <Comment comment={comment} key={index} handleCommentFetching={handleCommentFetching}/>)
                        :
                        <Loading />
                    }
                </InfiniteScroll>
            </div>
        </div>
    )
}

const Loading = () => {
    return (
        <div className='flex justify-center items-center py-4 text-4xl' >
            <Loader />
        </div>
    )
}

export default Comments;