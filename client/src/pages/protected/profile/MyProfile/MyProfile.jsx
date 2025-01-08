import { MyProfileCard } from '@/components/profile/MyProfileCard.jsx';
import { getMyProfile } from '@/store/slices/profileSlice.js';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'



const MyProfile = () => {
    const { myProfile } = useSelector( (state) => state.profileSlice );

    const dispatch = useDispatch();
    useEffect( () => {
        dispatch(getMyProfile());
    }, [dispatch] )

    return (
        <>
            <MyProfileCard profile={myProfile} />

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

export default MyProfile