import { SquareUserRound } from 'lucide-react'
import React from 'react'

const NameBox = ({profile}) => {
    return (
        <div className='flex-1 flex flex-col justify-center gap-1 cursor-pointer'>
            <div className='relative text-3xl flex gap-2 items-center font-semibold tracking-wide'>
                <SquareUserRound size={28} className='absolute left-[-1rem] top-2 flex justify-center items-center'/>
                <span className='pl-4 hover:underline'>{profile?.username || ""}</span>
            </div>
            <div className='text-2xl pl-4 font-[500] text-neutral-300'>
                {profile?.fullname || ""}
            </div>
        </div>
    )
}

export default NameBox