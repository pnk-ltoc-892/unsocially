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
    }, [dispatch])

    return (
        <>
            <div className='flex flex-col gap-2' >
                <div className='w-[90%] mx-auto' >
                    {
                        isCurrentUserProfile
                            ? <MyProfileCard profile={profile} />
                            : <UserProfileCard profile={profile} />
                    }
                </div>

                {/* // ! For Routes Stats */}
                <div className='flex justify-center items-center gap-4 text-neutral-100 text-xl font-bold tracking-wide'>
                    <Link to={'./'} className='hover:underline cursor-pointer'>
                        Posts
                    </Link>
                    <div >|</div>
                    <Link to={'./comments'} className='hover:underline cursor-pointer'>
                        Comments
                    </Link>
                    {
                        isCurrentUserProfile && (
                            <>
                                <div>|</div>
                                <Link to={'./saved'} className='hover:underline cursor-pointer'>
                                    Saved
                                </Link>
                            </>)
                    }
                </div>
                <div className='w-[80%] mx-auto'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}


const Link = ({ to, classname = "", children }) => {
    const styles = "hover:underline p-2"
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