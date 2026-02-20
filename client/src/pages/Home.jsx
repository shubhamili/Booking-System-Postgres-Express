import React from 'react'
import { useNavigate } from "react-router";
const Home = () => {
    const navigator = useNavigate();
    return (
        <div>
            <button
                type="button"
                onClick={() => { navigator('/login') }}
                className='bg-amber-400 m-4 p-5'
            >
                go to login ➡️
            </button>
        </div>
    )
}

export default Home