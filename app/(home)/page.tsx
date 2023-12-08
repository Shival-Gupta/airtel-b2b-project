import { Medal } from "lucide-react";
import Link from "next/link";
import { orgUrl } from "../routeData";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Link href={orgUrl}>
        <div className="mb-4 flex items-center border shadow-sm p-4 bg-primary text-primary-foreground rounded-full uppercase hover:bg-destructive">
          <Medal className="h-6 w-6 mr-2" />
          DASHBOARD
        </div>
      </Link>
    </div>
  );
}
