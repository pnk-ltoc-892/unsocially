import React, { useState } from 'react'
import { Ellipsis } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar.jsx'
import { avatar } from '@/config/index.js'
import CommentInfo from './CommentInfo.jsx'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { deletePostComment, editPostComment } from '@/store/slices/commentSlice.js'
import { Link, useParams } from 'react-router-dom'
import { toast } from '@/hooks/use-toast.js'
import { Button } from '../ui/button.jsx'
import { getPostById } from '@/store/slices/post-slice.js'



const Comment = ({ comment }) => {
    const { user } = useSelector(state => state.auth);

    const [isEdit, setIsEdit] = useState(false);
    const [edit, setEdit] = useState('');

    const dispatch = useDispatch();
    const handleCommentDelete = () => {
        dispatch(deletePostComment(comment?._id)).then(() => {
            toast({
                title: "Comment Deleted"
            })
            window.location.reload();
        })
    }
    const handleCommentEdit = () => {
        const data = { content: edit };
        dispatch(editPostComment({ commentId: comment._id, data })).then(() => {
            setEdit('');
            toast({
                title: "Comment Updated"
            });
            setIsEdit(false);
            window.location.reload();
        })
    }

    return (
        <div className='w-full pt-3 px-4 pb-1 border rounded-md'>
            <div className='flex justify-between items-center border-b-[1px] pb-2'>
                <Link to={`/profile/user/${comment?.author?.username}`}  >
                    <div className='cursor-pointer flex justify-start items-center gap-2'>
                        <div>
                            <Avatar className='cursor-pointer h-10 w-10'>
                                <AvatarImage src={comment?.author?.avatar || avatar} className='object-cover' />
                                <AvatarFallback>{comment?.author?.username[0] || ""}</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className='flex flex-col justify-center'>
                            <div className='text-sm font-semibold tracking-wide hover:underline'>
                                @{comment?.author?.username || ""}
                            </div>
                            <div className='text-xs font-normal text-neutral-300'>
                                {comment?.author?.fullname || ""}
                            </div>
                        </div>
                    </div>
                </Link>
                {
                    user?._id === comment?.author?._id
                        ?
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <div className='hover:bg-neutral-600/20 rounded-full p-0.5 cursor-pointer'>
                                    <Ellipsis />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='bg-black'>
                                <DropdownMenuLabel className='cursor-pointer' onClick={() => { setIsEdit(true); setEdit(comment.content) }}>Edit</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel className='cursor-pointer text-red-800' onClick={handleCommentDelete} >Delete</DropdownMenuLabel>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        : null
                }
            </div>

            <div className='cursor-pointer text-[1.125rem]'>
                {
                    isEdit
                        ?
                        <div className=''>
                            <textarea
                                onChange={(e) => setEdit(e.target.value)}
                                value={edit}
                                type="text"
                                // placeholder="Add a Comment..."
                                className="flex h-[60px] w-full resize-auto rounded-sm border-[0.5px] border-neutral-700 bg-transparent px-2 py-1"
                            />
                            <Button onClick={handleCommentEdit} className='mt-2' disabled={edit === ''} >
                                Edit
                            </Button>
                        </div>
                        :
                        <div className='pt-2 pb-1 text-[1.125rem] font-[350] text-neutral-300'>
                            {comment.content}
                        </div>
                }
            </div>
            <div className='flex justify-between items-center' >
                <CommentInfo comment={comment} />
                <CommentTimeStamp timeStamp={comment.updatedAt} />
            </div>
        </div>
    )
}

const CommentTimeStamp = ({ timeStamp }) => {
    return (
        <div className='text-neutral-400 text-sm py-1 mr-2 flex justify-end'>
            <span>{(new Date(timeStamp)).toLocaleTimeString()}</span>
            <span className='mx-2'>|</span>
            <span>{(new Date(timeStamp)).toDateString()}</span>
        </div>
    )
}

export default Comment