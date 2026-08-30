import { useState } from 'react'
import { Ellipsis } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar.jsx'
import { avatar } from '@/config/index.js'
import CommentInfo from './CommentInfo.jsx'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { deletePostComment, editPostComment } from '@/store/slices/commentSlice.js'
import { adjustCommentCount } from '@/store/slices/post-slice.js'
import { Link } from 'react-router-dom'
import { toast } from '@/hooks/use-toast.js'
import { Button } from '../ui/button.jsx'

const formatTimeAgo = (value) => {
    const then = new Date(value).getTime();
    if (Number.isNaN(then)) return '';
    const minutes = Math.max(0, Math.floor((Date.now() - then) / 60000));
    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d`;
    return new Date(value).toLocaleDateString();
}

const Comment = ({ comment }) => {
    const { user } = useSelector(state => state.auth);

    const [isEdit, setIsEdit] = useState(false);
    const [edit, setEdit] = useState('');

    const dispatch = useDispatch();
    const handleCommentDelete = () => {
        dispatch(deletePostComment(comment?._id))
            .unwrap()
            .then(() => {
                dispatch(adjustCommentCount(-1));
                toast({
                    title: "Comment deleted"
                });
            })
            .catch((message) => {
                toast({
                    variant: "destructive",
                    title: "Could not delete comment",
                    description: typeof message === 'string' ? message : undefined,
                });
            });
    }
    const handleCommentEdit = () => {
        const data = { content: edit };
        dispatch(editPostComment({ commentId: comment._id, data }))
            .unwrap()
            .then(() => {
                setEdit('');
                setIsEdit(false);
                toast({
                    title: "Comment updated"
                });
            })
            .catch((message) => {
                toast({
                    variant: "destructive",
                    title: "Could not update comment",
                    description: typeof message === 'string' ? message : undefined,
                });
            });
    }

    const isAuthor = user?._id === comment?.author?._id;

    return (
        <div className='flex w-full gap-3 py-3'>
            <Link to={`/profile/user/${comment?.author?.username}`} className='shrink-0'>
                <Avatar className='h-8 w-8'>
                    <AvatarImage src={comment?.author?.avatar || avatar} className='object-cover' />
                    <AvatarFallback>{comment?.author?.username?.[0] || ""}</AvatarFallback>
                </Avatar>
            </Link>

            <div className='min-w-0 flex-1'>
                <div className='flex items-start justify-between gap-2'>
                    <div className='min-w-0 text-sm leading-5'>
                        <Link
                            to={`/profile/user/${comment?.author?.username}`}
                            className='mr-1.5 font-semibold text-white hover:underline'
                        >
                            {comment?.author?.username || ''}
                        </Link>
                        {isEdit ? (
                            <div className='mt-2'>
                                <textarea
                                    onChange={(e) => setEdit(e.target.value)}
                                    value={edit}
                                    className="h-[60px] w-full resize-none rounded-md border border-white/15 bg-transparent px-2 py-1 text-sm text-white"
                                />
                                <Button onClick={handleCommentEdit} size="sm" className='mt-2 h-7 px-3' disabled={edit === ''}>
                                    Save
                                </Button>
                            </div>
                        ) : (
                            <span className='font-normal text-white/80'>
                                {comment.content}
                            </span>
                        )}
                    </div>
                    {isAuthor && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button
                                    type="button"
                                    aria-label="Comment actions"
                                    className='rounded-full p-1 text-white/40 hover:bg-white/10 hover:text-white'
                                >
                                    <Ellipsis size={16} />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel className='cursor-pointer rounded-md hover:bg-white/10' onClick={() => { setIsEdit(true); setEdit(comment.content) }}>Edit</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel className='cursor-pointer rounded-md text-red-400 hover:bg-red-500/10' onClick={handleCommentDelete}>Delete</DropdownMenuLabel>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>

                <div className='mt-1 flex items-center gap-3 text-xs text-white/40'>
                    <span>{formatTimeAgo(comment.updatedAt)}</span>
                    <CommentInfo comment={comment} />
                </div>
            </div>
        </div>
    )
}

export default Comment
