import React from 'react'
import { Badge } from '../ui/badge.jsx'


const PostContent = ({post}) => {
    return (
        <div className='py-2'>
            {
                post?.tags?.length > 0 ? (
                    <div className='my-2 flex justify-start items-center flex-wrap gap-2'>
                        {
                            post?.tags?.map((tag, index) => {
                                return <Badge onClick={() => console.log({ tag, index })}
                                    className="px-5 py-1 text-md cursor-pointer hover:bg-white hover:text-black"
                                    variant={"outline"}
                                    key={index}
                                >{tag}</Badge>
                            })
                        }
                    </div>
                )
                    : null
            }
            {
                post.content && 
                    <div className='pb-4 text-lg font-[400]'>
                        {post.content}
                    </div>
            }
            {
                post.images?.length && (
                    <div className='rounded-[0.5rem]'>
                        <img src={post.images[0]} 
                            alt="Post Image" 
                            className='h-auto object-cover rounded-[1.25rem] border-[1px]'
                            loading='lazy'
                            />
                    </div>
                )
            }
        </div>
    )
}

export default PostContent