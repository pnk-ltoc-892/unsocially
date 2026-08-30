import PostImage from '../common/post/PostImage.jsx';

const tagLabel = (tag) => {
    const value = String(tag || '').trim();
    return value.startsWith('#') ? value : `#${value}`;
}

const PostContent = ({ post }) => {
    return (
        <div className='py-2'>
            {
                post?.tags?.length > 0 ? (
                    <div className='my-2 flex flex-wrap items-center justify-start gap-x-3 gap-y-1'>
                        {
                            post.tags.map((tag, index) => (
                                <span key={`${tag}-${index}`} className='font-bold text-white'>
                                    {tagLabel(tag)}
                                </span>
                            ))
                        }
                    </div>
                )
                    : null
            }
            {
                post?.content &&
                    <div className='pb-2 text-[1.25rem] font-[400]'>
                        {post.content}
                    </div>
            }
            {
                post?.images?.length ? (
                    <PostImage src={post.images[0]} variant="detail" priority />
                ) : null
            }
        </div>
    )
}

export default PostContent
