import { Calendar, Dot, MapPin } from "lucide-react"
import { Badge } from "./ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"

export const GameDetail = () => {
  return (
    <Card>
      <CardHeader>
        <p className="flex items-center">
          <Dot data-icon="inline-start" /> Poll open
        </p>
        <CardTitle>tuesday night volleyball</CardTitle>
        <CardDescription>
          <p>
            <Badge data-icon="inline-start">
              <Calendar /> fri, nov &middot; 7:00pm
            </Badge>
          </p>

          <p>
            <Badge data-icon="inline-start">
              <MapPin />
            </Badge>
            gold gym
          </p>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div>
          <span>0</span>
          <span>going</span>
        </div>

        <div>
          <span>0</span>
          <span>teams</span>
        </div>
      </CardContent>
    </Card>
  )
}
