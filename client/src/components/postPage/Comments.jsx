import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input.jsx'
import { CirclePlus, Ellipsis } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar.jsx'
import { avatar } from '@/config/index.js'
import Comment from '../Comments/Comment.jsx'
import { Form, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addPostComment, getPostComments } from '@/store/slices/commentSlice.js'
import { Button } from '../ui/button.jsx'


const Comments = ({ post }) => {
    const { postId } = useParams();
    const { user } = useSelector(state => state.auth);
    const { comments } = useSelector(state => state.commentSlice);

    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const handleAddComment = () => {
        const data = {content: comment};
        
        dispatch(addPostComment({postId, data})).then(() => {
            dispatch(getPostComments(postId));
            setComment('');
        })
    }

    useEffect(() => {
        dispatch(getPostComments(postId));
    }, [postId])

    return (
        <div className="" >
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
                    {/* <CirclePlus size={42} className='cursor-pointer p-2 rounded-full hover:bg-neutral-600/80' /> */}
                </Button>
            </div>

            {/* // ! Comments-Rendering */}
            <div className='w-full mx-auto mt-4 flex flex-col justify-start items-start gap-4'>
                <span>Comments</span>
                {
                    comments?.length > 0 &&
                    comments?.map((comment, index) => <Comment comment={comment} key={index} />)
                }
            </div>
        </div>
    )
}


export default Comments;