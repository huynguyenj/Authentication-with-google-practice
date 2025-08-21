import { GoogleLogin } from "@react-oauth/google"
import { Link, useNavigate } from "react-router"
import { authAPI } from "../services/authApi"
import { useDispatch } from "react-redux"
import { saveToken } from "../features/authentication/auth-slice"

export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLoginForm = async (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const data = {
      username: form.get('username'),
      password: form.get('password')
    }
    try {
      const response = await authAPI.login(data)
      dispatch(saveToken(response.data.access_token))
      navigate('/profile')
    } catch (error) {
      alert(error)
    }
  }
  const handleLoginGoogle = async (credentialResponse) => {
    //response:
    // {
    //   clientId:'',
    //   credential: '',
    //   select_by: ''
    // }
    try {
      const response = await authAPI.loginByGoogle(credentialResponse.credential)
      dispatch(saveToken(response.data.access_token))
      navigate('/profile')
    } catch (error) {
      alert(error)
    }

  }
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center bg-black text-white w-100 rounded-2xl px-5 py-15">
        <h1 className="text-2xl text-center font-bold">Login</h1>
        <form onSubmit={handleLoginForm} className="mt-10 mb-5">
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input name="username" id="username" type="text" className="bg-white text-black px-2 py-2 rounded-[5px]" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input name="password" id="password" type="password" className="bg-white text-black px-2 py-2 rounded-[5px]"/>
          </div>
          <div className="mt-2">
            <p>Don't have account ? <Link className="text-blue-300" to={'/auth/register'}>Sign up</Link></p>
          </div>
            <button type="submit" className="bg-white text-black rounded-2xl w-[20rem] mx-auto px-5 py-2 mt-5 hover:opacity-70 cursor-pointer">Sign in</button>
        </form>
        <GoogleLogin onSuccess={handleLoginGoogle}/>
      </div>
    </div>
  )
}
