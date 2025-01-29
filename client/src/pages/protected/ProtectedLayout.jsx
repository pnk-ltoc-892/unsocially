import React, { useEffect } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import SideBar from '../../components/SideBar/SideBar.jsx'
import { useSelector } from 'react-redux'


const ProtectedLayout = () => {
    const { isAuthenticated } = useSelector(state => state.auth);

    const location = useLocation();
    console.log(location);
    
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
            {/* <div className='fixed bg-background rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10'> */}
            <div className='fixed bg-background'>
                <SideBar />
            </div>
            <div className='flex-1 bg-gradient-to-r from-[#0f172a]  to-[#334155]'>
                <Outlet />
            </div>
        </div>
    )
}


export default ProtectedLayout