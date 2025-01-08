import { UserProfileCard } from '@/components/profile/UserProfileCard.jsx'
import { toast } from '@/hooks/use-toast.js'
import { getProfileByUsername } from '@/store/slices/profileSlice.js'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserProfile = () => {
    const { userProfile } = useSelector((state) => state.profileSlice);
    const { username } = useParams();

    const dispatch = useDispatch();
    useEffect( () => {
        dispatch(getProfileByUsername(username))
        .then( () => {
            // ! Error -  Cases Not Handled
            toast({
                title:"User Profile Fetched" 
            })
        } )
    }, [dispatch] )

    return (
        <>
            <UserProfileCard profile={userProfile} />

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
        </>
    )
}

export default UserProfile;