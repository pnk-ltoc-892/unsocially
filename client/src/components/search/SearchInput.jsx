import { FaSearch } from "react-icons/fa";
import { BsFilterRight } from "react-icons/bs";
import React, { useEffect, useState } from 'react'
import { Input } from "../ui/input.jsx";
import { useDispatch, useSelector } from "react-redux";
import { searchProfiles } from "@/store/slices/userSlice.js";


const SearchInput = () => {
    const [keyword, setKeyword] = useState("");

    const dispatch = useDispatch();
    useEffect( () => {
        if(keyword && keyword.trim() !== "" && keyword.trim().length > 0){
            setTimeout(() => {
                dispatch(searchProfiles(keyword))
            }, 2000);
        }

    }, [keyword] )

    return (
        <div>
            <div className="flex bg-[#060607] px-4 rounded-xl p-1 justify-center items-center border-gray-600">
                <div className="text-lg font-light text-neutral-600 pr-4">
                    <FaSearch />
                </div>

                <Input onChange={(e) => setKeyword(e.target.value)}
                    value={keyword}
                    type="text"
                    className="bg-[#060607] flex-1 py-2 rounded-lg  placeholder-neutral-600 text-neutral-400 font-semibold outline-none border-none focus-visible:ring-0 md:text-lg tracking-wide" placeholder="Search" />

                <div className="text-xl font-light text-neutral-600 rounded-full p-1 hover:bg-gray-600/30">
                    <BsFilterRight />
                </div>
            </div>
        </div>
    )
}

export default SearchInput