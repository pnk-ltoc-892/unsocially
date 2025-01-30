import React, { useState } from 'react'
import Navbar from './Navbar.jsx'
import { ArrowLeft, LogOut, Power } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logOutUser } from '@/store/slices/authSlice.js';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip.jsx';
import { useNavigate } from 'react-router-dom';


const SideBar = ({ setInit, init }) => {
    const navigate = useNavigate();

    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logOutUser());
    }

    return (
        <div className='h-screen flex flex-col justify-center items-center gap-12 px-3'>
            {/* // Navigate Backward */}
            <div onClick={() => navigate(-1)}
                className='text-white hover:bg-gray-900/40 rounded-xl p-2 cursor-pointer'>
                <ArrowLeft size={30} />
            </div>

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

            <div onClick={() => setInit(prev => !prev)}
                className={`${init ? 'text-red-600' : 'text-white'} hover:bg-gray-900/40 rounded-xl p-2 cursor-pointer`}>
                <Power size={30} />
            </div>
        </div>
    )
}

export default SideBar