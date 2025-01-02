import { Stepper } from '@mui/material'
import React from 'react'
import image from "../../../public/image.jpg"


const PostContent = ({post}) => {
    return (
        <div className='w-[80%] mx-auto'>
            {
                post.text && 
                    <div className='pb-2'>
                        {post.text}
                    </div>
            }
            {
                post.image && (
                    <div className='max-h-[28rem]'>
                        <img src={post.image} 
                            alt="Post Image" 
                            className='h-auto max-h-[28rem] object-cover rounded-md'
                            loading='lazy'
                            />
                    </div>
                )
            }
        </div>
    )
}

export default PostContent