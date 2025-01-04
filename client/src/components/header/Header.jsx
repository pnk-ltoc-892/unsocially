import React from 'react'
import Navbar from './Navbar.jsx'
import { RxHamburgerMenu } from "react-icons/rx";
import { LogOut, Menu } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu.jsx';
import { useDispatch } from 'react-redux';
import { logOutUser } from '@/store/slices/authSlice.js';


const Header = () => {

    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logOutUser());
    }

    return (
        <div className='border-b-2 border-b-white py-2 flex justify-around items-center'>
            <div className='text-white text-2xl cursor-pointer'>
                <span className='px-3 bg-gray-800 text-primary rounded-full flex-1'>T</span>
            </div>
            <Navbar />
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className='hover:bg-gray-900/40 p-2 rounded-full text-gray-400 '>
                        <Menu size={28} />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='cursor-pointer'>
                    <DropdownMenuItem className='cursor-pointer font-semibold'>My Profile</DropdownMenuItem>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem 
                        onClick={ handleLogout}
                        className='text-red-600 focus:text-text-red-600 font-semibold cursor-pointer'
                    >
                        <LogOut />LogOut
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}

export default Header