import React from 'react'
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog.jsx'
import { Button } from '../ui/button.jsx'
import { Label } from '../ui/label.jsx'
import { Input } from '../ui/input.jsx'
import { Copy } from 'lucide-react'
import { toast } from '@/hooks/use-toast.js'


const PostShareDialog = () => {

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href)
        toast({
            title: "Copied!"
        })
    }

    return (
        <>
            
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Share link</DialogTitle>
                    <DialogDescription>
                        Copy Link And Share To Anyone.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input
                            id="link"
                            defaultValue={window.location.href}
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