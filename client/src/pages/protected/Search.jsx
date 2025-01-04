import React from 'react'
import SearchInput from '../../components/search/SearchInput.jsx'
import SearchProfileBar from '../../components/search/SearchProfileBar.jsx'

const Search = () => {
    return (
        <div className='max-w-[60%] mx-auto'>

            <div className='p-2 flex justify-center items-center'>
                Search
            </div>

            <div className='p-4'>
                <SearchInput />
            </div>
            <div className='border-[1px] border-neutral-500 rounded-lg p-8'>
                <div className='text-neutral-100 font-semibold text-sm py-4'>
                    Follow Suggestions
                </div>
                <SearchProfileBar />
                <SearchProfileBar />
                <SearchProfileBar />
                <SearchProfileBar />
                <SearchProfileBar />
                <SearchProfileBar />
                <SearchProfileBar />
                <SearchProfileBar />
                <SearchProfileBar />
                <SearchProfileBar />
                <SearchProfileBar />
                <SearchProfileBar />
                <SearchProfileBar />
                <SearchProfileBar />
                <SearchProfileBar />

            </div>
        </div>
    )
}


export default Search