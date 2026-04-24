import { useState, useEffect } from "react"
import { useAuth } from "@clerk/clerk-react"
import { useNavigate } from "react-router-dom"

export default function OnboardingPage() {
  const { getToken } = useAuth()
  const navigate = useNavigate()
  const [locationId, setLocationId] = useState("")
  const [locations, setLocations] = useState([])

  useEffect(() => {
    const fetchLocations = async () => {
      const res = await fetch("/api/v1/locations")
      const data = await res.json()
      setLocations(data)
    }
    fetchLocations()
  }, [])

  const handleContinue = async () => {
    if (!locationId) return

    const token = await getToken()

    await fetch("/api/v1/auth/set-location", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ locationId })
    })

    navigate("/inventory-search")
  }

  return (
    <div>
      <h1>Pick your location</h1>
      <select value={locationId} onChange={(e) => setLocationId(e.target.value)}>
        <option value="">Select a location...</option>
        {locations.map((loc: any) => (
          <option key={loc.id} value={loc.id}>{loc.name}</option>
        ))}
      </select>
      <button onClick={handleContinue} disabled={!locationId}>
        Continue
      </button>
    </div>
  )
}