import { Link } from 'react-router'
import { authAPI } from '../services/authApi'

export default function Register() {
    const handleRegisterForm = async (e) => {
      e.preventDefault()
      const form = new FormData(e.currentTarget)
      const data = {
      username: form.get('username'),
      password: form.get('password')
    }
    try {
      await authAPI.register(data)
      alert('Register successfully')
    } catch (error) {
      alert(error)
    }
  }
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center bg-black text-white w-100 rounded-2xl px-5 py-15">
        <h1 className="text-2xl text-center font-bold">Register</h1>
        <form onSubmit={handleRegisterForm} className="mt-10 mb-5">
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input name='username' id="username" type="text" className="bg-white text-black px-2 py-2 rounded-[5px]" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input name='password' id="password" type="password"  className="bg-white text-black px-2 py-2 rounded-[5px]"/>
          </div>
          <div className="mt-2">
            <p>Have account ? <Link className="text-blue-300" to={'/auth/login'}>Sign in</Link></p>
          </div>
            <button type='submit' className="bg-white text-black rounded-2xl w-[20rem] mx-auto px-5 py-2 mt-5 hover:opacity-70 cursor-pointer">Sign up</button>
        </form>
      </div>
    </div>
  )
}
