"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/lib/db";
import { payeeFormSchema } from "./payee-form-schema";

export async function addPayee(
  values: z.infer<typeof payeeFormSchema>
): Promise<boolean> {
  try {
    await db.payee.create({
      data: {
        bank_type: values.bank_type,
        bank_ifsc: values.bank_ifsc,
        ac_type: values.ac_type,
        ac_no: values.ac_no,
        payee_name: values.payee_name,
        payee_nickname: values.payee_nickname,
        payee_email: values.payee_email,
        payee_mob_no: values.payee_mob_no,
      },
    });
    // console.log("[SERVER] Successfully added Payee!");
    revalidatePath("/add-payee");
  } catch (error) {
    // console.error("[SERVER] Error adding payee:", error);
    // throw error;
    return false;
  }
  return true;
}
