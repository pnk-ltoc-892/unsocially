import React from 'react'
import thoughts from '../../public/Thoughts.png'
import { Button } from '@/components/ui/button.jsx'


const Login = () => {
    return <div className='bg-thoughts bg-repeat flex justify-center items-start h-screen text-white pt-3 overflow-y-scroll overflow-x-auto'>
        <div class="text-5xl font-extrabold ...">
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                Thoughts
                <Button>Sign In</Button>
            </span>
        </div>

    </div>
}

export default Login