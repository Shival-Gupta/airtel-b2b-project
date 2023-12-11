"use server";

import { z } from "zod";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { payeeFormSchema } from "./payee-form-schema";
import { managePayeeUrl } from "@/app/routeData";

async function createPayee(tx: any, values: z.infer<typeof payeeFormSchema>) {
  return tx.payee.create({
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
}
async function createPayeeOrganization(tx: any, org_Id: string, payeeData: any) {
  return tx.payeeOrganization.create({
    data: {
      org_id: org_Id,
      payee_id: payeeData.payee_id,
    },
  });
}
async function fetchExistingPayee(values: z.infer<typeof payeeFormSchema>) {
  return db.payee.findFirstOrThrow({
    where: {
      bank_ifsc: "" + values.bank_ifsc,
      ac_no: values.ac_no,
    },
  });
}
export async function addPayee(
  values: z.infer<typeof payeeFormSchema>
): Promise<number> {
  const { userId, orgId } = auth();
  let errorCode = -1;

  try {
    if (!userId) {
      errorCode = 2; // no user logon
      throw new Error("No user logon");
    }

    if (!orgId) {
      errorCode = 3; // no organization selected
      throw new Error("No organization selected");
    }

    if (!values.bank_ifsc) {
      errorCode = 4; // ifsc code null
      throw new Error("IFSC code is null");
    }

    await db.$transaction(async (tx) => {
      let payeeData;
      try {
        payeeData = await fetchExistingPayee(values);
      } catch (error) {
        payeeData = await createPayee(tx, values);
      }
      await createPayeeOrganization(tx, orgId, payeeData);
    });

    revalidatePath(managePayeeUrl);
    return 0; // successful
  } catch (error: any) {
    if (error.code === "P2002") return 1;
    console.error("server error:", error);
    return errorCode; // unsuccessful
  }
}
