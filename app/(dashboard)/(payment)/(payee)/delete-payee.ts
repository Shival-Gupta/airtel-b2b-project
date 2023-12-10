import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { payeeFormSchema } from "./add-payee/payee-form-schema";

export function deletePayee(values: z.infer<typeof payeeFormSchema>){
    db.payee.({
    })
    revalidatePath("");
}