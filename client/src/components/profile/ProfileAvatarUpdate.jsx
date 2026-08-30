import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar.jsx'
import { getUserProfile, updateProfileAvatar } from '@/store/slices/profileSlice.js'
import { avatar } from '@/config/index.js'
import { toast } from '@/hooks/use-toast.js'


const ProfileAvatarUpdate = () => {
    const { profile } = useSelector(state => state.profileSlice)
    const [profileAvatar, setProfileAvatar] = useState(null)
    const [imageLoadingState, setImageLoadingState] = useState(false)
    const inputRef = useRef(null)
    const dispatch = useDispatch()

    function handleImageFileChange(e) {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) setProfileAvatar(selectedFile)
    }

    async function handleAvatarUpdate() {
        const formData = new FormData()
        formData.append("imageFile", profileAvatar)
        setImageLoadingState(true)
        try {
            await dispatch(updateProfileAvatar(formData)).unwrap()
            dispatch(getUserProfile(profile.username))
            toast({ title: "Photo updated" })
        } catch (message) {
            toast({
                variant: "destructive",
                title: "Could not update photo",
                description: typeof message === "string" ? message : undefined,
            })
        } finally {
            setImageLoadingState(false)
            setProfileAvatar(null)
            if (inputRef.current) inputRef.current.value = ""
        }
    }

    useEffect(() => {
        if (profileAvatar !== null) handleAvatarUpdate()
    }, [profileAvatar])

    return (
        <div className='flex flex-col items-center gap-3'>
            <div className={`relative ${imageLoadingState ? 'opacity-50' : ''}`}>
                <Avatar className='h-24 w-24'>
                    <AvatarImage src={profile?.avatar || avatar} className='object-cover' />
                    <AvatarFallback>{profile?.username?.[0] || ''}</AvatarFallback>
                </Avatar>
            </div>
            <label
                htmlFor='avatar'
                className={`cursor-pointer text-sm font-medium text-white/70 hover:text-white ${imageLoadingState ? 'pointer-events-none text-white/35' : ''}`}
            >
                {imageLoadingState ? 'Uploading...' : 'Change photo'}
            </label>
            <input
                ref={inputRef}
                id='avatar'
                type='file'
                accept='image/*'
                className='hidden'
                disabled={imageLoadingState}
                onChange={handleImageFileChange}
            />
        </div>
    )
}

export default ProfileAvatarUpdate
