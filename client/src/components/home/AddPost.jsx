import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog.jsx';
import { Textarea } from '../ui/textarea.jsx';
import { Button } from '../ui/button.jsx';
import PostImageUpload from './PostImageUpload.jsx';
import { useDispatch } from 'react-redux';
import { addNewPost } from '@/store/slices/post-slice.js';
import { BadgePlus, Plus, SquarePlus } from 'lucide-react';
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
            
            window.location.reload();

            // !Handled while Uploading Image
            // setPostImage(null);
            // handleRemoveImage(); // ! ?

            // ! Refetching
            // dispatch(getAllPosts());
            console.log(data.payload.message);
            toast({ title: data.payload.message });
        })

        // ! Refetch the data from server, and close the dialog, and redirect user the created post
    }

    return (
        <div className='flex justify-center items-center'>

            {/* // ! Add Post Dialog Trigger */}
            <div onClick={() => setOpenPostDialog(true)}
                className=' bg-white px-5 py-2 text-md font-semibold text-neutral-900 rounded-lg cursor-pointer'
            >
                < SquarePlus />
                {/* <span>New Post</span> */}
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
                        <div className='flex gap-6 justify-center items-center '>

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

                            {/* // ! Post Text Input */}
                            <div>
                                <Textarea placeholder="What`s Going On..."
                                    className='w-full h-32 bg-neutral-950'
                                    value={postText}
                                    onChange={(e) => setPostText(e.target.value)}
                                />
                                {/* // ! Add Menu To Restrict Comments From Specific Users */}
                                <div className='hover:underline hover:bg-gray-700/80 px-3 py-1 text-neutral-300 text-sm'>
                                    AnyOne Can Reply
                                </div>
                            </div>
                            <div className='flex justify-between items-center'>
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