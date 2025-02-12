import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';


const CheckAuth = ({ children }) => {
    const { isAuthenticated } = useSelector(state => state.auth);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(!isAuthenticated){
            navigate('/auth/login');
        }
    
        if(isAuthenticated){
            if(location.pathname.includes('/login') || location.pathname === '/'){
                const redirect = sessionStorage.getItem('redirect') || '/home'
                navigate(redirect);
            }
        }
    }, [isAuthenticated]);
    

    // if(!isAuthenticated){
    //     navigate('/login');
    // }

    // if(isAuthenticated){
    //     if(location.pathname.includes('/login') || location.pathname === '/'){
    //         const redirect = sessionStorage.getItem('redirect') || '/home'
    //         navigate(redirect);
    //     }
    // }

    // ! Call navigate Inside useEffect - This was a mistake to check Auth inside useEffect
    // useEffect(() => {
    //     if (!isAuthenticated) {
    //         console.log(location.pathname);
    //         const redirect = location.pathname === '/' ? '/home' : location.pathname;
    //         sessionStorage.setItem('redirect', redirect);
    //         navigate('/login');
    //     }
    // }, [isAuthenticated]);

    return (
        <>
            {children}
        </>
    )
}

export default CheckAuth