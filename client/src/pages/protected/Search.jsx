import React from 'react'
import SearchInput from '../../components/search/SearchInput.jsx'
import SearchProfileBar from '../../components/search/SearchProfileBar.jsx'

const Search = () => {
    return (
        <div className='max-w-[50%] mx-auto'>
            <div className='pb-2 flex justify-center items-center gap-2'>
                <span className='py-1 rounded-full'>Search</span>
            </div>
            <div className='bg-secondary border border-neutral-600 rounded-t-3xl p-6'>
                <SearchInput />
                <div className='text-neutral-500 font-semibold text-sm py-4'>
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