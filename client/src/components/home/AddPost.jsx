import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import av from "../../../public/avatar.jpg"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog.jsx';
import { Textarea } from '../ui/textarea.jsx';
import { Button } from '../ui/button.jsx';
import PostImageUpload from './PostImageUpload.jsx';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addNewPost, getAllPosts } from '@/store/slices/post-slice.js';


const AddPost = () => {
    const [openPostDialog, setOpenPostDialog] = useState(false);
    const [postImage, setPostImage] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const [postText, setPostText] = useState('');

    const [postLoadingState, setPostLoadingState] = useState(false);

    const dispatch = useDispatch();
    async function handleAddPost() {
        setPostLoadingState(true);
        //! if both are empty return early and show a toast
        const data = {
            text: postText || "",
            image: uploadedImageUrl || "",
        }

        dispatch(addNewPost(data)).then( () => {
            setOpenPostDialog(false);
            setPostLoadingState(false);
            setPostText("");
            setUploadedImageUrl("");
            setImageLoadingState(false);
            setPostImage(null);
            // handleRemoveImage(); // ! ?

            // ! Refetching
            dispatch(getAllPosts());
        } )

            // ! Refetch the data from server, and close the dialog, and redirect user the created post
    }

    return (
        <div className='flex justify-center items-center p-2'>

            {/* // !Trigger Start A Thought */}
            <Dialog className='min-w-max bg-neutral-950' open={openPostDialog} onClose={() => setOpenPostDialog(false)}>
                <DialogTrigger className='w-[60%]' onClick={() => setOpenPostDialog(true)}>
                    <div className='min-w-full bg-neutral-950 px-5 py-2 text-md font-semibold text-neutral-300 rounded-lg cursor-pointer'>
                        Share a thought...
                    </div>
                </DialogTrigger>

                {/* // ! Dialog Pop-Up Content */}
                <DialogContent className='min-w-[50%] p-4'>
                    <DialogHeader>
                        <div className='flex justify-start items-center gap-6'>
                            <Link to='/profile'>
                                <Avatar alt="Profile" src={av} />
                            </Link>
                            <DialogTitle className='underline text-md'>pnk.dev.op.892</DialogTitle>
                        </div>
                    </DialogHeader>
                    <DialogDescription className=''>
                        <div className='w-[84%] mx-auto flex flex-col gap-4'>

                            {/* // ! Post Text Input */}
                            <div>
                                <Textarea placeholder="Share Whats Going On..."
                                    className='w-full h-32 bg-neutral-950 font-semibold'
                                    value={postText}
                                    onChange={(e) => setPostText(e.target.value)}
                                />
                            </div>

                            {/* // ! Post Image Input */}
                            <div>
                                <PostImageUpload
                                    postImage={postImage}
                                    setPostImage={setPostImage}
                                    uploadedImageUrl={uploadedImageUrl}
                                    setUploadedImageUrl={setUploadedImageUrl}
                                    imageLoadingState={imageLoadingState}
                                    setImageLoadingState={setImageLoadingState}
                                />
                            </div>

                            <div className='flex justify-between items-center'>
                                {/* // ! Add Menu To Restrict Comments From Specific Users */}
                                <div className='hover:underline hover:bg-gray-700/80 px-3 py-1 text-neutral-300 text-sm'>
                                    AnyOne Can Reply
                                </div>
                                <div>
                                    {
                                        postLoadingState ? (
                                            <Button className='cursor-not-allowed'>Posting..</Button>
                                        )
                                            :
                                            <Button onClick={handleAddPost}>Post</Button>
                                    }
                                </div>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddPost