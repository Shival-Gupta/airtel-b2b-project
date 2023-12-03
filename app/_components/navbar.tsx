import Link from "next/link";
import { Logo } from "@/components/logo";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/modeToggle";
import { UserButton, auth } from "@clerk/nextjs";

export const Navbar = () => {
    const { userId }: { userId: string | null } = auth();
    return (
        <div className="fixed top-0 h-14 w-full px-10 lg:px-32 border-b shadow-sm bg-primary flex items-center">
            <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
                <Logo />
                <div className="flex items-center justify-end content-center space-x-4">
                    {!userId ? (
                        <>
                            <Button variant={"destructive"} size="sm" className="px-6" asChild>
                                <Link href={"" + process.env.LOGIN}>
                                    Login
                                </Link>
                            </Button>
                            <Button variant={"secondary"} size="sm" className="px-6" asChild>
                                <Link href={"" + process.env.SIGNUP}>
                                    Signup
                                </Link>
                            </Button>
                        </>
                    ) : (
                        <>
                            <UserButton afterSignOutUrl="/" />
                        </>
                    )}
                    <ModeToggle />
                </div>
            </div>
        </div>
    );
};
