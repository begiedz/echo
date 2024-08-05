import { redirect } from "next/navigation"

import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"

import { NavigationAction } from "@/components/navigation/navigation-action"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { NavigationItem } from "@/components/navigation/navigation-item"
import { UserButton } from "@clerk/nextjs"
import { ModeToggle } from "../mode-toggle"

export async function NavigationSidebar() {
  const profile = await currentProfile

  !profile && redirect("/")

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          //@ts-ignore
          profileId: profile.id
        }
      }
    }
  });

  return (
    <nav
      className="flex flex-col items-center space-y-4 h-full text-primary w-full dark:bg-[#1E1F22] py-3"
    >
      <NavigationAction />
      <Separator
        className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea
        className="flex-1 w-full">
        {servers.map((server) => (
          <div key={server.id}
            className="mb-4">
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl} />
          </div>
        ))}
      </ScrollArea>
      <section
        className="pb-3 mt-auto flex items-center flex-col gap-y-4"
      >
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]"
            }
          }}
        />
      </section>
    </nav>
  )
}