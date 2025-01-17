import React from 'react'
import { NavLink } from 'react-router-dom'
import { House, Search, UserPlus, UserRound, UserRoundPlus } from 'lucide-react';
import { useSelector } from 'react-redux';
import AddPost from '../home/AddPost.jsx';


const Navbar = () => {
    const { user } = useSelector(state => state.auth);
    
    return (
        <div className='text-gray-400 text-3xl flex justify-center items-center gap-12'>
            <Link to={'/home'} >
                <House size={28} />
            </Link>
            <Link to={'/people'} >
                <UserRoundPlus size={28} />
            </Link>
            <AddPost />
            <Link to={'/search'} >
                <Search size={28} />
            </Link>
            <Link to={`/profile/user/${user?.username}/posts`} >
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