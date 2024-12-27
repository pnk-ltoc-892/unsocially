import { Stepper } from '@mui/material'
import React from 'react'
import image from "../../../public/image.jpg"

const text = "Take full Dental Care at Home . We Recommend you the best flosser in the market and most selling on Amazon aff.ull Dental Care at Home . We Recommend you the best flosser in the market and most selling on Amazon a"


const PostContent = () => {
    return (
        <div className='w-[80%] mx-auto'>
            <div className='pb-2'>
                {text}
            </div>
            <div className='max-h-[28rem]'>
                <img src={image} 
                    alt="Post Image" 
                    className='h-auto max-h-[28rem] object-contain rounded-md'
                    // className='h-auto w-[100%] max-w-object-none rounded-sm'
                    // loading='lazy'
                    />
            </div>
        </div>
    )
}

export default PostContent