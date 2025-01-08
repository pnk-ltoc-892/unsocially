import { SquarePen } from 'lucide-react'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar.jsx'
import { avatar } from '@/config/index.js'
import ProfileUpdateDialog from './ProfileUpdateDialog.jsx'


export const MyProfileCard = ({profile}) => {

    const [profileUpdateDialog, setProfileUpdateDialog] = useState(false);

    return (
        <>
            <div className='border-[1px] border-neutral-500 rounded-lg p-8'>

                {/* // ! For Profile Info */}
                <div className='flex'>
                    {/* // ! Name Section */}
                    <div className='flex-1 flex flex-col justify-center gap-1'>
                        <div className='text-2xl font-semibold tracking-wide'>
                            {profile?.username || ""}
                        </div>
                        <div className='text-xl font-normal text-neutral-300'>
                            {profile?.fullname || ""}
                        </div>
                    </div>

                    {/* // ! Avatar Section */}
                    <div className="relative flex justify-center items-center bg-slate-100 rounded-full">

                        {/* // ! Edit Profile Icon */}
                        <div onClick={() => setProfileUpdateDialog(true)}
                            className='top-[-0.75rem] right-[0rem] z-10 absolute border-[1px] bg-black rounded-full p-[0.3rem] hover:bg-white hover:text-black cursor-pointer'>
                            <SquarePen size={20} />
                        </div>

                        {/* // ! Avatar Section*/}
                        <Avatar className='cursor-pointer'>
                            <AvatarImage src={profile?.avatar || avatar} className='object-cover' />
                            <AvatarFallback>{profile?.username || ""}</AvatarFallback>
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
                    {profile?.bio}
                </div>

                {/* // ! For Profile Stats */}
                <div className='flex justify-start items-center text-neutral-100 text-xl font-bold tracking-wide py-4 gap-4'>
                    <div className='hover:underline'>
                        {profile.posts} Posts
                    </div>
                    <div className='px-2'>|</div>
                    <div className='hover:underline'>
                        {profile.followers} Followers
                    </div>
                    <div className='px-2'>|</div>
                    <div className='hover:underline'>
                        {profile.following} Following
                    </div>
                </div>
            </div>
        </>)
}
