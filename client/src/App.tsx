import { useEffect } from 'react'
import RoutingSetup from './routes/RoutingSetup'
import axios from 'axios'
import { API_ENDPOINTS } from './routes/apiEndpoints'
import { useAppDispatch } from './store/hooks';
import { authCheckComplete, setUser } from './store/slices/auth';


function App() {

  const dispatch = useAppDispatch();

  useEffect(() => {

    const authCheck = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.me, { withCredentials: true });
        dispatch(setUser(response.data.data));
      } catch (error) {
        dispatch(authCheckComplete())
      }
    }

    authCheck()


  }, [])






  return (
    <>
      <RoutingSetup />
    </>
  )
}

export default App