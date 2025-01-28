import React, { useState } from 'react'
import { Badge } from '../ui/badge.jsx'
import { Input } from '../ui/input.jsx'
import { Button } from '../ui/button.jsx'
import { toast } from '@/hooks/use-toast.js'

const PostTag = ({postTags, setPostTags}) => {
    const [tag, setTag] = useState('');

    const handleTagDelete = (delTag) => {
        const filterTags = postTags.filter((tag) => tag !== delTag);
        // console.log(newTags);
        setPostTags(filterTags);
    }
    const handleAddPostTag = () => {
        if(postTags.length == 5){
            toast({
                title: "Can Only Add Upto 5 Tags",
                variant: "destructive"
            })
            return;
        }
        if(postTags.includes(tag)){
            toast({
                title: "Tag Already Added",
                variant: "destructive"
            })
            return;
        }
        setPostTags((prev) => [...prev, tag]);
        setTag('')
    }
    return (
        <>
            {
                postTags?.length > 0 ? (
                    <div className='py-2 pb-4 flex justify-start items-center flex-wrap gap-3'>
                        {
                            postTags?.map((tag, index) => {
                                return <Badge
                                    className="px-4 py-1 cursor-pointer hover:bg-red-800"
                                    variant={"outline"}
                                    key={index}
                                    onClick={() => handleTagDelete(tag)}
                                >{tag}</Badge>
                            })
                        }
                    </div>
                )
                : null
            }
            {
                postTags?.length === 5 ? (
                    <Input
                        value="You Can Add Max Of 5 Tags"
                        className='bg-transparent text-red-600 font-semibold text-lg w-[250px]'
                        disabled
                    />
                )
                : <div className='flex gap-4'>
                    <Input 
                        placeholder="Tag"
                        className='bg-neutral-950 w-[250px]'
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                    />
                    <Button onClick={handleAddPostTag} 
                            disabled={tag === ''}
                    >Add</Button>
                </div>
            }
        </>
    )
}

export default PostTag