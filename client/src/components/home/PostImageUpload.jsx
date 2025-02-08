import React, { useEffect, useRef, useState } from 'react'
import { Label } from '../ui/label.jsx'
import { ImagePlus } from 'lucide-react'
import { Input } from '../ui/input.jsx'
import axios from 'axios'
import { toast } from '@/hooks/use-toast.js'


const PostImageUpload = ({
    postImage,
    setPostImage,
    uploadedImageUrl,
    setUploadedImageUrl,
    imageLoadingState,
    setImageLoadingState
}) => {

    // const [postImage, setPostImage] = useState(null);
    const inputRef = useRef(null);

    function handleImageFileChange(e) {
        const selectedFile = e.target.files?.[0];
        if(selectedFile) setPostImage(selectedFile);
    }

    function handleRemoveImage() {
        setPostImage(null);
        if(inputRef.current){
            inputRef.current.value = "";
        }
    }

    async function handleImageUpload(){
        setUploadedImageUrl("");
        setImageLoadingState(true);
        const formData = new FormData();
        formData.append("imageFile", postImage);

        const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/posts/post-image`,
                formData,
                {
                    withCredentials: true,
                }
        );
        // console.log(response.data);
        if(response.data.success){
            console.log(response.data.data.secure_url);
            setUploadedImageUrl(response.data.data.secure_url);
            setImageLoadingState(false);
            setPostImage(null);
            handleRemoveImage();
        }
        else{
            // Show a error toast
            toast({
                title: "Error Uploading Image"
            });
            setUploadedImageUrl("");
            setImageLoadingState(false);
            setPostImage(null);
            handleRemoveImage();
        }
    }

    useEffect(() => {
        if(postImage !== null) handleImageUpload();
    }, [postImage])


    return (
        <>
            {/* // ! Remove Image Button */}
            <Label htmlFor='postimage' className='cursor-pointer'>
                <ImagePlus size={32} className='hover:text-white'/>
            </Label>
            <Input 
                ref={inputRef}
                id='postimage'
                type="file"
                className='hidden'
                onChange={handleImageFileChange}
            />
        </>
    )
}


export default PostImageUpload