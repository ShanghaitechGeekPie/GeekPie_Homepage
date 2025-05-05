import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BorderBeam } from "@/components/magicui/border-beam";

export function ActivityCard() {
  return (
    <Card className="relative w-[350px] overflow-hidden">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Register</Button>
        <Button>Login</Button>
      </CardFooter>
      <BorderBeam
        duration={4}
        size={300}
        reverse
        className="from-transparent via-green-500 to-transparent"
      />
    </Card>
  );
}


export default function CalendarPage() {
  return (
    <main className="flex flex-col items-center justify-center p-24 gap-10">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Activities Calendar
      </h1>
      <ActivityCard />
    </main>
  )
}