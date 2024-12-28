import React from 'react'
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import av from "../../../public/avatar.jpg"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog.jsx';
import { Textarea } from '../ui/textarea.jsx';
import { Button } from '../ui/button.jsx';


const Search = () => {
    return (
        <div className='flex justify-center items-center p-2'>

            {/* // !Trigger Start A Thought */}
            <Dialog className='min-w-max'>
                <DialogTrigger className='w-[60%]'>
                    <div className='min-w-full bg-neutral-950 px-5 py-2 text-md font-semibold text-neutral-300 rounded-lg cursor-pointer'>
                        Share a thought...
                    </div>
                </DialogTrigger>

                {/* // ! Dialog Pop-Up Content */}
                <DialogContent className='min-w-[50%] p-4'>
                    <DialogHeader>
                        <div className='flex justify-start items-center gap-6'>
                            <Link to='/profile'>
                                <Avatar alt="Profile" src={av} />
                            </Link>
                            <DialogTitle className='underline text-md'>pnk.dev.op.892</DialogTitle>
                        </div>
                    </DialogHeader>
                    <DialogDescription className=''>
                        <div className='w-[84%] mx-auto flex flex-col gap-4'>
                            <div>
                                <Textarea   placeholder="Share Whats Going On..." 
                                            className='w-full h-32 bg-neutral-950 text-neutral-300'
                                />
                            </div>
                            <div>
                                <input type="file" className='w-full bg-neutral-950 text-neutral-300' />
                            </div>
                            <div className='flex justify-between items-center'>
                                {/* // ! Add Menu To Restrict Comments From Specific Users */}
                                <div className='hover:underline text-neutral-300 text-sm'>
                                    AnyOne Can Reply
                                </div>
                                <div>
                                    <Button>Post</Button>
                                </div>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogContent>

            </Dialog>


        </div>


        // <div className='flex justify-center items-center border-[2px] border-neutral-500 p-2'>
        //     <div className='flex justify-center items-center gap-6'>
        //             {/* <Link to='/profile'>
        //                 <Avatar alt="Profile" src={av} />
        //             </Link> */}

        //         {/* // !Trigger Start A Thought */}
        //         <div className='min-w-full cursor-pointer flex-1 border'>
        //             <div className='bg-background px-5 py-2 text-md text-neutral-300'>
        //                 Share a thought...
        //             </div>
        //             {/* <div className='border-[0.5px] text-sm px-3 py-1 rounded-md'>
        //                 Post
        //             </div> */}
        //         </div>
        //     </div>
        // </div>
    )
}

export default Search