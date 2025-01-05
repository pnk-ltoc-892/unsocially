import { SquarePen } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar.jsx'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '@/store/slices/profileSlice.js'
import { avatar } from '@/config/index.js'
import { Button } from '../ui/button.jsx'
import ProfileUpdateDialog from './ProfileUpdateDialog.jsx'


export const MyProfileCard = () => {
    const { isLoading, profileData } = useSelector(state => state.profileSlice);
    const dispatch = useDispatch();

    const [profileUpdateDialog, setProfileUpdateDialog] = useState(false);

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch])

    return (
        <>
            <div className='border-[1px] border-neutral-500 rounded-lg p-8'>
                {/* // ! For Profile Info */}

                {/* // ! Name Section */}
                <div className='flex'>
                    <div className='flex-1 flex flex-col justify-center gap-1'>
                        <div className='text-2xl font-semibold tracking-wide'>
                            {profileData?.username || ""}
                        </div>
                        <div className='text-xl font-normal text-neutral-300'>
                            {profileData?.fullname || ""}
                        </div>
                    </div>

                    {/* // ! Avatar Section */}
                    <div className="relative flex justify-center items-center bg-slate-100 rounded-full">
                        {/* // ! Edit Profile Avatar Icon */}
                        <div onClick={() => setProfileUpdateDialog(true)}
                            className='top-[-1rem] right-[-1rem] z-10 absolute bg-black rounded-full p-1 hover:bg-white hover:text-black cursor-pointer'>
                            <SquarePen size={30} />
                        </div>

                        {/* // ! Profile Avatar */}
                        <Avatar className='cursor-pointer'>
                            <AvatarImage src={profileData?.avatar || avatar} className='object-cover' />
                            <AvatarFallback>{profileData?.username || ""}</AvatarFallback>
                        </Avatar>
                    </div>
                </div>

                <div>
                    <ProfileUpdateDialog 
                        profileUpdateDialog={profileUpdateDialog}
                        setProfileUpdateDialog={setProfileUpdateDialog}
                    />
                </div>

                {/* // ! Bio Section */}
                <div className='max-w-lg text-md py-5'>
                    {profileData?.bio}
                </div>

                {/* // ! For Profile Stats */}
                <div className='flex justify-start items-center text-neutral-100 text-xl font-bold tracking-wide py-4'>
                    <div className='hover:underline'>
                        100 Posts
                    </div>
                    <div className='px-2'>|</div>
                    <div className='hover:underline'>
                        100 Followers
                    </div>
                    <div className='px-2'>|</div>
                    <div className='hover:underline'>
                        192 Following
                    </div>
                </div>

                {/* // ! For Follow Button */}
                <div>
                    <button type="button" className="w-full max-w-sm py-1 text-md font-medium text-gray-900 bg-white rounded-xl border border-gray-200 hover:bg-[#000000] hover:text-white focus:z-10 focus:ring-2 focus:ring-neutral-600">Follow</button>
                </div>
            </div>
        </>)
}
