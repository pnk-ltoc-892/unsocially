import { Button } from '@/components/ui/button.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import React from 'react'


const Login = () => {
    return <div className='bg-thoughts bg-repeat flex justify-center items-center h-screen text-white pt-3 overflow-y-scroll overflow-x-auto'>
        <div className='' >
            <div class="flex justify-center items-center text-5xl font-extrabold ...">
                <span class="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                    Thoughts
                </span>
            </div>
            <div>
                <Tabs defaultValue='login' className='w-[400px]' >
                    <TabsList>
                        <TabsTrigger value='register' >Register</TabsTrigger>
                        <TabsTrigger value='login' >Login</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">Make changes to your account here.</TabsContent>
                    <TabsContent value="password">Change your password here.</TabsContent>

                </Tabs>
            </div>
        </div>
    </div>
}

export default Login