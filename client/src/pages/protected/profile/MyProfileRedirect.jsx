import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const MyProfileRedirect = () => {
    const { user } = useSelector(state => state.auth);

    if (user?.username) {
        return <Navigate to={`/profile/user/${user.username}`} replace />;
    }

    return <Navigate to="/home" replace />;
}

export default MyProfileRedirect
