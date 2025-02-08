import React, { useState } from 'react'
import SearchInput from '../../components/search/SearchInput.jsx'
import SearchProfileBar from '../../components/search/SearchProfileBar.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from '@/components/ui/skeleton.jsx';
import ProfileBarSkeleton from '@/components/skeletons/ProfileBarSkeleton.jsx';

const People = () => {
    const { searchProfiles, isSearchLoading } = useSelector((state) => state.userSlice);
    // console.log(searchProfiles);
    const [search, setSearch] = useState(false);

    return (
        <div className='w-[50%] mx-auto'>

            <div className='p-2 flex justify-center items-center'>
                Find Peoples
            </div>

            <div className='p-2'>
                <SearchInput setSearch={setSearch}/>
            </div>

            {
                searchProfiles?.length > 0 ?
                    <div className='min-h-[20vh] flex flex-col justify-center items-center gap-6 bg-[#020202] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 backdrop-saturate-100 backdrop-contrast-100 border-[1px] border-neutral-500 rounded-lg p-6 my-2'>
                        {
                            searchProfiles?.length > 0
                                ?
                                (
                                    searchProfiles.map(profile => (
                                        <SearchProfileBar profile={profile} key={profile._id} />
                                    ))
                                )
                                :
                                !search && <div className='text-neutral-100 text-center font-semibold text-sm py-4'>
                                    No User Found
                                </div>
                        }
                        {/* <ProfileBarSkeleton /> */}
                    </div>
                    : null
            }
        </div>
    )
}


export default People