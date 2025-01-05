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
import { BadgePlus } from 'lucide-react';
import { toast } from '@/hooks/use-toast.js';


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
            content: postText || "",
            images: [uploadedImageUrl] || [],
        }

        dispatch(addNewPost(data)).then((data) => {
            setOpenPostDialog(false);
            setPostLoadingState(false);
            setPostText("");
            setUploadedImageUrl("");
            setImageLoadingState(false);

            // !Handled while Uploading Image
            // setPostImage(null);
            // handleRemoveImage(); // ! ?

            // ! Refetching
            // dispatch(getAllPosts());
            console.log(data.payload.message);
            toast({title: data.payload.message});
        })

        // ! Refetch the data from server, and close the dialog, and redirect user the created post
    }

    return (
        <div className='flex justify-center items-center p-2'>

            {/* // ! Add Post Dialog Trigger */}
            <div onClick={() => setOpenPostDialog(true)}
                className='max-w-content flex justify-center items-center gap-2 bg-neutral-800 px-5 py-2 text-md font-semibold text-neutral-300 rounded-lg cursor-pointer'
            >
                < BadgePlus />
                <span>New Post</span>
            </div>

            <Dialog open={openPostDialog}
                    onOpenChange={() => setOpenPostDialog(false)}
            >
                {/* // ! Dialog Pop-Up Content */}
                <DialogContent className='min-w-[50%] p-4'>
                    <DialogHeader>
                        <div className='flex justify-center items-center gap-6'>
                            <DialogTitle className='text-lg'>Create New Post</DialogTitle>
                        </div>
                    </DialogHeader>
                    <DialogDescription className='w-[90%] mx-auto'>
                        <div className='flex flex-col gap-4'>
                            {/* // ! Post Text Input */}
                            <div>
                                <Textarea placeholder="What`s Going On..."
                                    className='w-full h-32 bg-neutral-950'
                                    value={postText}
                                    onChange={(e) => setPostText(e.target.value)}
                                />
                            </div>

                            {/* // ! Post Image Input */}
                            <div className='flex justify-start items-center'>
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