import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const CheckAuth = ({ children }) => {
    const { isAuthenticated } = useSelector(state => state.auth);
    const location = useLocation();

    const isAuthRoute = location.pathname.startsWith('/auth');
    if (!isAuthenticated) {
        return isAuthRoute
            ? children
            : <Navigate to="/auth/login" replace state={{ from: location.pathname }} />;
    }

    return isAuthRoute
        ? <Navigate to={location.state?.from || '/home'} replace />
        : children;
}

export default CheckAuth
