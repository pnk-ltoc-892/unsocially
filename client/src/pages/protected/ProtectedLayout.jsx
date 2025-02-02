import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import SideBar from '../../components/SideBar/SideBar.jsx'
import { useSelector } from 'react-redux'


const ProtectedLayout = ({setInit, init}) => {
    const { isAuthenticated } = useSelector(state => state.auth);

    const location = useLocation();
    
    const navigate = useNavigate();
    // ! Call navigate Inside useEffect
    useEffect(() => {
        if (!isAuthenticated) {
            sessionStorage.setItem('redirect', location.pathname);
            navigate('/login');
        }
    }, [isAuthenticated]);


    return (
        <div className='flex max-h-screen relative'>
            <div className='fixed bg-transparent rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10'>
                <SideBar setInit={setInit} init={init}/>
            </div>
            <div className='flex-1 mt-12'>
                <Outlet />
            </div>
        </div>
    )
}


export default ProtectedLayout