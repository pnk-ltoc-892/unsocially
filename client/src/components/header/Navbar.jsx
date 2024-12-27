import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoHomeOutline } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";


const Navbar = () => {

    return (
        <div className='text-gray-500 text-3xl flex justify-center items-center gap-12'>
            <Link to={'/home'} >
                <IoHomeOutline />
            </Link>
            <Link to={'/search'} >
                <IoSearchSharp />
            </Link>
            <Link to={'/profile'} >
                <MdOutlineAccountCircle />
            </Link>
        </div>
    )
}


const Link = ({to, classname="", children}) => {
    const styles = "hover:bg-gray-700/20 px-3 py-1 rounded-xl"
    return (
        <NavLink to={to} 
                className={({ isActive }) => isActive ? `text-white ${styles}` : styles}
        >
                {children}
        </NavLink>
    )
}

export default Navbar