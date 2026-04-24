import { useUser, useAuth } from "@clerk/clerk-react"
import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

export function useOnboarding() {
  const { user, isLoaded } = useUser()
  const { getToken } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!isLoaded || !user) return

    if (location.pathname === "/onboarding") return

    const checkLocation = async () => {
      const token = await getToken()
      const res = await fetch(`/api/v1/users/${user.id}`, {
        headers: { "Authorization": `Bearer ${token}` }
      })
      const data = await res.json()

      if (!data.locationId) {
        navigate("/onboarding")
      }
    }

    checkLocation()
  }, [isLoaded, user])
}