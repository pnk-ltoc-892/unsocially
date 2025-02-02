import { MyProfileCard } from '@/components/Profile/MyProfileCard.jsx'
import { UserProfileCard } from '@/components/Profile/UserProfileCard.jsx'
import { toast } from '@/hooks/use-toast.js'
import { getUserProfile } from '@/store/slices/profileSlice.js'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet, useParams } from 'react-router-dom'

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
    }, [username])

    return (
        <>
            <div className='w-[80%] mx-auto flex flex-col gap-2 bg-[#020202] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 backdrop-saturate-100 backdrop-contrast-100 ' >
                <div className='mt-16' >
                    {
                        isCurrentUserProfile
                            ? <MyProfileCard profile={profile} />
                            : <UserProfileCard profile={profile} />
                    }
                </div>

                {/* // ! For Routes Stats */}
                <div className='py-2 flex justify-center items-center gap-4 text-neutral-100 text-2xl font-bold tracking-wide'>
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
            </div>
        </>
    )
}


const Link = ({ to, classname = "", children }) => {
    const styles = "hover:underline p-2 hover:underline cursor-pointer"
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