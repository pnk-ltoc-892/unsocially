import React from 'react'
import SearchInput from '../../components/search/SearchInput.jsx'
import SearchProfileBar from '../../components/search/SearchProfileBar.jsx'
import { useSelector } from 'react-redux';

const Search = () => {
    const { searchProfiles } = useSelector((state) => state.userSlice);
    console.log(searchProfiles);
    
    return (
        <div className='max-w-[60%] mx-auto'>

            <div className='p-2 flex justify-center items-center'>
                Search
            </div>

            <div className='p-4'>
                <SearchInput />
            </div>
            <div className='border-[1px] border-neutral-500 rounded-lg p-8'>
                {/* <div className='text-neutral-100 font-semibold text-sm py-4'>
                    Follow Suggestions
                </div> */}
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


export default Search