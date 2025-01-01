import React from 'react'
import { Outlet } from 'react-router-dom'
import av from "../../../../public/avatar.jpg"
import { Avatar, Button } from '@mui/material'
import { useSelector } from 'react-redux'



const ProfileLayout = () => {

    // ! Should Have a separate Route for Profile Info
    const { user } = useSelector(state => state.auth);

    console.log(user);

    return (
        <div>
            <div className='max-w-[50%] mx-auto'>
                <div className='pb-2 flex justify-center items-center gap-2'>
                    <span className='py-1 rounded-full'>Profile</span>
                </div>
                <div className='bg-secondary border border-neutral-600 rounded-t-3xl p-6'>
                    <div className='flex'>
                        <div className='flex-1 flex flex-col justify-center'>
                            <div className='text-2xl font-bold'>
                                {user?.fullname || "User Singh"}
                            </div>
                            <div className='text-lg font-semibold text-neutral-300'>
                                {user?.username}
                            </div>
                        </div>
                        <div className="flex justify-center items-centercenter">
                            <Avatar
                                alt="Profile"
                                src={av}
                                sx={{ width: 80, height: 80 }}
                            />
                        </div>
                    </div>
                    <div className='max-w-lg text-neutral-300 text-md py-4'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui eveniet incidunt distinctio quis consequatur eius nesciunt sunt quam similique omnis.
                    </div>
                    <div className='flex justify-start items-center text-neutral-400 text-md py-2'>
                        <div className='hover:underline'>
                            999k followers
                        </div>
                        <div className='px-2'>|</div>
                        <a href=""
                            className='hover:underline'>
                            linktree.com
                        </a>

                        {/* // ! For More Profile Info Menu */}
                        <div className='flex-1 text-right'>
                            :
                        </div>
                    </div>
                    <div className='flex justify-start items-center my-2'>
                        <button type="button" className="w-full max-w-sm py-1 text-md font-medium text-gray-900 bg-white rounded-xl border border-gray-200 hover:bg-[#111316] hover:text-white focus:z-10 focus:ring-2 focus:ring-neutral-600">Follow</button>
                    </div>

// ! For Navbar Profile Info Menu
                    <div>

                    </div>

                    <div>
                        <Outlet />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProfileLayout