import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const CheckAuth = ({ children }) => {
    const { isAuthenticated } = useSelector(state => state.auth);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            // Storing an /auth path here would overwrite the destination the user
            // was actually heading for, stranding them on the login page.
            if (!location.pathname.startsWith('/auth')) {
                sessionStorage.setItem('redirect', location.pathname);
            }
            navigate('/auth/login', { replace: true });
            return;
        }

        if (location.pathname.startsWith('/auth')) {
            const redirect = sessionStorage.getItem('redirect') || '/home';
            sessionStorage.removeItem('redirect');
            navigate(redirect, { replace: true });
        }
    }, [isAuthenticated, location.pathname, navigate]);

    return (
        <>
            {children}
        </>
    )
}

export default CheckAuth
