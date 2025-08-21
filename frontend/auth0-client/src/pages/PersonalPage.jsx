import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { profileApi } from "../services/profileApi"
import { authAPI } from "../services/authApi"
import { removeToken } from "../features/authentication/auth-slice"

export default function PersonalPage() {
  const token = useSelector((state) => state.token.access_token)
  const dispatch = useDispatch()
  const [profile, setProfile] = useState(null)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await profileApi.getProfile()
        setProfile(response.data.profile)
      } catch (error) {
        alert(error)
      }
    }
    fetchProfile()
  },[])
  const handleLogout = async () => {
    try {
      await authAPI.logout()
      alert('Logout successfully!')
      dispatch(removeToken())
    } catch (error) {
      alert(error)
    }
  }
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="bg-black/10 backdrop-sepia-0 rounded-2xl p-10">
        <h1 className="text-center text-2xl font-bold">Profile</h1>
         <p className="w-100 break-all"><span className="font-bold">Token:</span> {token}</p>
        <div>
          {profile ? 
          <p><span className="font-bold">Username:</span> {profile?.username}</p>
          : 
          <p>No data</p>
          }
        </div>
        <button className="px-10 py-2 bg-black text-white font-bold rounded-2xl mt-5" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}
