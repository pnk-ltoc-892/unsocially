import { SquarePen } from 'lucide-react'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar.jsx'
import { avatar } from '@/config/index.js'
import ProfileUpdateDialog from './ProfileUpdateDialog.jsx'
import NameBox from './ProfileCard/NameBox.jsx'
import Bio from './ProfileCard/Bio.jsx'
import ProfileStats from './ProfileCard/ProfileStats.jsx'
import AnimatedBorderWrapper from '../UI Components/AnimatedBorderWrapper.jsx'


export const MyProfileCard = ({ profile }) => {

    const [profileUpdateDialog, setProfileUpdateDialog] = useState(false);

    return (
        <>
            <div className='w-full border-[1px] border-neutral-500 rounded-lg p-10'>

                {/* // ! For Profile Info */}
                <div className='flex'>
                    {/* // ! Name Section */}
                    <NameBox profile={profile} />

                    {/* // ! Avatar Section */}
                    <div className="relative flex justify-center items-center bg-slate-100 rounded-full">

                        {/* // ! Edit Profile Icon */}
                        <div onClick={() => setProfileUpdateDialog(true)}
                            className='top-[-0.75rem] right-[0rem] z-10 absolute border-[1px] bg-black rounded-full p-[0.3rem] hover:bg-white hover:text-black cursor-pointer'>
                            <SquarePen size={20} />
                        </div>

                        {/* // ! Avatar Section*/}
                        <div class="rounded-full bg-gradient-to-tr from-indigo-600 to-pink-600 p-0.5">
                            <Avatar className='cursor-pointer w-28 h-28'>
                                <AvatarImage src={profile?.avatar || avatar} className='object-cover' />
                                <AvatarFallback>{profile?.username || ""}</AvatarFallback>
                            </Avatar>
                        </div>

                    </div>
                </div>

                <div>
                    <ProfileUpdateDialog
                        profileUpdateDialog={profileUpdateDialog}
                        setProfileUpdateDialog={setProfileUpdateDialog}
                    />
                </div>

                {/* // ! Bio Section */}
                <Bio profile={profile} />

                {/* // ! For Profile Stats */}
                <ProfileStats profile={profile} />

            </div>
        </>)
}
