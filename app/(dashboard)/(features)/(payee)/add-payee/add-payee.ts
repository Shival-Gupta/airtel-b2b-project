"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/lib/db";
import { payeeFormSchema } from "./payee-form-schema";
import { auth } from "@clerk/nextjs";
import { addPayeeUrl, managePayeeUrl } from "@/app/routeData";

export async function addPayee(
  values: z.infer<typeof payeeFormSchema>
): Promise<number> {
  const { userId, orgId } = auth();
  if (!userId) {
    return 2; // no user logon
  }
  if (!orgId) {
    return 3; // no organization selected
  }

  if (values.bank_ifsc) {
    return 4;
  } else {
    try {
      await db.$transaction(async (tx) => {
        const newPayee = tx.payee.create({
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

        tx.payeeOrganization.create({
          data: {
            org_id: orgId,
            payee_id: (await newPayee).payee_id,
          },
        });
      });
    } catch (error) {
      // console.error("[SERVER] Error adding payee:", error);
      // throw error;
      return 1; // duplicate entry (database error)
    }

    revalidatePath(managePayeeUrl);
    revalidatePath(addPayeeUrl);
    return 0; // successful
  }

  return -1; // unsuccessful
}
