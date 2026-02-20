import { useState } from 'react'

import RoutingSetup from './routes/RoutingSetup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RoutingSetup />
    </>
  )
}

export default App
