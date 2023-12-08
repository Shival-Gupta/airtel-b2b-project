import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import Link from "next/link"

export default function NotFound() {
    return (
        <div>
            <h2>Not Found</h2>
            <p>Could not find requested Page</p>
            <Link href="/">Return Dashboard</Link>
        </div>
    )
}