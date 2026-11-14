import { Show, SignOutButton } from "@clerk/react"
import { Button } from "./components/ui/button"

export const Dashboard = () => {
  return (
    <div>
      <h1>Welcome to the dashboard</h1>

      <Show when={"signed-in"}>
        <SignOutButton>
          <Button className="w-full appearance-none">Sign out</Button>
        </SignOutButton>
      </Show>
    </div>
  )
}
