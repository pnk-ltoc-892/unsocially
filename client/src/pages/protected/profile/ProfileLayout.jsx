import React from 'react'
import { Outlet } from 'react-router-dom'
import avatar from "../../../../public/avatar.jpg"
import { Avatar, Button } from '@mui/material'
import { SquarePen } from 'lucide-react'


const profile =
{
    username: "pnk.dev.ultimate.892",
    email: "pnk1@gmail.com",
    fullname: "Pankaj Singh",
    bio: "The Official Account of Pankaj Singh, The OG Guy Amazing Personality Loved By Many Founder, CEO Osm DevTech\n#Developer #Founder #Invester",
    avatar: "https://res.cloudinary.com/learn-backend/image/upload/v1735847754/root/xuadg9wvesvfqarztabg.jpg",
    followers: "99M",
    following: "112",
}

const ProfileLayout = () => {
    // ! Should Have a separate Route for Profile Info
    // const { user } = useSelector(state => state.auth);


    return (
        <div className='max-w-[60%] mx-auto'>

            <div className='p-2 flex justify-center items-center'>
                Profile
            </div>

            <div className='border-[1px] border-neutral-500 rounded-lg p-8'>
                {/* // ! For Profile Info */}
                <div className='flex'>
                    <div className='flex-1 flex flex-col justify-center gap-1'>
                        <div className='text-2xl font-semibold tracking-wide'>
                            {profile?.username || "dev.ultimate.892"}
                        </div>
                        <div className='text-xl font-normal text-neutral-300'>
                            {profile?.fullname || "User Singh"}
                        </div>
                    </div>
                    <div className="relative flex justify-center items-center p-[1px] bg-slate-100 rounded-full">
                        {/* // ! Edit Profile Icon */}
                        <div className='top-[-1rem] right-[-1rem] z-10 absolute bg-black rounded-full p-1'>
                            <SquarePen size={30} />
                        </div>
                        {/* // ! Profile Avatar */}
                        <Avatar
                            alt="Profile"
                            src={profile?.avatar || av}
                            sx={{ width: 84, height: 84 }}
                        />
                    </div>
                </div>
                <div className='max-w-lg text-md py-5'>
                    {profile?.bio}
                </div>

                {/* // ! For Profile Stats */}
                <div className='flex justify-start items-center text-neutral-100 text-xl font-bold tracking-wide py-4'>
                    <div className='hover:underline'>
                        100 Posts
                    </div>
                    <div className='px-2'>|</div>
                    <div className='hover:underline'>
                        {profile?.followers} Followers
                    </div>
                    <div className='px-2'>|</div>
                    <div className='hover:underline'>
                        {profile?.following} Following
                    </div>
                </div>
                
                {/* // ! For Follow Button */}
                <div>
                    <button type="button" className="w-full max-w-sm py-1 text-md font-medium text-gray-900 bg-white rounded-xl border border-gray-200 hover:bg-[#000000] hover:text-white focus:z-10 focus:ring-2 focus:ring-neutral-600">Follow</button>
                </div>
            </div>
            <div className='mt-10 border-[1px] border-neutral-500 rounded-lg p-8'>
                
                {/* // ! For Routes Stats */}
                <div className='flex justify-center items-center text-neutral-100 text-xl font-bold tracking-wide py-4'>
                    <div className='hover:underline'>
                        Posts
                    </div>
                    <div className='px-2'>|</div>
                    <div className='hover:underline'>
                        Threads
                    </div>
                    <div className='px-2'>|</div>
                    <div className='hover:underline'>
                        Reposts
                    </div>
                </div>
                
                
            </div>
            <div>
                    <Outlet />
            </div>
        </div>
    )
}

export default ProfileLayout