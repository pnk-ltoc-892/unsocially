import React, { useState } from 'react'
import { Share } from 'lucide-react';
import PostShareDialog from './PostShareDialog.jsx';
import { Dialog } from '../../ui/dialog.jsx';
import { useDispatch } from 'react-redux';
import { togglePostBookmark, togglePostLike } from '@/store/slices/post-slice.js';
import { Link } from 'react-router-dom';


const PostInfo = ({ postData }) => {
    // ! Storing PostData locally To Reflect Changes On Static Site
    const [post, setPost] = useState({...postData})

    const [openShareDialog, setOpenShareDialog] = useState(false);

    const dispatch = useDispatch();
    const handlePostLike = () => {   
        const value = post.isLiked ? -1 : 1;
        dispatch(togglePostLike(post._id)).then(() => {
            setPost({...post, likes: post.likes+value, isLiked: !post.isLiked});
        });
    }
    const handlePostBookmark = () => {
        dispatch(togglePostBookmark(post._id)).then(() => {
            setPost({...post, isBookmarked: !post.isBookmarked});
        });
    }

    return (
        <div>
            <PostTimeStamp post={post} />

            <div className='border-t-[1px] py-[0.1rem] text-neutral-400 font-medium text-lg flex justify-around items-center'>
                {/* // ! Like Post */}
                <PostInfoIcon info={post?.likes} onClick={handlePostLike}>
                    <Heart active={post?.isLiked} className={!post?.isLiked ? "hover:text-pink-700" : ""} />
                </PostInfoIcon>

                {/* // ! Add Post Comment */}
                <Link to={`/post/${post?._id}`}>
                    <PostInfoIcon info={post?.comments}>
                        <Comment active={false} className={"hover:text-green-600"} />
                    </PostInfoIcon>
                </Link>


                {/* // ! Bookmark Post */}
                <PostInfoIcon onClick={handlePostBookmark} >
                    <Bookmark active={post?.isBookmarked} className={!post?.isBookmarked ? "hover:text-blue-600" : ""} />
                </PostInfoIcon>

                {/* // ! Post Share Dialog */}
                <Dialog
                    open={openShareDialog}
                    onOpenChange={() => setOpenShareDialog(false)}
                >
                    <div>
                        <PostInfoIcon onClick={() => setOpenShareDialog(true)}>
                            <Share size={18} className={"hover:text-blue-600"} />
                        </PostInfoIcon>
                    </div>
                    <PostShareDialog postLink={post?._id}/>
                </Dialog>
            </div>
        </div>
    )
}


const PostTimeStamp = ({ post }) => {
    return (
        <div className='text-neutral-400 text-sm py-1 mr-2 flex justify-end'>
            <span>{(new Date(post?.updatedAt)).toLocaleTimeString()}</span>
            <span className='mx-2'>|</span>
            <span>{(new Date(post?.updatedAt)).toDateString()}</span>
        </div>
    )
}

const PostInfoIcon = ({ children, info, className, onClick }) => {
    return (
        <div onClick={onClick}
            className={`flex gap-1 items-center cursor-pointer py-[0.1rem] rounded-full ${className}`}>
            <div className='flex justify-center items-center hover:text-neutral-300 hover:bg-neutral-600/20 p-[0.4rem] rounded-full'>
                {children}
            </div>
            {info > 0 && <span className='text-[0.8rem]'>{info}</span>}
        </div>
    )
}


const Heart = ({ active, className }) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={active ? "rgb(190 24 93)" : "none"} stroke="currentColor" strokeWidth={active ? "0" : "2"} strokeLinecap="round" strokeLinejoin="round" className={`${className} lucide lucide-heart`}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
}

const Comment = ({ active, className }) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={active ? "rgb(22 163 74)" : "none"} stroke="currentColor" strokeWidth={active ? "0" : "2"} strokeLinecap="round" strokeLinejoin="round" className={`${className} lucide lucide-message-circle`}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
}

const Bookmark = ({ active, className }) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={active ? "rgb(37 99 235)" : "none"} stroke="currentColor" strokeWidth={active ? "0" : "2"} strokeLinecap="round" strokeLinejoin="round" className={`${className} lucide lucide-bookmark`}><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" /></svg>
}

export default PostInfo

