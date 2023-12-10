import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/modeToggle";
import { ClerkLoaded, ClerkLoading, UserButton, auth } from "@clerk/nextjs";
import { UserNav } from "../(dashboard)/_components/user-nav";
import { homeUrl, loginUrl, signupUrl } from "../routeData";

export const Header = () => {

  const { userId }: { userId: string | null } = auth();
  return (
    <header className="fixed z-40 top-0 h-14 w-full px-10 lg:px-32 border-b shadow-sm bg-primary flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />

        <div className="flex items-center justify-end space-x-4">
          {!userId ? (
            <>
              <Button variant={"destructive"} size="sm" className="px-6">
                <Link href={loginUrl}>Login</Link>
              </Button>
              <Button variant={"secondary"} size="sm" className="px-6">
                <Link href={signupUrl}>Signup</Link>
              </Button>
              <ModeToggle />
            </>
          ) : (
            <>
              <ModeToggle />
              <ClerkLoading>
                <UserNav />
              </ClerkLoading>
              <ClerkLoaded>
                <UserButton afterSignOutUrl={homeUrl} />
              </ClerkLoaded>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
