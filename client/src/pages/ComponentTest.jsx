import CommentSkeleton from '@/components/skeletons/CommentSkeleton.jsx';
import PostSkeleton from '@/components/skeletons/PostSkeleton.jsx';
import ProfileBarSkeleton from '@/components/skeletons/ProfileBarSkeleton.jsx';
import ProfileCardSkeleton from '@/components/skeletons/ProfileCardSkeleton.jsx';
import { Skeleton } from '@/components/ui/skeleton.jsx';
import React, { useState } from 'react'


const ComponentTest = () => {
    const [loading, setLoading] = useState(true);
    
    return (
        <div className='h-full w-full flex justify-center items-center absolute inset-0  bg-black bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]'>
            {
                loading && <ProfileCardSkeleton />
            }
        </div>
    )
}

export default ComponentTest