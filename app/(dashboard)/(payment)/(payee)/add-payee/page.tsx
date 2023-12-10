import { Separator } from "@/components/ui/separator";
import { AddPayeeForm } from "./payee-form";

export default function AddPayeePage() {
    return (
        <div className="space-y-4">
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Add Payee</h2>
                <p className="text-muted-foreground">
                    Add Payee to the beneficiary list
                </p>
                <Separator />
            </div>
            <AddPayeeForm />
        </div>
    )
}