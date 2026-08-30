import { Link } from 'react-router-dom';
import PostImage from './PostImage.jsx';

const tagLabel = (tag) => {
    const value = String(tag || '').trim();
    return value.startsWith('#') ? value : `#${value}`;
}

const PostContent = ({ post, priority = false }) => {

    return (
        <div className='pt-2'>
            {
                post?.tags?.length > 0 ? (
                    <div className='my-1 flex flex-wrap items-center justify-start gap-x-3 gap-y-1'>
                        {
                            post.tags.map((tag, index) => (
                                <span key={`${tag}-${index}`} className='text-sm font-bold text-white'>
                                    {tagLabel(tag)}
                                </span>
                            ))
                        }
                    </div>
                )
                    : null
            }
            <Link to={`/post/${post?._id}`} className='bg-red-900 cursor-pointer'>
                {
                    post?.content &&
                    <div className='pb-2 text-[1.125rem] font-[350]'>
                        {post?.content}
                    </div>
                }
                {
                    post?.images?.length > 0 && post?.images[0] ? (
                        <PostImage src={post.images[0]} priority={priority} />
                    )
                    : null
                }
            </Link>
        </div>
    )
}

export default PostContent