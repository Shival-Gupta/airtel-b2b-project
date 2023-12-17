import { Separator } from "@/components/ui/separator"
import { PaymentForm } from "./payment-form";
import { getPayeeDetails } from "../../../(payee)/manage-payee/view-payee";
import { Skeleton } from "@/components/ui/skeleton";

export default async function PayPayeePage({ searchParams }: {
  searchParams: {
    id: string;
  }
}) {
  const id = searchParams.id;
  const payeeData = await getPayeeDetails(id);
  return (
    <div className="space-y-4">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Payment</h2>
        <p className="text-muted-foreground">
          Making payment to <b>{payeeData?.payee_nickname.toUpperCase()}</b>
        </p>
      </div>
      <Separator />
      <div>
        {(payeeData === null || payeeData === undefined) ? (
          <Skeleton className="flex w-full h-72 justify-center items-center">Loading...</Skeleton>
        ) : (
          <PaymentForm data={payeeData} />
        )}
      </div>
    </div>
  )
}
