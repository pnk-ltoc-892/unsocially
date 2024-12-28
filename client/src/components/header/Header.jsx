import React from 'react'
import Navbar from './Navbar.jsx'
import { RxHamburgerMenu } from "react-icons/rx";


const Header = () => {
    return (
        <div className=' py-2 flex justify-around items-center'>
            <div className='text-white text-2xl cursor-pointer'>
                <span className='p-2 bg-gray-100 text-primary rounded-full mr-2 flex-1'>T</span>
                Thoughts
            </div>
            <Navbar />
            <div className='text-white text-3xl hover:bg-gray-700/20 px-3 py-1 rounded-xl cursor-pointer'>
                <RxHamburgerMenu  />
            </div>
        </div>
    )
}

export default Header