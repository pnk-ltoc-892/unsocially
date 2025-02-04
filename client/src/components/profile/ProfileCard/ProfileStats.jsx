import { BookText, UserRoundCheck, UserRoundPlus } from 'lucide-react'
import React from 'react'

const ProfileStats = ({ profile }) => {
    return (
        <div className='flex justify-center items-center text-neutral-100 text-xl font-bold tracking-wide py-4 gap-4'>

            <StatBar>
                <span>{profile?.posts}</span>
                <span>Posts</span>
                <BookText />
            </StatBar>
            <StatBar>
                <span>{profile?.followers}</span>
                <span>Followers</span>
                <UserRoundPlus />
            </StatBar>
            <StatBar>
                <span>{profile?.following}</span>
                <span>Following</span>
                <UserRoundCheck />
            </StatBar>
        </div>
    )
}

const StatBar = ({ children }) => {
    return (
        <div className='flex gap-2 items-center justify-center hover:bg-gray-500/20 px-4 py-1 rounded-lg cursor-pointer'>
            {children}
        </div>
    )
}

export default ProfileStats