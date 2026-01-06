import { getSortedPostsData } from "@/lib/posts";
import { generateIcs } from "@/lib/ics";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const events = getSortedPostsData("event");
  const icsContent = generateIcs(events);

  return new NextResponse(icsContent, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="geekpie-events.ics"',
    },
  });
}
