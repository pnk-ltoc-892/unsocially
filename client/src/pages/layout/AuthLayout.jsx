import Spinner from '@/components/UI Components/Spinner.jsx';
import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'


const AuthLayout = () => {
    const { isAuthLoading } = useSelector(state => state.auth)

    // const isAuthLoading = true;
    if (isAuthLoading === true) {
        return (
            <div className='h-screen w-screen flex justify-center items-center'>
                <Spinner />
            </div>
        )
    }
    return (
        <>
            <Outlet />
        </>
    )
}

export default AuthLayout