import { MyProfileCard } from '@/components/Profile/MyProfileCard.jsx'
import { UserProfileCard } from '@/components/Profile/UserProfileCard.jsx'
import { toast } from '@/hooks/use-toast.js'
import { getUserProfile } from '@/store/slices/profileSlice.js'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useParams } from 'react-router-dom'

const UserProfile = () => {
    const { profile, isCurrentUserProfile } = useSelector((state) => state.profileSlice);
    const { username } = useParams();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserProfile(username))
            .then(() => {
                // ! Error -  Cases Not Handled
                toast({
                    title: "User Profile Fetched"
                })
            })
    }, [dispatch])

    return (
        <>
            {
                isCurrentUserProfile
                    ? <MyProfileCard profile={profile} />
                    : <UserProfileCard profile={profile} />
            }

            <div className='mt-10 border-[1px] border-neutral-500 rounded-lg'>
                {/* // ! For Routes Stats */}
                <div className='flex justify-center items-center text-neutral-100 text-xl font-bold tracking-wide py-4'>
                    <Link to={'./'} className='hover:underline cursor-pointer'>
                        Posts
                    </Link>
                    <div className='px-2'>|</div>
                    <Link to={'./comments'} className='hover:underline cursor-pointer'>
                        Comments
                    </Link>
                    <div className='px-2'>|</div>
                    <Link to={'./saved'} className='hover:underline cursor-pointer'>
                        Saved
                    </Link>
                </div>
            </div>
            <div className='mt-10 border-[1px] border-neutral-500 rounded-lg'>
                <Outlet />
            </div>
        </>
    )
}

export default UserProfile;