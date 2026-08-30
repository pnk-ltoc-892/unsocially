import PostHeader from './PostHeader.jsx'
import PostContent from './PostContent.jsx'
import PostInfo from './PostInfo.jsx'

const CommonPost = ({ post, priority = false }) => {
    return (
        <div className="glass-card relative w-full rounded-md px-4 pt-3 pb-0 text-slate-300">
            <PostHeader post={post} />
            <PostContent post={post} priority={priority} />
            <PostInfo postData={post} />
        </div>
    )
}

export default CommonPost
