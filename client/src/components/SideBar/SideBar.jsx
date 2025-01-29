import React, { useState } from 'react'
import Navbar from './Navbar.jsx'
import { LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logOutUser } from '@/store/slices/authSlice.js';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip.jsx';


const SideBar = () => {
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logOutUser());
    }

    return (
        <div className='h-screen flex flex-col justify-center items-center gap-12 px-3'>
            {/* // ! Logo */}
            <div className='cursor-pointer tracking-wider font-bold text-xl px-3 py-1 bg-gray-900/40 text-white rounded-xl'>US</div>

            {/* // ! Navbar */}
            <div>
                <Navbar />
            </div>

            {/* // ! LogOut */}
            <TooltipProvider delayDuration={200} >
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div onClick={handleLogout}
                            className='text-red-600 hover:bg-gray-900/40 rounded-xl p-2 cursor-pointer'
                        >
                            <LogOut size={30} />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent side={"right"} sideOffset={10} className="text-sm px-2 py-1">
                        {"Log Out"}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}

export default SideBar