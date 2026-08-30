import { useState } from 'react'
import { SquarePlus, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'

import { Dialog, DialogContent, DialogSideBar, DialogTitle } from '../ui/dialog.jsx'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar.jsx'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip.jsx'
import PostImageUpload from './PostImageUpload.jsx'
import PostTag from './PostTag.jsx'
import { fetchAndPrependPost } from '@/store/slices/homeSlice.js'
import { addNewPost } from '@/store/slices/post-slice.js'
import { prependPost as prependProfilePost } from '@/store/slices/profileSlice.js'
import { toast } from '@/hooks/use-toast.js'
import { avatar } from '@/config/index.js'
import { optimizeImageUrl } from '@/lib/image'
import { cn } from '@/lib/utils'


const AddPost = () => {
    const { user } = useSelector(state => state.auth);
    const [openPostDialog, setOpenPostDialog] = useState(false);
    const [postImage, setPostImage] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const [postText, setPostText] = useState('');
    const [postTags, setPostTags] = useState([]);
    const [postLoadingState, setPostLoadingState] = useState(false);

    const canPost = (postText.trim() !== '' || Boolean(uploadedImageUrl)) && !imageLoadingState;
    const dispatch = useDispatch();

    const resetComposer = () => {
        setPostText("");
        setUploadedImageUrl("");
        setPostImage(null);
        setPostTags([]);
        setImageLoadingState(false);
    }

    async function handleAddPost() {
        const content = postText.trim();
        const images = uploadedImageUrl ? [uploadedImageUrl] : [];
        if ((!content && images.length === 0) || postLoadingState || imageLoadingState) return;

        setPostLoadingState(true);
        try {
            const created = await dispatch(addNewPost({
                content,
                images,
                tags: postTags || [],
            })).unwrap();

            setOpenPostDialog(false);
            resetComposer();

            const postId = created?.data?._id;
            const latest = postId
                ? await dispatch(fetchAndPrependPost(postId)).unwrap()
                : null;
            if (latest?.data) {
                dispatch(prependProfilePost(latest.data));
            }

            toast({ title: created?.message || "Post Added !" });
        } catch (message) {
            toast({
                variant: "destructive",
                title: "Could not create post",
                description: typeof message === "string" ? message : undefined,
            });
        } finally {
            setPostLoadingState(false);
        }
    }

    return (
        <>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        type="button"
                        aria-label="New post"
                        onClick={() => setOpenPostDialog(true)}
                        className={cn(
                            'flex h-11 w-11 items-center justify-center rounded-xl transition-colors',
                            openPostDialog
                                ? 'bg-white text-black'
                                : 'bg-white text-black hover:bg-white/85',
                        )}
                    >
                        <SquarePlus size={22} strokeWidth={1.75} />
                    </button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={10}>
                    New post
                </TooltipContent>
            </Tooltip>

            <Dialog
                open={openPostDialog}
                onOpenChange={(open) => {
                    if (postLoadingState) return;
                    setOpenPostDialog(open);
                    if (!open) resetComposer();
                }}
            >
                {openPostDialog ? (
                    <DialogContent className='max-h-[90vh]'>
                        <DialogSideBar>
                            <DialogTitle>
                                New post
                            </DialogTitle>
                        </DialogSideBar>

                        <div className='space-y-4 px-5 py-4'>
                            <div className='flex gap-3'>
                                <Avatar className='h-9 w-9 shrink-0'>
                                    <AvatarImage src={user?.avatar || avatar} className='object-cover' />
                                    <AvatarFallback>{user?.username?.[0] || ''}</AvatarFallback>
                                </Avatar>
                                <textarea
                                    value={postText}
                                    onChange={(event) => setPostText(event.target.value)}
                                    onKeyDown={(event) => {
                                        if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
                                            event.preventDefault();
                                            handleAddPost();
                                        }
                                    }}
                                    placeholder="What's going on?"
                                    className='min-h-[140px] w-full resize-none bg-transparent text-base text-white placeholder:text-white/35 focus-visible:outline-none'
                                />
                            </div>

                            {(uploadedImageUrl || imageLoadingState) && (
                                <div className='relative overflow-hidden rounded-xl border border-white/10'>
                                    {imageLoadingState ? (
                                        <div className='flex h-44 items-center justify-center text-sm text-white/45'>
                                            Uploading image...
                                        </div>
                                    ) : (
                                        <>
                                            <img
                                                src={optimizeImageUrl(uploadedImageUrl, { width: 800 })}
                                                alt="Post preview"
                                                className='max-h-64 w-full object-cover'
                                            />
                                            <button
                                                type="button"
                                                aria-label="Remove image"
                                                onClick={() => setUploadedImageUrl('')}
                                                className='absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black'
                                            >
                                                <X size={16} />
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}

                            <PostTag postTags={postTags} setPostTags={setPostTags} />
                        </div>

                        <div className='flex items-center justify-between gap-3 border-t border-white/10 px-5 py-3'>
                            <PostImageUpload
                                postImage={postImage}
                                setPostImage={setPostImage}
                                uploadedImageUrl={uploadedImageUrl}
                                setUploadedImageUrl={setUploadedImageUrl}
                                imageLoadingState={imageLoadingState}
                                setImageLoadingState={setImageLoadingState}
                            />
                            <button
                                type="button"
                                onClick={handleAddPost}
                                disabled={!canPost || postLoadingState}
                                className='rounded-full bg-white px-5 py-1.5 text-sm font-semibold text-black disabled:bg-white/10 disabled:text-white/35'
                            >
                                {postLoadingState ? 'Posting' : 'Post'}
                            </button>
                        </div>
                    </DialogContent>
                ) : null}
            </Dialog>
        </>
    )
}

export default AddPost
