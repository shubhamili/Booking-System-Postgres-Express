import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router";

const Login = () => {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigator = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        const result = await axios.post('http://localhost:3000/api/auth/signin', {
            email, password
        }, { withCredentials: true });

        console.log('result', result)

        if (result.status != '200') {
            console.log('errro', result)
        }
        navigator('/')


    }

    return (
        <div className="w-100 item-center justify-center p-4">
            <button className='border p-2  cursor-pointer' onClick={() => { navigator('/') }}> 🏠 </button>
            <br />
            <br />
            <h1>Login to get in 🤷‍♂️: </h1>
            <br />
            <form className="flex flex-col " onSubmit={submitHandler} >


                <label htmlFor="email">Email</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="border" />

                <label htmlFor="password">Password</label>
                <input type="text" value={password} className="border " onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="cursor-pointer w-20 mt-1 mx-auto border">login</button>
            </form>


        </div>
    )
}

export default Login