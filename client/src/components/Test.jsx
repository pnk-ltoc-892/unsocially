import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../store/slices/authSlice.js';

const Test = () => {
    const { isAuthenticated, isLoading, user } = useSelector(state => state.auth)
    console.log({ isAuthenticated, isLoading, user });

    const dispatch = useDispatch()
    dispatch(setUser("Pankaj"))
    
    return (
        <div className='bg-primary h-screen' >Test</div>
    )
}

export default Test