import { Badge } from '@/components/ui/badge.jsx';
import React from 'react'
import { Link } from 'react-router-dom';


const PostContent = ({ post }) => {

    return (
        <div className='py-2'>
            {
                post?.tags?.length > 0 ? (
                    <div className='my-2 flex justify-start items-center flex-wrap gap-2'>
                        {
                            post?.tags?.map((tag, index) => {
                                return <Badge onClick={() => console.log({ tag, index })}
                                    className="px-4 py-1 text-sm cursor-pointer hover:bg-white hover:text-black"
                                    variant={"outline"}
                                    key={index}
                                >{tag}</Badge>
                            })
                        }
                    </div>
                )
                    : null
            }
            <Link to={`/post/${post?._id}`} className='bg-red-900 cursor-pointer'>
                {
                    post?.content &&
                    <div className='pb-2 text-lg font-[400]'>
                        {post?.content}
                    </div>
                }
                {
                    post?.images?.length > 0 && post?.images[0] ? (
                        <div className='rounded-[0.5rem] overflow-clip'>
                            <img src={post?.images[0]}
                                onError={(e) => e.target.className = 'hidden'}
                                alt="Post Image"
                                className='h-auto object-cover'
                                loading='lazy'
                            />
                        </div>
                    )
                    : null
                }

            </Link>
        </div>
    )
}

export default PostContent