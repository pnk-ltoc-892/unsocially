import React from 'react'
import SearchInput from '../../components/search/SearchInput.jsx'
import SearchProfileBar from '../../components/search/SearchProfileBar.jsx'
import { useSelector } from 'react-redux';
import ProfileBarSkeleton from '@/components/skeletons/ProfileBarSkeleton.jsx';
import SkeletonReveal from '@/components/common/SkeletonReveal.jsx';

const People = () => {
    const { searchProfiles, isSearchLoading } = useSelector((state) => state.userSlice);

    return (
        <div className='w-[50%] mx-auto'>

            <div className='p-2 flex justify-center items-center'>
                Find people
            </div>

            <div className='p-2'>
                <SearchInput />
            </div>

            <div className='glass-card my-2 flex min-h-[20vh] flex-col items-center justify-center gap-6 rounded-lg p-6'>
                <SkeletonReveal
                    loading={isSearchLoading}
                    stagger={searchProfiles?.length > 0}
                    className='flex w-full flex-col items-center gap-6'
                    skeleton={<ProfileBarSkeleton count={6} />}
                >
                    {searchProfiles?.length > 0 ? (
                        searchProfiles.map(profile => (
                            <SearchProfileBar profile={profile} key={profile._id} />
                        ))
                    ) : (
                        <div className='py-4 text-center text-sm font-semibold text-neutral-100'>
                            No User Found
                        </div>
                    )}
                </SkeletonReveal>
            </div>
        </div>
    )
}


export default People