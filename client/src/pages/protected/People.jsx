import React from 'react'
import SearchInput from '../../components/search/SearchInput.jsx'
import SearchProfileBar from '../../components/search/SearchProfileBar.jsx'
import { useSelector } from 'react-redux';

const People = () => {
    const { searchProfiles } = useSelector((state) => state.userSlice);
    console.log(searchProfiles);
    
    return (
        <div className='max-w-[60%] mx-auto'>

            <div className='p-2 flex justify-center items-center'>
                Find Peoples
            </div>

            <div className='p-2'>
                <SearchInput />
            </div>
            <div className='border-[1px] border-neutral-500 rounded-lg p-8'>
                {
                    searchProfiles.length > 0
                        ?
                        (
                            searchProfiles.map( profile => (
                                <SearchProfileBar profile={profile} key={profile._id} />
                            ) )
                        )
                        :
                        <div className='mt-10 text-neutral-100 text-center font-semibold text-sm py-4'>
                            No User Found 
                        </div>
                }
            </div>
        </div>
    )
}


export default People