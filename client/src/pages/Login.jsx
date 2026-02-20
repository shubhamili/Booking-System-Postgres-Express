import { useState } from "react"

const Login = () => {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = async (e) => {
        e.preventDefault();

    }

    return (
        <div className="w-100 item-center justify-center p-4">
            <h1>Login to get in 🤷‍♂️: </h1>
            <br />
            <form className="flex flex-col " onSubmit={submitHandler} >


                <label htmlFor="email">Email</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="border" />

                <label htmlFor="password">Password</label>
                <input type="text" value={password} className="border " onChange={(e) => setPassword(e.target.value)} />
                <br />
                <button type="submit" className="cursor-pointer w-20 mx-auto">login</button>
            </form>


        </div>
    )
}

export default Login