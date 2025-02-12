import React from 'react'
import { NavLink } from 'react-router-dom'
import { Compass, House, LogOut, UserRound, UserRoundPlus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import AddPost from '../home/AddPost.jsx';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip.jsx';
import { logOutUser } from '@/store/slices/authSlice.js';


const Navbar = () => {
    const { user } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logOutUser());
    }

    return (
        <div className='flex flex-col justify-center items-center gap-6'>

            <TooltipProvider delayDuration={50} >
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div>
                            <AddPost />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent side={"right"} sideOffset={10} className="text-sm px-2 py-1">
                        {"Add Post"}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <Link to={'/home'} title="Home">
                <House size={32} />
            </Link>

            <Link to={'/people'} title="Explore">
                <Compass size={32} />
            </Link>

            {/* <Link to={'/search'} title="Search">
                <Compass size={32} />
            </Link> */}

            <Link to={`/profile/user/${user?.username}/`} title="Profile">
                <UserRound size={32} />
            </Link>

            {/* // ! LogOut */}
            <TooltipProvider delayDuration={50} >
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div onClick={handleLogout}
                            className='text-red-600 hover:bg-gray-900/40 rounded-xl p-2 cursor-pointer'
                        >
                            <LogOut size={28} />
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


const Link = ({ to, children, title }) => {
    const styles = "hover:bg-white hover:text-black hover:scale-110 text-white rounded-xl p-2 flex justify-start items-center gap-1 animate-scale-in-top cursor-pointer";
    return (
        <>
            <TooltipProvider delayDuration={50} >
                <Tooltip>
                    <TooltipTrigger asChild>
                        <NavLink to={to}
                            // className={({ isActive }) => isActive ? `text-white ${styles}` : styles}
                            className={styles}
                        >
                            {children}
                        </NavLink>
                    </TooltipTrigger>
                    <TooltipContent side={"right"} sideOffset={10} className="text-sm px-2 py-1">
                        {title}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </>
    )
}

export default Navbar