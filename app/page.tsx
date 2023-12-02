import { Medal } from "lucide-react";

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-col">
      <div>
        B2B Solution for SME
      </div>
      <div className="flex items-center justify-center flex-col">
        <div>
          brought to you by
        </div>
        <div className="mb-4 flex items-center border shadow-sm p-4 bg-primary text-primary-foreground rounded-full uppercase hover:bg-destructive">
          <Medal className="h-6 w-6 mr-2" />
          Airtel Payments Bank
        </div>
      </div>
      <div className="flex items-center justify-center flex-row">
      </div>
    </div>
  )
}