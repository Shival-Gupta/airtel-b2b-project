"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/lib/db";
import { orgFormSchema } from "./org-form-schema";
import { auth } from "@clerk/nextjs";
import { orgCompleteUrl } from "@/app/routeData";

export async function addOrganization(
  values: z.infer<typeof orgFormSchema>
): Promise<number> {
  const { userId, orgId } = auth();
  if (!userId) {
    return 2; // no user logon
  }
  if (!orgId) {
    return 3; // no org selected
  }
  try {
    console.log(orgId, values);
    if (values.bank_ifsc) {
      await db.organization.create({
        data: {
          org_id: orgId,
          nominee_name: values.nominee_name,
          org_address: values.org_address,
          org_email: values.org_email,
          org_mob_no: values.org_mob_no,
          bank_type: values.bank_type,
          bank_ifsc: values.bank_ifsc,
          ac_type: values.ac_type,
          ac_no: values.ac_no,
          ac_balance: values.ac_balance,
        },
      });
      revalidatePath(orgCompleteUrl);
      return 0; // successful
    }
  } catch (error) {
    // console.error("[SERVER] Error adding org:", error);
    // throw error;
    return 1; // duplicate entry or database error
  }
  return -1; // unsuccessful
}
