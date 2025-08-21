import { useNavigate } from "react-router"

export default function AlertPage() {
  const navigate = useNavigate()
  return (
    <div className="w-full h-screen">
      <div className="absolute inset-50 flex flex-col justify-center items-center bg-red-400 rounded-2xl">
            <p className="text-4xl text-white font-bold">Alert</p>
            <p className="text-[1.2rem]">Please login before access to this feature</p>
            <button className="mt-5 bg-white/70 backdrop-sepia-200 rounded-2xl px-10 py-2 hover:opacity-70 cursor-pointer" onClick={() => navigate('/auth/login')}>Login</button>
      </div>
    </div>
  )
}
