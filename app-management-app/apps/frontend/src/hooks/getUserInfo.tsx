import { useUser, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

export function getUserInfo() {
  const { user, isLoaded } = useUser()
  const { getToken } = useAuth()

  useEffect(() => {
    if (!isLoaded || !user) return

    const syncUser = async () => {
      const token = await getToken()

      await fetch('/api/v1/auth/getuserinfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          clerkId: user.id,
          email: user.emailAddresses[0].emailAddress,
          name: user.fullName ?? undefined
        })
      })
    }

    syncUser()
  }, [isLoaded, user])
}