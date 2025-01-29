import React from 'react'
import { DialogContent, DialogDescription, DialogSideBar, DialogTitle } from '../../ui/dialog.jsx'
import { Button } from '../../ui/button.jsx'
import { Label } from '../../ui/label.jsx'
import { Input } from '../../ui/input.jsx'
import { Copy } from 'lucide-react'
import { toast } from '@/hooks/use-toast.js'


const PostShareDialog = ({postLink}) => {

    const handleShare = () => {
        navigator.clipboard.writeText(`http://localhost:5173/post/${postLink}`)
        toast({
            title: "Copied!"
        })
    }

    return (
        <>
            <DialogContent className="w-[450px] h-[150px]">
                <DialogSideBar>
                    <DialogTitle>Share link</DialogTitle>
                    <DialogDescription>
                        Copy Link And Share To Anyone.
                    </DialogDescription>
                </DialogSideBar>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input
                            id="link"
                            defaultValue={`http://localhost:5173/post/${postLink}`}
                            readOnly
                        />
                    </div>
                    <Button onClick={handleShare}
                        type="submit" size="sm" className="px-3">
                        <span className="sr-only">Copy</span>
                        <Copy />
                    </Button>
                </div>
            </DialogContent>
        </>
    )
}

export default PostShareDialog