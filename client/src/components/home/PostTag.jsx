import { useState } from 'react'
import { X } from 'lucide-react'

import { toast } from '@/hooks/use-toast.js'


const normalizeTag = (value) => value.trim().replace(/^#/, '')

const PostTag = ({ postTags, setPostTags }) => {
    const [tag, setTag] = useState('');

    const handleTagDelete = (delTag) => {
        setPostTags(postTags.filter((item) => item !== delTag));
    }

    const handleAddPostTag = () => {
        const next = normalizeTag(tag);
        if (!next) return;
        if (postTags.length === 5) {
            toast({
                title: "Can only add up to 5 tags",
                variant: "destructive",
            });
            return;
        }
        if (postTags.some((item) => item.toLowerCase() === next.toLowerCase())) {
            toast({
                title: "Tag already added",
                variant: "destructive",
            });
            return;
        }
        setPostTags((prev) => [...prev, next]);
        setTag('');
    }

    return (
        <div className='space-y-2'>
            {postTags.length > 0 && (
                <div className='flex flex-wrap gap-2'>
                    {postTags.map((item) => (
                        <button
                            type="button"
                            key={item}
                            onClick={() => handleTagDelete(item)}
                            className='inline-flex items-center gap-1 rounded-full border border-white/15 px-2.5 py-1 text-sm font-semibold text-white hover:border-red-400/40 hover:text-red-300'
                        >
                            #{item}
                            <X size={12} />
                        </button>
                    ))}
                </div>
            )}
            {postTags.length < 5 && (
                <input
                    value={tag}
                    onChange={(event) => setTag(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            event.preventDefault();
                            handleAddPostTag();
                        }
                    }}
                    placeholder="Add a tag and press Enter"
                    className='h-9 w-full bg-transparent text-sm text-white placeholder:text-white/35 focus-visible:outline-none'
                />
            )}
        </div>
    )
}

export default PostTag
