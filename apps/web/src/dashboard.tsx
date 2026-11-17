import { Show, SignOutButton, useAuth, useUser } from "@clerk/react"
import { Button } from "./components/ui/button"
import { WelcomeBanner } from "./components/WelcomeBanner"
import { GameDetail } from "./components/GameDetail"
import { useQuery } from "@tanstack/react-query"
import { isAdmin } from "./api/users"
import { Navigate } from "react-router"

export const Dashboard = () => {
  const { user, isSignedIn, isLoaded } = useUser()
  const { getToken } = useAuth()

  const query = useQuery({
    queryKey: ["isAdmin", user?.id],
    queryFn: async () => {
      const token = await getToken()
      if (!token) {
        throw new Error("Sign in to check admin access")
      }
      return isAdmin(token)
    },
    enabled: isLoaded && Boolean(isSignedIn && user?.id),
  })

  if (!isLoaded) {
    return "loading..."
  }

  if (!isSignedIn) {
    return <Navigate to="/" replace />
  }

  if (query.isPending) {
    return "loading..."
  }

  if (query.isError) {
    return <p>Unable to check admin access. Please try again.</p>
  }

  console.log(query.data)

  return (
    <div>
      {query.data ? <p>This is admin</p> : <p>This is regular user</p>}

      <Show when={"signed-in"}>
        <SignOutButton>
          <Button className="w-full appearance-none">Sign out</Button>
        </SignOutButton>
      </Show>

      <WelcomeBanner />

      <GameDetail />
    </div>
  )
}
