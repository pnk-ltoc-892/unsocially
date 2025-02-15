import React from 'react'
import SearchInput from '../../components/search/SearchInput.jsx'
import SearchProfileBar from '../../components/search/SearchProfileBar.jsx'
import { useSelector } from 'react-redux';
import ProfileBarSkeleton from '@/components/skeletons/ProfileBarSkeleton.jsx';

const People = () => {
    const { searchProfiles, isSearchLoading } = useSelector((state) => state.userSlice);

    return (
        <div className='w-[50%] mx-auto'>

            <div className='p-2 flex justify-center items-center'>
                Find Peoples
            </div>

            <div className='p-2'>
                <SearchInput />
            </div>

            <div className='min-h-[20vh] flex flex-col justify-center items-center gap-6 bg-[#020202] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 backdrop-saturate-100 backdrop-contrast-100 border-[1px] border-neutral-500 rounded-lg p-6 my-2'>
                {
                    isSearchLoading ? (<>
                        <ProfileBarSkeleton />
                        <ProfileBarSkeleton />
                        <ProfileBarSkeleton />
                        <ProfileBarSkeleton />
                        <ProfileBarSkeleton />
                        <ProfileBarSkeleton />
                        <ProfileBarSkeleton />
                    </>
                    )
                    : (
                        searchProfiles?.length > 0
                            ?
                            (
                                searchProfiles.map(profile => (
                                    <SearchProfileBar profile={profile} key={profile._id} />
                                ))
                            )
                            :
                            <div className='text-neutral-100 text-center font-semibold text-sm py-4'>
                                No User Found
                            </div>
                    )
                }
            </div>
        </div>
    )
}


export default People