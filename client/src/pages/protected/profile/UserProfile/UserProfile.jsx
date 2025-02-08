import { MyProfileCard } from '@/components/profile/MyProfileCard.jsx'
import { UserProfileCard } from '@/components/profile/UserProfileCard.jsx'
import ProfileCardSkeleton from '@/components/skeletons/ProfileCardSkeleton.jsx'
import AnimatedBorderWrapper from '@/components/UI Components/AnimatedBorderWrapper.jsx'
import { toast } from '@/hooks/use-toast.js'
import { getUserProfile } from '@/store/slices/profileSlice.js'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet, useParams } from 'react-router-dom'

const UserProfile = () => {
    const { profile, isCurrentUserProfile } = useSelector((state) => state.profileSlice);
    const { username } = useParams();

    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserProfile(username))
            .then(() => {
                // ! Error -  Cases Not Handled
                // toast({
                //     title: "User Profile Fetched"
                // })
                setLoading(false);
            })
    }, [username])

    return (
        <>
            <div className='w-[80%] mx-auto flex flex-col gap-2 bg-[#020202] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 backdrop-saturate-100 backdrop-contrast-100 ' >
                <div className='mt-8' >
                    <AnimatedBorderWrapper>
                        {
                            loading
                                ? <ProfileCardSkeleton />
                                : isCurrentUserProfile
                                    ? <MyProfileCard profile={profile} />
                                    : <UserProfileCard profile={profile} />
                        }
                    </AnimatedBorderWrapper>

                </div>
                {/* <AnimatedBorderWrapper><MyProfileCard profile={profile} /></AnimatedBorderWrapper> */}

                {/* // ! For Routes Stats */}
                <div className='mt-4 py-1 flex justify-center items-center gap-4 text-neutral-100 text-xl font-bold tracking-wide'>
                    <Link to={'./'}>
                        Posts
                    </Link>
                    <div >|</div>
                    <Link to={'./comments'}>
                        Comments
                    </Link>
                    {
                        isCurrentUserProfile && (
                            <>
                                <div>|</div>
                                <Link to={'./saved'}>
                                    Saved
                                </Link>
                            </>)
                    }
                </div>
                <div className=''>
                    <Outlet />
                </div>
            </div >
        </>
    )
}


const Link = ({ to, classname = "", children }) => {
    const styles = "hover:bg-gray-500/20 px-4 py-1 rounded-lg cursor-pointer"
    return (
        <NavLink to={to}
            // className={({ isActive }) => isActive ? `underline ${styles}` : styles}
            className={classname + " " + styles}
        >
            {children}
        </NavLink>
    )
}

export default UserProfile;