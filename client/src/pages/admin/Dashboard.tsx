import { useAppSelector } from '../../store/hooks';

export const Dashboard = () => {
    const user = useAppSelector((state) => state.auth.user);
    const isAuth = useAppSelector((state) => state.auth.isAuthenticated)
    console.log('isAuth', isAuth)

    return (
        <div>

            <h1>{user?.id}</h1>
            <h1>{user?.name}</h1>
            <h1>{user?.email}</h1>
            <h1>{user?.createdAt}</h1>
            <h1>{user?.token}</h1>
            <h1>{` isAuthenticated : ${isAuth}`}</h1>

        </div>
    )
}
