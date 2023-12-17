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
async function createPayeeOrganization(
  tx: any,
  org_Id: string,
  payeeData: any
) {
  return tx.payeeOrganization.create({
    data: {
      org_id: org_Id,
      payee_id: payeeData.payee_id,
      payee_nickname: payeeData.payee_nickname,
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
): Promise<boolean | Object | undefined> {
  const { userId, orgId } = auth();

  try {
    if (!userId) {
      throw Object.assign(new Error("No user logon"), { code: 401 });
    }

    if (!orgId) {
      throw Object.assign(new Error("No organization selected"), { code: 403 });
    }

    if (!values.bank_ifsc) {
      throw Object.assign(new Error("IFSC code is null"), { code: 400 });
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
    return true;
  } catch (error: any) {
    console.error(
      `\n[Server] Error ${error.code}: Unable to add payee\n ${error.message}`
    );
    if (error.code) {
      if (error.code === "P2002")
        return Object.assign(
          { message: "Payee already exists" },
          { code: error.code }
        );
      return Object.assign({ message: error.message }, { code: error.code });
    } else {
      return Object.assign({ message: error.message }, { code: 500 });
    }
  }
}
