import React from 'react'
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import av from "../../../public/avatar.jpg"


const Search = () => {
    return (
        <div className='border-b-[0.5px] border-b-neutral-500 '>
            <div className='flex justify-start items-center px-2 py-4'>
                    <Link to='/profile'>
                        <Avatar alt="Profile" src={av} />
                    </Link>

                {/* // !Trigger Start A Thought */}
                <div className='cursor-pointer flex justify-between items-center flex-1'>
                    <div className='px-5 text-neutral-500'>
                        Share a thought...
                    </div>
                    <div className='border-[0.5px] text-sm px-3 py-1 rounded-md'>
                        Post
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search