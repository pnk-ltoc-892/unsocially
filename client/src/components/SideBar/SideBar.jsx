import React, { useState } from 'react'
import Navbar from './Navbar.jsx'
import { ArrowLeft, LogOut, Power } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logOutUser } from '@/store/slices/authSlice.js';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip.jsx';
import { useNavigate } from 'react-router-dom';


const SideBar = ({ setInit, init }) => {
    const navigate = useNavigate();

    return (
        <div className='h-screen flex flex-col justify-center items-center gap-12 px-3'>
            {/* // Navigate Backward */}
            {/* <div onClick={() => navigate(-1)}
                className='text-white hover:bg-gray-900/40 rounded-xl p-2 cursor-pointer'>
                <ArrowLeft size={30} />
            </div> */}

            {/* // ! Navbar */}
            <div>
                <Navbar />
            </div>

            <div onClick={() => setInit(prev => !prev)}
                className={`${init ? 'text-red-600' : 'text-white'} hover:bg-gray-900/40 rounded-xl p-2 cursor-pointer`}>
                <Power size={26} />
            </div>
        </div>
    )
}

export default SideBar