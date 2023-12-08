import Image from "next/image"
import { Separator } from "@/components/ui/separator"

export default function SettingsLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <div className="space-y-6 p-4 md:block">
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        {/* Progress Side Bar */}
        {/* <aside className="-mx-4 lg:w-1/5"><SidebarNav items={sidebarNavItems} /></aside> */}
        <div className="flex-1 max-w-7xl">
          <div className="rounded p-8 bg-card text-card-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}