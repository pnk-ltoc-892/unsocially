import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from '../../components/header/Header.jsx'
import { useSelector } from 'react-redux'


const ProtectedLayout = () => {
    const { isAuthenticated } = useSelector(state => state.auth);

    const location = useLocation();
    console.log(location);
    

    const navigate = useNavigate()
    // ! Call navigate Inside useEffect
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
        else{
            navigate('/home');
        }
    }, [isAuthenticated]);


    return (
        <div className='h-screen text-white overflow-y-scroll overflow-x-auto'>
            <Header />
            <Outlet />
        </div>
    )
}


export default ProtectedLayout