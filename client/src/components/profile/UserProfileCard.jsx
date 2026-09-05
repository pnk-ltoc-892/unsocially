import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar.jsx'
import { useDispatch } from 'react-redux'
import { avatar } from '@/config/index.js'
import { toast } from '@/hooks/use-toast.js'
import { toggleUserFollow } from '@/store/slices/profileSlice.js'
import { Button } from '../ui/button.jsx'
import NameBox from './ProfileCard/NameBox.jsx'
import Bio from './ProfileCard/Bio.jsx'
import ProfileStats from './ProfileCard/ProfileStats.jsx'
import { useOptimisticAction } from '@/hooks/useOptimisticAction.js'


export const UserProfileCard = ({ profile }) => {
    const [profileData, setProfileData] = useState(profile)
    useEffect(() => {
        setProfileData(profile);
    }, [profile?._id]);

    const dispatch = useDispatch();
    const runOptimistic = useOptimisticAction();

    const handleUserFollow = () => {
        const previous = profileData;
        const nextFollowing = !previous?.isFollowing;
        const nextFollowers = Math.max(0, (previous?.followers || 0) + (nextFollowing ? 1 : -1));

        runOptimistic(
            `follow-${previous?._id}`,
            () => setProfileData({
                ...previous,
                isFollowing: nextFollowing,
                followers: nextFollowers,
            }),
            () => dispatch(toggleUserFollow(previous?._id)).unwrap(),
            () => {
                setProfileData(previous);
                toast({
                    variant: "destructive",
                    title: nextFollowing ? "Could not follow" : "Could not unfollow",
                });
            },
        ).then((didRun) => {
            if (didRun) {
                toast({
                    title: nextFollowing ? "Followed" : "Unfollowed"
                });
            }
        }).catch(() => {});
    }

    return (
        <>
            <div className='w-full rounded-lg p-10'>
                {/* // ! For Profile Info */}
                <div className='flex'>
                    {/* // ! Name Section */}
                    <NameBox profile={profileData} />

                    {/* // ! Avatar Section */}
                    <div className="relative flex justify-center items-center bg-slate-100 rounded-full bg-gradient-to-tr from-indigo-600 to-pink-600 p-0.5">
                        <Avatar className='cursor-pointer w-28 h-28'>
                            <AvatarImage src={profileData?.avatar || avatar} className='object-cover' />
                            <AvatarFallback>{profileData?.username || ""}</AvatarFallback>
                        </Avatar>
                    </div>
                </div>

                {/* // ! Bio Section */}
                <Bio profile={profileData} />

                {/* // ! For Profile Stats */}
                <ProfileStats profile={profileData} />

                {/* // ! For Follow Button */}
                <div className='flex items-center justify-center pt-3'>
                    <ProfileButton
                        classname={profileData?.isFollowing ? "bg-[#000000] text-white hover:bg-black" : ""}
                        onClick={handleUserFollow}
                    >{profileData?.isFollowing ? "UnFollow" : "Follow"}</ProfileButton>
                </div>
            </div>
        </>)
}


const ProfileButton = ({ children, classname, onClick }) => {
    return (
        <Button onClick={onClick}
            className={`w-full py-1 text-md font-medium text-gray-900 bg-white rounded-xl border border-gray-200 focus:z-10 focus:ring-2 focus:ring-neutral-600 ${classname}`}>{children}</Button>
    )
}
