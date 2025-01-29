import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { loginUser, registerUser } from '@/store/slices/authSlice.js'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const { isAuthenticated } = useSelector(state => state.auth);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    })

    const [login, setLogin] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogin = () => {
        login ? dispatch(loginUser(formData)) : dispatch(registerUser(formData));
    }

    useEffect( () => {
        if (isAuthenticated) {
            const redirect = sessionStorage.getItem('redirect') || '/home';
            navigate(redirect);
        }
    }, [isAuthenticated] )

    return <div className='bg-thoughts bg-repeat h-screen flex justify-center items-center'>
        <div className='bg-background w-[35%] mx-auto px-6 py-8 rounded-lg border border-neutral-200'>
            <div defaultValue='login' className='w-full flex flex-col justify-center items-center' >

                <div className='bg-gray-800 flex justify-center items-center gap-4 px-6 py-1 rounded-xl'>
                    <span className={`px-5 py-1 cursor-pointer rounded-xl ${login ? 'bg-black' : ''}`} onClick={() => setLogin(true)}>Login</span>
                    <span className={`px-5 py-1 cursor-pointer rounded-xl ${!login ? 'bg-black' : ''}`} onClick={() => setLogin(false)}>Register</span>
                </div>

                <div className='w-full p-2'>
                    {
                        login ?
                            (
                                <div>
                                    <Label>Email</Label>
                                    <Input type="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                    <Label>Password</Label>
                                    <Input type="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>
                            )
                            :
                            (
                                <div>
                                    <Label>Username</Label>
                                    <Input type="text"
                                        placeholder="Username"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    />
                                    <Label>Email</Label>
                                    <Input type="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                    <Label>Password</Label>
                                    <Input type="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>
                            )
                    }
                </div>
            </div>

            <Button className='w-full mt-8'
                onClick={handleLogin}
            >
                {login === true ? "Login" : "Register"}
            </Button>
        </div>
    </div>
}

export default Login