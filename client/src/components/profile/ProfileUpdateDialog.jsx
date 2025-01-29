import React, { useState } from 'react'
import { Dialog, DialogContent, DialogSideBar, DialogTitle } from '../ui/dialog.jsx'
import { Label } from '../ui/label.jsx';
import { Input } from '../ui/input.jsx';
import { Button } from '../ui/button.jsx';
import { Textarea } from '../ui/textarea.jsx';
import { useDispatch } from 'react-redux';
import { getUserProfile, updateProfile } from '@/store/slices/profileSlice.js';
import { toast } from '@/hooks/use-toast.js';
import ProfileAvatarUpdate from './ProfileAvatarUpdate.jsx';
import { useParams } from 'react-router-dom';

const formData = {
    username: "",
    fullname: "",
    bio: ""
}

const ProfileUpdateDialog = ({ profileUpdateDialog, setProfileUpdateDialog }) => {
    const {username} = useParams();

    const [profileData, SetprofileData] = useState(formData);

    const dispatch = useDispatch();

    const handleProfileUpdate = () => {
        // console.log(profileData);
        dispatch(updateProfile(profileData)).then(() => {
            SetprofileData(formData);
            setProfileUpdateDialog(false);
            toast({
                title: "Profile Updated Succesfully"
            });
            dispatch(getUserProfile(username));
        })
    }

    return (
        <Dialog open={profileUpdateDialog}
            onOpenChange={() => { setProfileUpdateDialog(false) }}
            className='max-h-screen overflow-y-scroll'
        >
            <DialogContent>
                <DialogSideBar>
                    <DialogTitle className='text-center' >Update profile</DialogTitle>
                </DialogSideBar>

                {/* // ! Update Avatar */}
                <ProfileAvatarUpdate />

                {/* // ! Update Data */}
                <div className='grid gap-4'>
                    <div className="grid items-center gap-1.5">
                        <Label htmlFor="username">Username</Label>
                        <Input type="username" id="username" placeholder="Username"
                            value={profileData.username}
                            onChange={(e) => SetprofileData(
                                { ...profileData, username: e.target.value })
                            }
                        />
                    </div>
                    <div className="grid items-center gap-1.5">
                        <Label htmlFor="fullname">Fullname</Label>
                        <Input type="fullname" id="fullname" placeholder="Fullname"
                            value={profileData.fullname}
                            onChange={(e) => SetprofileData(
                                { ...profileData, fullname: e.target.value })
                            }
                        />
                    </div>
                    <div className="grid items-center gap-1.5">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea type="bio" id="bio" placeholder="Bio"
                            className='min-h-[100px]'
                            value={profileData.bio}
                            onChange={(e) => SetprofileData(
                                { ...profileData, bio: e.target.value })
                            }
                        />
                    </div>
                </div>
                <Button onClick={handleProfileUpdate} >
                    Save Changes
                </Button>
            </DialogContent>
        </Dialog>
    )
}

export default ProfileUpdateDialog