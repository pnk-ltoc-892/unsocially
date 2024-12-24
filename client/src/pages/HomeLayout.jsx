import React from 'react'
import { Outlet } from 'react-router-dom'

const HomeLayout = () => {
    return (
        <div className='bg-slate-950 h-screen'>
            <h1 className='text-white'>Home Layout</h1>
            <div className='bg-slate-900 min-h-[30vh] flex justify-center items-center m-4'>
                <Outlet />
            </div>
        </div>
    )
}

export default HomeLayout
