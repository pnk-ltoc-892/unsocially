import React from 'react'
import { Outlet } from 'react-router-dom'


const ProtectedLayout = () => {
    return (
        <div className='bg-primary h-[90vh] text-white pt-3 overflow-y-scroll overflow-x-auto'>
            <Outlet />
        </div>
    )
}

export default ProtectedLayout