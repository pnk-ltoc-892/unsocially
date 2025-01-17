import React from 'react'
import Navbar from './Navbar.jsx'
import { LogOut, Menu } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu.jsx';
import { useDispatch } from 'react-redux';
import { logOutUser } from '@/store/slices/authSlice.js';
import { Link } from 'react-router-dom';


const Header = () => {

    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logOutUser());
    }

    return (
        <div className='mx-auto w-full border-b-[0.5px] border-b-white py-2 flex justify-center items-center gap-28'>
            {/* <div className=''> */}
                <span className='cursor-pointer tracking-wider font-bold text-xl px-3 py-1 bg-white/80 text-black rounded-xl'>US</span>
            {/* </div> */}

            <div>
                <Navbar />
            </div>
            
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className='hover:bg-gray-900/40 p-2 rounded-full text-gray-400 '>
                        <Menu size={28} />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='cursor-pointer'>
                    <Link to={'profile/my'} >
                        <DropdownMenuItem className='cursor-pointer font-semibold'>My Profile</DropdownMenuItem>
                    </Link>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        onClick={handleLogout}
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