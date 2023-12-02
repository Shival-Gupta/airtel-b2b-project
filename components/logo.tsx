import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const titleFont = Poppins({
    subsets: ["latin"],
    weight: [
        "100", "200", "300", "400", "500", "600", "700", "800"
    ]
})

export const Logo = () => {
    return (
        <Link href="/">
            <div className="flex flex-row hover:opacity-80 transition items-center gap-x-2">
                <Image
                    src="https://assets.airtel.in/static-assets/b2b-ui-components-lib/images/Airtel_Sub_Black_Logo.svg"
                    alt="logo"
                    height={30}
                    width={30}
                    className="invert" />

                <div className={cn(
                    "font-medium text-primary-foreground",
                    titleFont.className
                )}>
                    <div className="-mb-1.5">
                        Payments
                    </div>
                    <div className="-mt-1.5">
                        Bank
                    </div>
                </div>
            </div>
        </Link>
    );
};