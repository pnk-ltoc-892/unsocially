import React from 'react'
import { NavLink } from 'react-router-dom'
import { House, Search, UserRound } from 'lucide-react';


const Navbar = () => {
    return (
        <div className='text-gray-400 text-3xl flex justify-center items-center gap-12'>
            <Link to={'/home'} >
                <House size={28} />
            </Link>
            <Link to={'/search'} >
                <Search size={28} />
            </Link>
            <Link to={'/profile'} >
                <UserRound size={28} />
            </Link>
        </div>
    )
}


const Link = ({to, classname="", children}) => {
    const styles = "hover:bg-gray-900/40 rounded-full p-2"
    return (
        <NavLink to={to} 
                className={({ isActive }) => isActive ? `text-white ${styles}` : styles}
        >
                {children}
        </NavLink>
    )
}

export default Navbar