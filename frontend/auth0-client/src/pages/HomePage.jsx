import { useNavigate } from "react-router"

export default function HomePage() {
  const navigate = useNavigate()
  return (
    <div className="w-full h-screen">
      <div className="absolute inset-10 rounded-2xl flex flex-col gap-5 justify-center items-center">
        <h1 className="text-2xl font-bold">Home, welcome to authentication tutorial</h1>
        <button className="bg-black rounded-2xl px-10 py-2 text-white font-bold hover:opacity-70 cursor-pointer" onClick={() => navigate('/auth/login')}>Login</button>
      </div>
    </div>
  )
}
