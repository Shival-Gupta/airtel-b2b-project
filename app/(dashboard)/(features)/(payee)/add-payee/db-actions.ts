"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/lib/db";
import { payeeFormSchema } from "./payee-form-schema";
import { auth } from "@clerk/nextjs";
import { addPayeeUrl } from "@/app/routeData";

export async function addPayee(
  values: z.infer<typeof payeeFormSchema>
): Promise<number> {
  const { userId } = auth();
  if (!userId) {
    return 2; // no user logon
  }
  try {
    if (values.bank_ifsc) {
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
      revalidatePath(addPayeeUrl);
    }
  } catch (error) {
    // console.error("[SERVER] Error adding payee:", error);
    // throw error;
    return 1; // duplicate entry or database error
  }
  return 0; // successful
}
