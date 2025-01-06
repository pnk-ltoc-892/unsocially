import React from 'react'


const PostContent = ({post}) => {
    return (
        <div className='py-2'>
            {
                post.content && 
                    <div className='pb-4 text-lg font-[400]'>
                        {post.content}
                    </div>
            }
            {
                post.images.length && (
                    <div className='rounded-[1.25rem] overflow-clip'>
                        <img src={post.images[0]} 
                            alt="Post Image" 
                            className='h-auto object-cover aspect-square'
                            loading='lazy'
                            />
                    </div>
                )
            }
        </div>
    )
}

export default PostContent