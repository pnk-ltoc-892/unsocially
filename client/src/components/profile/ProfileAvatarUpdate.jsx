import React, { useEffect, useRef, useState } from 'react'
import { Label } from '../ui/label.jsx'
import { Avatar, AvatarImage } from '../ui/avatar.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from '../ui/input.jsx'
import { getUserProfile, updateProfileAvatar } from '@/store/slices/profileSlice.js'


const ProfileAvatarUpdate = () => {
    const { profile } = useSelector(state => state.profileSlice);
    // console.log(profile);
    
    const [profileAvatar, setProfileAvatar] = useState(null);
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const inputRef = useRef(null);

    const dispatch = useDispatch();
    async function handleImageFileChange(e) {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) setProfileAvatar(selectedFile);
    }

    async function handleAvatarUpdate() {
        const formData = new FormData();
        formData.append("imageFile", profileAvatar);
        // console.log(Array.from(formData.entries()));

        setImageLoadingState(true);
        dispatch(updateProfileAvatar(formData)).then( () => {
            setImageLoadingState(false);
            setProfileAvatar(null);
            inputRef.current.value=""

            dispatch(getUserProfile(profile.username));
        } )
    }

    useEffect(() => {
        if (profileAvatar !== null) handleAvatarUpdate();
    }, [profileAvatar])

    return (
        <div className='flex flex-col justify-center items-center gap-2'>
            {
                imageLoadingState
                    ?
                    <video className='h-[8.2rem] w-[8.2rem]'
                        src="../../../public/loading.mp4" autoPlay="autoplay" muted="muted" loop="loop" playsInline="" type="video/mp4"></video>
                    :
                    <Avatar className='cursor-pointer h-28 w-28'>
                        <AvatarImage src={profile?.avatar}
                            className='object-cover'
                        />
                    </Avatar>
            }
            {
                !imageLoadingState ?
                    <Label htmlFor='avatar'
                        className="cursor-pointer bg-neutral-950 hover:bg-neutral-900 text-neutral-300 hover:text-white text-sm rounded-lg px-3 py-1"
                    >
                        Edit Profile
                    </Label> : null
            }
            <Input ref={inputRef}
                id='avatar'
                type='file'
                className='hidden'
                onChange={handleImageFileChange}
            />

        </div>
    )
}

export default ProfileAvatarUpdate