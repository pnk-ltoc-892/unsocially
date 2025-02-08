import Header from '@/components/landing/Header.jsx'
import Heading from '@/components/landing/Heading.jsx'
import Spinner from '@/components/UI Components/Spinner.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { boxGradients } from '@/config/styles.js'
import { toast } from '@/hooks/use-toast.js'
import { loginUser, registerUser } from '@/store/slices/authSlice.js'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Login = ({ setInit, init }) => {
    const { isAuthenticated } = useSelector(state => state.auth);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    })

    const [login, setLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogin = () => {
        setLoading(true);
        if (login) {
            dispatch(loginUser(formData)).then(() => {
                toast({
                    title: "Welcome Back"
                })
            })
        }
        else {
            dispatch(registerUser(formData)).then(() => {
                toast({
                    title: "Registered"
                })
                setLogin(true);
            })
        }
        // setInit(true);
        setLoading(false);
        // login ? dispatch(loginUser(formData)) : dispatch(registerUser(formData));
    }
    // const handleAnimation = () => {
    //     setInit(false);
    // }

    useEffect(() => {
        // handleAnimation();
        if (isAuthenticated) {
            const redirect = sessionStorage.getItem('redirect') || '/home';
            navigate(redirect);
        }

    }, [isAuthenticated])

    return (
        <>
            {/* <Header /> */}
            <div className='h-full flex justify-center items-start absolute inset-0  bg-black bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]'>

                <div className='pt-16 flex flex-col justify-center items-center gap-8'>

                    {/* // ! Heading Text */}
                    <Heading />

                    <div className="mt-6 relative hover:slide-right-normal">
                        {/* <div
                            className={'absolute -inset-1 rounded-lg bg-gradient-to-br from-teal-600 via-fuchsia-600 to-rose-600 opacity-80 blur-[16px]'}
                        ></div> */}

                        <div className="shadow-[0px_20px_207px_10px_rgba(255,_255,_255,_0.35)] relative border w-full rounded-lg text-slate-300 bg-[#000000]">

                            <div className='w-[30vw] scale-in-center-normal p-6'>
                                <div defaultValue='login' className='w-full flex flex-col justify-center items-center gap-2'>
                                    <div className='flex bg-white justify-center items-center gap-4 px-2 py-1 rounded-full text-md text-black font-semibold'>
                                        <span className={`px-5 py-1 cursor-pointer rounded-full ${login ? 'bg-black text-white' : ''}`} onClick={() => setLogin(true)}>Login</span>
                                        <span className={`px-5 py-1 cursor-pointer rounded-full ${!login ? 'bg-black text-white' : ''}`} onClick={() => setLogin(false)}>Register</span>
                                    </div>

                                    <div className='w-full p-2'>
                                        {login ? null
                                            :
                                            (
                                                <>
                                                    <Label>Username</Label>
                                                    <Input type="text"
                                                        placeholder="Username"
                                                        value={formData.username}
                                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                                    />
                                                </>
                                            )}

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
                                </div>

                                {
                                    loading
                                        ?
                                        <Button className="w-full mt-8">
                                            <Spinner />
                                        </Button>
                                        :
                                        <Button className='w-full mt-8'
                                            onClick={handleLogin}
                                        >
                                            {login === true ? "Login" : "Register"}
                                        </Button>
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>)
}

export default Login