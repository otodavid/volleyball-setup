type Role = "admin" | "player"

interface Content {
  heading: string
  description: string
  badge: string
}

const WelcomeMessage: Record<Role, Content> = {
  admin: {
    heading: "Run the next game.",
    description:
      "Set the session, collect responses, and build teams without the group chat chaos",
    badge: "admin command center",
  },
  player: {
    heading: "Hey David",
    description:
      "Let the group know if you are playing, then check back when teams are ready.",
    badge: "player dashboard",
  },
}

export const WelcomeBanner = () => {
  return (
    <div>
      <p className="flex items-center gap-2">
        <span className="h-px w-7 bg-muted-foreground" />{" "}
        {WelcomeMessage["admin"].badge}
      </p>
      <h1>{WelcomeMessage["admin"].heading}</h1>
      <p>{WelcomeMessage["admin"].description}</p>
    </div>
  )
}
