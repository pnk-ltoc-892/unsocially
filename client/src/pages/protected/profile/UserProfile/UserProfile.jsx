import { MyProfileCard } from '@/components/profile/MyProfileCard.jsx'
import { UserProfileCard } from '@/components/profile/UserProfileCard.jsx'
import SkeletonReveal from '@/components/common/SkeletonReveal.jsx'
import ProfileCardSkeleton from '@/components/skeletons/ProfileCardSkeleton.jsx'
import { getUserProfile, resetProfileContent } from '@/store/slices/profileSlice.js'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet, useParams } from 'react-router-dom'

const UserProfile = () => {
    const { profile, isCurrentUserProfile } = useSelector((state) => state.profileSlice);
    const { username } = useParams();

    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        setLoading(true);
        setNotFound(false);
        dispatch(resetProfileContent());
        dispatch(getUserProfile(username))
            .unwrap()
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                setNotFound(true);
                setLoading(false);
            });
    }, [username, dispatch])

    return (
        <>
            <div className='mx-auto flex w-[80%] flex-col gap-2' >
                <div className='glass-card mt-8 rounded-xl p-2' >
                    <SkeletonReveal
                        loading={loading}
                        skeleton={<ProfileCardSkeleton />}
                    >
                        {notFound ? (
                            <div className='px-6 py-10 text-center text-neutral-100'>
                                <h1 className='text-xl font-semibold'>User not found</h1>
                                <p className='mt-2 text-sm text-white/60'>
                                    That profile does not exist or could not be loaded.
                                </p>
                            </div>
                        ) : isCurrentUserProfile
                            ? <MyProfileCard profile={profile} />
                            : <UserProfileCard profile={profile} />
                        }
                    </SkeletonReveal>
                </div>

                {!loading && !notFound && (
                    <div className='skeleton-swap-enter'>
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
                    </div>
                )}
            </div >
        </>
    )
}


const Link = ({ to, classname = "", children }) => {
    const styles = "hover:bg-gray-500/20 px-4 py-1 rounded-lg cursor-pointer"
    return (
        <NavLink to={to}
            className={classname + " " + styles}
        >
            {children}
        </NavLink>
    )
}

export default UserProfile;
