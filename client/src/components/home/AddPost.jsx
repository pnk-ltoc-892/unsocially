import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog.jsx';
import { Textarea } from '../ui/textarea.jsx';
import { Button } from '../ui/button.jsx';
import PostImageUpload from './PostImageUpload.jsx';
import { useDispatch } from 'react-redux';
import { addNewPost } from '@/store/slices/post-slice.js';
import { SquarePlus } from 'lucide-react';
import { toast } from '@/hooks/use-toast.js';
import { Skeleton } from '../ui/skeleton.jsx';
import { Badge } from '../ui/badge.jsx';
import PostTag from './PostTag.jsx';


const AddPost = () => {
    const [openPostDialog, setOpenPostDialog] = useState(false);
    const [postImage, setPostImage] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const [postText, setPostText] = useState('');
    const [postTags, setPostTags] = useState([]);

    const [postLoadingState, setPostLoadingState] = useState(false);

    const dispatch = useDispatch();
    async function handleAddPost() {
        setPostLoadingState(true);
        //! if both are empty return early and show a toast
        const data = {
            content: postText || "",
            images: [uploadedImageUrl] || [],
            tags: postTags || []
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
            // console.log(data.payload.message);
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
            </div>

            <Dialog open={openPostDialog}
                onOpenChange={() => setOpenPostDialog(false)}
            >
                {/* // ! Dialog Pop-Up Content */}
                <DialogContent className='p-4'>
                    <DialogHeader>
                        <DialogTitle className='flex justify-center items-center gap-6 text-lg'>Create New Post</DialogTitle>
                    </DialogHeader>

                    <div className='flex justify-center items-center gap-2'>
                        {/* // ! Image Section */}
                        <div>
                            {
                                uploadedImageUrl && (
                                    <div className='border w-[600px] h-[500px] object-contain rounded-lg overflow-clip'>
                                        <img src={uploadedImageUrl} alt="Post-Image" />
                                    </div>
                                )
                            }
                            {
                                imageLoadingState && (
                                    <Skeleton className="w-[600px] h-[500px] rounded-lg" />
                                )
                            }
                        </div>

                        {/* // ! Post Content Section */}
                        <div>
                            <div className='p-2 flex flex-col gap-2 justify-center items-start '>
                                {/* // ! Post Text Input */}
                                <div>
                                    <Textarea placeholder="What`s Going On..."
                                        className='bg-neutral-950 h-[250px] w-[600px]'
                                        value={postText}
                                        onChange={(e) => setPostText(e.target.value)}
                                    />
                                </div>

                                {/* // ! Post Image Input */}
                                <div className='p-2'>
                                    <PostImageUpload
                                        postImage={postImage}
                                        setPostImage={setPostImage}
                                        uploadedImageUrl={uploadedImageUrl}
                                        setUploadedImageUrl={setUploadedImageUrl}
                                        imageLoadingState={imageLoadingState}
                                        setImageLoadingState={setImageLoadingState}
                                    />
                                </div>

                                {/* // ! Add Tags for Post */}
                                <div className=''>
                                    <PostTag postTags={postTags} setPostTags={setPostTags}/>
                                </div>

                                {/* // ! Add Menu To Restrict Comments From Specific Users */}
                                <div className='cursor-pointer px-3 py-1 text-neutral-300'>
                                    <Badge>AnyOne Can Reply</Badge>
                                </div>
                            </div>

                            {/* // ! Post Button */}
                            <div className='flex justify-end'>
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
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddPost