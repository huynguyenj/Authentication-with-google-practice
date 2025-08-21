import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router"

export default function AuthenticationRoute() {
  const token = useSelector((state) => state.token.access_token)
  if (token) {
      return <Outlet/>
  }
  else {
      return <Navigate to='/alert' replace/>
  }
}
