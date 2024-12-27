import { FaSearch } from "react-icons/fa";
import { BsFilterRight } from "react-icons/bs";
import React from 'react'


const SearchInput = () => {
    return (
        <div>
            <div className="flex bg-[#060607] px-4 rounded-xl p-1 justify-center items-center border-gray-600">
                <div className="text-lg font-light text-neutral-600 pr-4">
                    <FaSearch />
                </div>

                <input type="text" className="bg-[#060607] flex-1 py-2 text-md rounded-lg  placeholder-neutral-600 text-neutral-500 outline-none" placeholder="Search" />

                <div className="text-xl font-light text-neutral-600 rounded-full p-1 hover:bg-gray-600/30">
                    <BsFilterRight />
                </div>
            </div>
        </div>
    )
}

export default SearchInput