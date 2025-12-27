"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BorderBeam } from "@/components/magicui/border-beam";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { format } from "date-fns";
import { PostData } from "@/lib/posts";

export function EventInfoCard({ post }: { post: PostData }) {
  const now = new Date();
  const start = post.start ? new Date(post.start) : null;
  const end = post.end ? new Date(post.end) : null;

  let status = "ended";
  if (start && now < start) {
    status = "upcoming";
  } else if (start && end && now >= start && now <= end) {
    status = "ongoing";
  } else if (!end && start && now >= start) {
    // If no end time, assume ongoing if started? or just ended?
    // Let's assume if no end time, it's just a point in time event, so if passed it's ended.
    status = "ended";
  }

  const getStatusBorderColor = (status: string) => {
    switch (status) {
      case "ongoing":
        return "from-transparent via-green-500 to-transparent";
      case "upcoming":
        return "from-transparent via-purple-500 to-transparent";
      default:
        return "from-transparent via-gray-500 to-transparent";
    }
  };

  return (
    <Card className="relative w-full overflow-hidden mb-8">
      <CardHeader className="flex flex-row justify-between items-center gap-2 flex-wrap">
        <CardTitle className="text-xl">Event Info</CardTitle>
        {post.link && (
          <InteractiveHoverButton className="w-auto">
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4"
            >
              Link
            </a>
          </InteractiveHoverButton>
        )}
      </CardHeader>
      <CardContent className="px-6 py-4">
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
          {post.place && (
            <>
              <dt className="font-bold text-muted-foreground">Location:</dt>
              <dd className="text-foreground">{post.place}</dd>
            </>
          )}
          {start && (
            <>
              <dt className="font-bold text-muted-foreground">Start:</dt>
              <dd className="text-foreground">{format(start, "PPpp")}</dd>
            </>
          )}
          {end && (
            <>
              <dt className="font-bold text-muted-foreground">End:</dt>
              <dd className="text-foreground">{format(end, "PPpp")}</dd>
            </>
          )}
          {post.guest && Array.isArray(post.guest) && post.guest.length > 0 && (
            <div className="col-span-2 mt-2">
              <dt className="font-bold text-muted-foreground mb-2">Guests:</dt>
              <dd className="text-foreground">
                <ul className="flex flex-wrap gap-2">
                  {post.guest.map((guest: string) => (
                    <li
                      key={guest}
                      className="flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-full text-sm"
                    >
                      {!guest.startsWith("/") && (
                        <img
                          src={`https://github.com/${guest.split("/")[0]}.png`}
                          alt={guest}
                          className="w-5 h-5 rounded-full"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                          }}
                        />
                      )}
                      <span>
                        {(guest.startsWith("/")
                          ? guest.slice(1)
                          : guest
                        ).replace("/", " / ")}
                      </span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
        </dl>
      </CardContent>
      <BorderBeam
        duration={5}
        size={300}
        reverse
        className={getStatusBorderColor(status)}
      />
    </Card>
  );
}
