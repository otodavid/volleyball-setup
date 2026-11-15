import { Show, SignInButton, SignOutButton } from "@clerk/react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Lock, MapPin, MoveRight } from "lucide-react"

export const Home = () => {
  return (
    <section>
      <div>
        <Badge>your weekly game, sorted</Badge>

        <h1>
          less admin <span>more play</span>
        </h1>
        <p>
          One place for availability, fair teams, and everything your volleyball
          crew needs to get on court
        </p>
      </div>

      <div>
        <Card aria-labelledby="aria-labelledby">
          <CardHeader>
            <p>The Club is waiting</p>
            <CardTitle id="login-heading">Get on court.</CardTitle>
            <CardDescription>
              continue to your dashboard to reserve your spot and see where
              you&apos;re playing
            </CardDescription>
          </CardHeader>

          <CardContent>
            <article className="flex flex-wrap gap-3 rounded-md bg-muted p-3">
              <div className="size-3/4 grow space-y-1">
                <p className="text-[9px] font-medium tracking-widest text-muted-foreground uppercase">
                  Coming up
                </p>
                <p className="text-sm font-semibold capitalize">
                  tuesday night volleyball
                </p>
              </div>

              <time
                dateTime="2026-11-17"
                className="flex w-9 grow-0 flex-col items-center justify-center rounded-lg bg-card"
              >
                <span className="text-[9px] text-muted-foreground uppercase">
                  TUE
                </span>
                <span className="text-xs font-extrabold">17</span>
              </time>

              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin size={12} className="text-primary" />
                Blue gym &middot; 7:00pm - 10:00pm
              </p>
            </article>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <Show when={"signed-out"}>
              <SignInButton>
                <Button className="w-full appearance-none">
                  Continue to SetUp
                  <MoveRight data-icon="inline-end" />
                </Button>
              </SignInButton>
            </Show>

            <p className="flex items-center space-x-1 text-[10px] text-muted-foreground">
              <Lock size={12} />
              <span>Secure sign-in</span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}
