import React from 'react'

const Bio = ({ profile }) => {
    return (
        <div className='max-w-lg text-lg py-3'>
            {profile?.bio}
        </div>
    )
}

export default Bio