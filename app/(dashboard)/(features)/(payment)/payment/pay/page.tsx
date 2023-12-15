import { Separator } from "@/components/ui/separator"

export default function PayPayeePage({ searchParams }: {
  searchParams: {
    id: string;
  }
}) {
  const id = searchParams.id;
  return (
    <div className="space-y-4">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Payment</h2>
        <p className="text-muted-foreground">
          Making payment to {id}
        </p>
      </div>
      <Separator />
      <div>
        Payee id: {id}
      </div>
    </div>
  )
}
