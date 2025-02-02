import React from 'react'
import PostHeader from './PostHeader.jsx'
import PostContent from './PostContent.jsx'
import PostInfo from './PostInfo.jsx'
import { boxGradients } from '@/config/styles.js'

const CommonPost = ({ post, index }) => {


    return (
        <>
            {/* <div className={`bg-[#020202] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 backdrop-saturate-100 backdrop-contrast-100 border p-4 pb-0 rounded-md w-full ${boxGradients[0]}`}>
                <PostHeader post={post} />
                <PostContent post={post} />
                <PostInfo postData={post} />
            </div> */}

            <div className="min-h-full relative w-[90%] hover:slide-right-normal">
                <div
                    className={`absolute -inset-1 rounded-lg ${boxGradients[index % 5]} opacity-80 blur-[8px]`}
                ></div>
                <div className="relative bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-90 backdrop-saturate-100 backdrop-contrast-100 border px-[1rem] pt-[0.75rem] pb-0 rounded-md w-full text-slate-300 bg-black">
                        <PostHeader post={post} />
                        <PostContent post={post} />
                        <PostInfo postData={post} />
                </div>
            </div>
        </>
    )
}

export default CommonPost