import { useForm } from "react-hook-form"
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { API_ENDPOINTS } from "../../routes/apiEndpoints"
import { useAppDispatch } from "../../store/hooks"
import { setUser } from "../../store/slices/auth"

type LoginFormInputs = {
    email: string
    password: string
}

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormInputs>()

    const dispatch = useAppDispatch();


    const navigator = useNavigate()

    const onSubmit = async (data: LoginFormInputs) => {
        try {
            console.log("Form Data:", data)

            const result = await axios.post(
                API_ENDPOINTS.login,
                {
                    email: data.email,
                    password: data.password,
                },
                { withCredentials: true }
            )

            console.log("result", result)

            if (result.status === 200) {
                alert("Login Successful 🚀")
                dispatch(setUser(result.data.data));
                navigator("/admin/dashboard")
            }
        } catch (error) {
            console.error("Login failed:", error)
            alert("Invalid credentials ❌")
        }
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://marketplace.canva.com/EAD2962NKnQ/2/0/1600w/canva-rainbow-gradient-pink-and-purple-virtual-background-_Tcjok-d9b4.jpg')",
            }}
        >
            <div className=" bg-amber-50 p-8 rounded-xl shadow-2xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Login to Your Account
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <Label className=" mb-1">
                            Email
                        </Label>
                        <Input
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Invalid email format",
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <Label className=" mb-1">
                            Password
                        </Label>
                        <Input
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 4,
                                    message: "Minimum 4 characters required",
                                },
                            })}
                        />
                        {errors.password && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full"
                    >
                        {isSubmitting ? "Logging in..." : "Login"}
                    </Button>
                </form>

                <div className="text-center mt-4">
                    <span className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <a
                            href="/signup"
                            className="text-blue-500 hover:underline"
                        >
                            Sign Up
                        </a>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Login