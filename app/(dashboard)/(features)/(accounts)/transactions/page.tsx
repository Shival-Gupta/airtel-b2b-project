import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton";
import { getTransactionRecords } from "./view-transaction";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./table-layout";

export default async function TransactionPage() {
  const data = await getTransactionRecords();
  return (
    <div className="space-y-4">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Recent Transactions</h2>
        <p className="text-muted-foreground">
          Transactions
        </p>
      </div>
      <Separator />
      <div>
        {data ? (
          <DataTable columns={columns} data={data} />
        ) : (
          <Skeleton className="flex w-full h-72 justify-center items-center">Loading...</Skeleton>
        )}
      </div>
    </div>
  )
}
