import { Copy } from 'lucide-react'
import { toast } from '@/hooks/use-toast.js'
import { DialogContent, DialogDescription, DialogSideBar, DialogTitle } from '@/components/ui/dialog.jsx'

const shareUrlFor = (postId) => {
    if (typeof window === 'undefined') return ''
    if (postId) return `${window.location.origin}/post/${postId}`
    return window.location.href
}

const PostShareDialog = ({ postLink, url }) => {
    const shareUrl = url || shareUrlFor(postLink)

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl)
            toast({ title: "Link copied" })
        } catch {
            toast({
                variant: "destructive",
                title: "Could not copy link",
            })
        }
    }

    return (
        <DialogContent>
            <DialogSideBar>
                <DialogTitle>Share post</DialogTitle>
                <DialogDescription>
                    Copy the link and send it to anyone.
                </DialogDescription>
            </DialogSideBar>
            <div className="space-y-2 px-5 py-4">
                <div className="flex items-center gap-2">
                    <input
                        id="share-link"
                        value={shareUrl}
                        readOnly
                        className="h-10 min-w-0 flex-1 rounded-xl border border-white/15 bg-white/5 px-3 text-sm text-white/80 focus-visible:outline-none"
                    />
                    <button
                        type="button"
                        onClick={handleShare}
                        className="flex h-10 shrink-0 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-black"
                    >
                        <Copy size={14} />
                        Copy
                    </button>
                </div>
                <p className="text-xs text-white/35">Anyone with the link can view this post.</p>
            </div>
        </DialogContent>
    )
}

export default PostShareDialog
