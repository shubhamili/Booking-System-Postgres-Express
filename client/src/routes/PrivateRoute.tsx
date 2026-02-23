import { useAppSelector } from '../store/hooks'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, isAuthChecked, user } = useAppSelector(
        (state) => state.auth
    )

    console.log("isAuthenticated, loading", isAuthenticated,);

    if (!isAuthChecked) {
        return <div>Loading...</div>
    }

    if (!isAuthenticated || !user) {
        return <Navigate to="/admin/login" replace />
    }

    return children
}


export default PrivateRoute
