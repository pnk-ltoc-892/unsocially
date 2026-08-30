import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Dialog, DialogContent, DialogFooter, DialogSideBar, DialogTitle } from '../ui/dialog.jsx'
import { Label } from '../ui/label.jsx'
import ProfileAvatarUpdate from './ProfileAvatarUpdate.jsx'
import { getUserProfile, updateProfile } from '@/store/slices/profileSlice.js'
import { toast } from '@/hooks/use-toast.js'

const emptyForm = {
    username: "",
    fullname: "",
    bio: ""
}

const fieldClass = "h-10 rounded-xl border border-white/15 bg-white/5 px-3 text-sm text-white placeholder:text-white/35 focus-visible:outline-none"

const ProfileUpdateDialog = ({ profileUpdateDialog, setProfileUpdateDialog }) => {
    const { username } = useParams()
    const { profile } = useSelector(state => state.profileSlice)
    const [profileData, setProfileData] = useState(emptyForm)
    const [saving, setSaving] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!profileUpdateDialog) return
        setProfileData({
            username: profile?.username || "",
            fullname: profile?.fullname || "",
            bio: profile?.bio || "",
        })
    }, [profileUpdateDialog, profile])

    const handleProfileUpdate = () => {
        if (saving) return
        setSaving(true)
        dispatch(updateProfile(profileData))
            .unwrap()
            .then(() => {
                setProfileUpdateDialog(false)
                toast({ title: "Profile updated" })
                dispatch(getUserProfile(username))
            })
            .catch((message) => {
                toast({
                    variant: "destructive",
                    title: "Could not update profile",
                    description: typeof message === "string" ? message : undefined,
                })
            })
            .finally(() => {
                setSaving(false)
            })
    }

    return (
        <Dialog
            open={profileUpdateDialog}
            onOpenChange={(open) => {
                if (saving) return
                setProfileUpdateDialog(open)
            }}
        >
            {profileUpdateDialog ? (
                <DialogContent>
                    <DialogSideBar>
                        <DialogTitle>Edit profile</DialogTitle>
                    </DialogSideBar>

                    <div className="space-y-5 px-5 py-4">
                        <ProfileAvatarUpdate />

                        <div className="grid gap-4">
                            <div className="grid gap-1.5">
                                <Label htmlFor="edit-username" className="text-white/60">Username</Label>
                                <input
                                    id="edit-username"
                                    placeholder="Username"
                                    className={fieldClass}
                                    value={profileData.username}
                                    onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="edit-fullname" className="text-white/60">Name</Label>
                                <input
                                    id="edit-fullname"
                                    placeholder="Your name"
                                    className={fieldClass}
                                    value={profileData.fullname}
                                    onChange={(e) => setProfileData({ ...profileData, fullname: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="edit-bio" className="text-white/60">Bio</Label>
                                <textarea
                                    id="edit-bio"
                                    placeholder="A short bio"
                                    className="min-h-[96px] resize-none rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/35 focus-visible:outline-none"
                                    value={profileData.bio}
                                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <button
                            type="button"
                            onClick={() => setProfileUpdateDialog(false)}
                            disabled={saving}
                            className="rounded-full px-4 py-1.5 text-sm text-white/60 hover:text-white"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleProfileUpdate}
                            disabled={saving}
                            className="rounded-full bg-white px-5 py-1.5 text-sm font-semibold text-black disabled:opacity-40"
                        >
                            {saving ? "Saving" : "Save"}
                        </button>
                    </DialogFooter>
                </DialogContent>
            ) : null}
        </Dialog>
    )
}

export default ProfileUpdateDialog
