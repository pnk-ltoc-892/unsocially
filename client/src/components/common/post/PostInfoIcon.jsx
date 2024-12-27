import React from 'react'


// ! Add A PopOver On Hover
const PostInfoIcon = ({ children, info}) => {
    return (
        <div className='flex gap-2 items-center cursor-pointer hover:bg-gray-600/10 p-2 rounded-full'>
            <div className='hover:text-neutral-300'>
                {children}
            </div>
            {info && <span className='text-sm'>{info}</span>}
        </div>
    )
}

export default PostInfoIcon