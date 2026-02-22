// import type { ReactNode } from 'react'
// import { useAppSelector } from '../store/hooks'
// import { Navigate } from 'react-router-dom'

// const PrivateRoute = ({ children }: { children: ReactNode }) => {



//     const isAuthenticated = useAppSelector(
//         (state) => state.auth.isAuthenticated
//     )
//     if (!isAuthenticated) {
//         return <Navigate to={'/admin/login'} replace />
//     }
//     return children;
// }

// export default PrivateRoute



import type { ReactNode } from 'react'
import { useAppSelector } from '../store/hooks'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, loading } = useAppSelector(
        (state) => state.auth
    )

    if (loading) {
        return <div>Loading...</div> // or spinner
    }

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />
    }

    return children
}


export default PrivateRoute
