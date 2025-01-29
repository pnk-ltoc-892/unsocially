import React from 'react'
import { NavLink } from 'react-router-dom'
import { Compass, House, UserRound, UserRoundPlus } from 'lucide-react';
import { useSelector } from 'react-redux';
import AddPost from '../home/AddPost.jsx';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip.jsx';


const Navbar = ({ open }) => {
    const { user } = useSelector(state => state.auth);

    return (
        <div className='text-gray-400 flex flex-col justify-center items-center gap-6'>
            <Link to={'/home'} title="Home">
                <House size={32} />
            </Link>

            <Link to={'/people'} title="People">
                <UserRoundPlus size={32} />
            </Link>

            <TooltipProvider delayDuration={200} >
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

            <Link to={'/search'} title="Search">
                <Compass size={32} />
            </Link>

            <Link to={`/profile/user/${user?.username}/`} title="Profile">
                <UserRound size={32} />
            </Link>
        </div>
    )
}


const Link = ({ to, children, title }) => {
    const styles = "hover:bg-gray-900/40 text-white rounded-xl p-2 flex justify-start items-center gap-1"
    return (
        <>
            <TooltipProvider delayDuration={200} >
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