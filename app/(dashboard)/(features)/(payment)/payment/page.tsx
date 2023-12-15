import { Separator } from "@/components/ui/separator"
import { DataType } from "../../(payee)/manage-payee/table-layout";
import { getPayeeList } from "../../(payee)/manage-payee/view-payee";
import SelectPayee from "./select-payee";
import { Skeleton } from "@/components/ui/skeleton";

async function getData(): Promise<DataType[] | undefined> {
  return await getPayeeList()
}

export const PaymentPage = async () => {
  const data = await getData()
  return (
    <div className="space-y-4">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Payment</h2>
        <p className="text-muted-foreground">
          Initiate Payment
        </p>
      </div>
      <Separator />
      <div className="flex-col gap-4 items-center">
        {data ? (
          <div className="w-min">
            <SelectPayee data={data} />
          </div>
        ) : (
          <Skeleton className="flex h-48 min-w-full justify-center items-center">Add Payee to beneficiary list</Skeleton>
        )}
      </div>
    </div>
  )
}

export default PaymentPage