import React, { useState } from 'react'
import { Input } from '../ui/input.jsx'
import { CirclePlus, Ellipsis } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar.jsx'
import { avatar } from '@/config/index.js'
import Comment from '../Comments/Comment.jsx'

const comments = [
    {
        likes: 10,
        isLiked: true,
        comment: "This is amazing! Keep it up! 🔥"
    },
    {
        likes: 10,
        isLiked: true,
        comment: "This is amazing! Keep it up! 🔥"
    },
    {
        likes: 12,
        isLiked: false,
        comment: "Wow, I never thought about it this way. Great perspective! 👏"
    },
    {
        likes: 110,
        isLiked: true,
        comment: "This made me laugh out loud! 😂 Thanks for the humor."
    },
    {
        likes: 76,
        isLiked: false,
        comment: "Keep up the hard work! It’s definitely paying off. 🚀"
    }
];


const Comments = ({ post }) => {
    const [comment, setComment] = useState('');

    const handleAddComment = () => {
        console.log(comment);
    }

    return (
        <div className="" >
            <div className='mt-4 bg-[#000000] flex justify-center items-center gap-2' >
                <div>
                    <Avatar className='cursor-pointer h-10 w-10'>
                        <AvatarImage src={post?.author?.avatar || avatar} className='object-cover' />
                        <AvatarFallback>{post?.author?.username[0] || ""}</AvatarFallback>
                    </Avatar>
                </div>
                <textarea
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    type="text"
                    placeholder="Add a Comment..."
                    className="flex h-[100px] w-full resize-none rounded-sm border-[1px] border-neutral-700 bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-lg"
                />
                <div onClick={handleAddComment}>
                    <CirclePlus size={42} className='cursor-pointer p-2 rounded-full hover:bg-neutral-600/80' />
                </div>
            </div>

            {/* // ! Comments-Rendering */}
            <div className='w-full mx-auto mt-4 flex flex-col justify-start items-start gap-4'>
                <span>Comments</span>
                {
                    comments.length > 0 &&
                    comments.map((comment,index) => <Comment comment={comment} key={index} />)
                }
            </div>

        </div>
    )
}


export default Comments;