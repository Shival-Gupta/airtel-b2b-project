import { DataType, columns } from "./table-layout"
import { DataTable } from "@/components/ui/data-table"
import { getPayeeList } from "./view-payee";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { UserRoundPlus } from "lucide-react";
import { addPayeeUrl } from "@/app/routeData";
import Link from "next/link";

async function getData(): Promise<DataType[]> {
  return await getPayeeList();
}

export default async function ManagePayeePage() {
  const data = await getData()

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end space-y-0.5">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Manage Payee</h2>
          <p className="text-muted-foreground">
            Manage Payee
          </p>
        </div>
        <Button asChild>
          <Link href={addPayeeUrl} target="_blank">
            <UserRoundPlus className="h-4 w-4 p-0 mr-1" />Add Payee
          </Link>
        </Button>
      </div>
      <Separator />

      <DataTable columns={columns} data={data} />
    </div>
  )
}