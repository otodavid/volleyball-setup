import { Show, SignOutButton } from "@clerk/react"
import { Button } from "./components/ui/button"
import { WelcomeBanner } from "./components/WelcomeBanner"
import { GameDetail } from "./components/GameDetail";

export const Dashboard = () => {
  return (
    <div>
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
