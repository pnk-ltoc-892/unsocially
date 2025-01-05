import React, { useEffect, useRef, useState } from 'react'
import { Label } from '../ui/label.jsx'
import { ImagePlus } from 'lucide-react'
import { Input } from '../ui/input.jsx'
import axios from 'axios'
import { Skeleton } from '../ui/skeleton.jsx'


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
                "http://localhost:5000/api/v1/posts/post-image",
                formData,
                {
                    withCredentials: true,
                }
        );
        console.log(response.data);
        if(response.data.success){
            console.log(response.data.data.secure_url);
            setUploadedImageUrl(response.data.data.secure_url);
            setImageLoadingState(false);
            setPostImage(null);
            handleRemoveImage();
        }
        else{
            // Show a error toast
        }
    }

    useEffect(() => {
        if(postImage !== null) handleImageUpload();
    }, [postImage])


    return (
        <div>
            {
                uploadedImageUrl && (
                    <img  className='h-[250px] object-cover p-2' src={uploadedImageUrl} alt="Post-Image" />
                )
            }
            {
                imageLoadingState && (
                    <Skeleton className="h-[250px] w-[250px] rounded-xl" />
                )
            }
            {/* // ! Remove Image Button */}
            <Label htmlFor='postimage' className='m-4 cursor-pointer'>
                <ImagePlus size={32} className='hover:text-white'/>
            </Label>
            <Input 
                ref={inputRef}
                id='postimage'
                type="file"
                className='hidden'
                onChange={handleImageFileChange}
            />
        </div>
    )
}


export default PostImageUpload