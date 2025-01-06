import React from 'react'


// ! Add A PopOver On Hover
const PostInfoIcon = ({ children, info, className}) => {
    return (
        <div className={`flex gap-1 items-center cursor-pointer py-[0.1rem] rounded-full ${className}`}>
            <div className='flex justify-center items-center hover:text-neutral-300 hover:bg-neutral-600/20 p-[0.4rem] rounded-full'>
                {children}
            </div>
            {info && <span className='text-[0.8rem]'>{info}</span>}
        </div>
    )
}

export default PostInfoIcon