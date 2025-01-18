import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar.jsx'
import { avatar } from '@/config/index.js'
import { Ellipsis } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu.jsx'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const PostHeader = ({ post }) => {
    const { user } = useSelector(state => state.auth);
    // console.log(user);
    // console.log(post);

    const handleDeletePost = () => {


    }
    const handleEditPost = () => {

    }


    return (
        <div className='flex justify-between items-center pb-3 border-b-[1px]'>
            <Link to={`/profile/user/${post?.author?.username}/posts`}>
                <div className='cursor-pointer flex justify-start items-center gap-2'>
                    <div>
                        <Avatar className='cursor-pointer h-10 w-10'>
                            <AvatarImage src={post?.author?.avatar || avatar} className='object-cover' />
                            <AvatarFallback>{post?.author?.username[0] || ""}</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className='flex flex-col justify-center'>
                        <div className='text-sm font-semibold tracking-wide hover:underline'>
                            @{post?.author?.username || ""}
                        </div>
                        <div className='text-xs font-normal text-neutral-300'>
                            {post?.author?.fullname || ""}
                        </div>
                    </div>
                </div>
            </Link>

            {/* // ! Only Author Menu */}
            {
                user?._id === post?.author?._id
                    ?
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <div className='hover:bg-neutral-600/20 rounded-full p-0.5 cursor-pointer'>
                                <Ellipsis />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='bg-black'>
                            <DropdownMenuLabel className='cursor-pointer'>Edit</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel className='cursor-pointer text-red-800' onClick={handleDeletePost} >Delete</DropdownMenuLabel>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    : null
            }
        </div>
    )
}

export default PostHeader