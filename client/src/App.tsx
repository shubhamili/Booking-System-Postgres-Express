import { useEffect } from 'react'
import RoutingSetup from './routes/RoutingSetup'
import axios from 'axios'
import { API_ENDPOINTS } from './routes/apiEndpoints'
import { useAppDispatch } from './store/hooks';
import { logout, setUser } from './store/slices/auth';


function App() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.me, { withCredentials: true })
        console.log('response', response);
        dispatch(setUser(response.data.data));
      } catch (error) {
        dispatch(logout());
      }
    }
    checkAuth()
  }, [dispatch])



  return (
    <>
      <RoutingSetup />
    </>
  )
}

export default App