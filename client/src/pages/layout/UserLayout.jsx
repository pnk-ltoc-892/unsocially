import AppBackground from '@/components/common/AppBackground.jsx'
import SideBar from '@/components/SideBar/SideBar.jsx'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
    return (
        <>
            <AppBackground />
            <div className='relative z-10 flex min-h-screen'>
                <SideBar />
                <div className='min-h-screen flex-1 pl-[4.5rem] pt-4 text-white'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default UserLayout
