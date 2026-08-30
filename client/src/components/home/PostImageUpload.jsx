import { useEffect, useRef } from 'react'
import { ImagePlus } from 'lucide-react'
import axios from 'axios'

import { toast } from '@/hooks/use-toast.js'


const PostImageUpload = ({
    postImage,
    setPostImage,
    setUploadedImageUrl,
    imageLoadingState,
    setImageLoadingState,
}) => {
    const inputRef = useRef(null);

    function handleImageFileChange(e) {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) setPostImage(selectedFile);
    }

    function handleRemoveImage() {
        setPostImage(null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    async function handleImageUpload() {
        setUploadedImageUrl("");
        setImageLoadingState(true);
        const formData = new FormData();
        formData.append("imageFile", postImage);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/posts/post-image`,
                formData,
                { withCredentials: true },
            );
            if (response.data.success) {
                setUploadedImageUrl(response.data.data.secure_url);
            } else {
                toast({ title: "Error Uploading Image" });
                setUploadedImageUrl("");
            }
        } catch {
            toast({
                variant: "destructive",
                title: "Could not upload image",
            });
            setUploadedImageUrl("");
        } finally {
            setImageLoadingState(false);
            handleRemoveImage();
        }
    }

    useEffect(() => {
        if (postImage !== null) handleImageUpload();
    }, [postImage])

    return (
        <>
            <label
                htmlFor='postimage'
                className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-white/55 transition-colors hover:bg-white/10 hover:text-white ${imageLoadingState ? 'pointer-events-none opacity-40' : ''}`}
            >
                <ImagePlus size={20} strokeWidth={1.75} />
                <span className='sr-only'>Add image</span>
            </label>
            <input
                ref={inputRef}
                id='postimage'
                type="file"
                accept="image/*"
                className='hidden'
                disabled={imageLoadingState}
                onChange={handleImageFileChange}
            />
        </>
    )
}

export default PostImageUpload
