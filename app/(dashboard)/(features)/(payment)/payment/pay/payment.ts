"use server";

import { z } from "zod";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { paymentFormSchema } from "./payment-form-schema";
import { dashboardUrl, statementsUrl, transactionsUrl } from "@/app/routeData";
import { Organization, Payee, Transaction } from "@prisma/client";
import { getOrgDetails } from "@/app/(dashboard)/_actions/view-org";

async function makePayment(
  tx: any,
  values: z.infer<typeof paymentFormSchema>,
  orgId: string,
  orgBal: number,
  gstRate: number,
  serviceCharge: number
) {
  const updatedBal =
    orgBal -
    (values.tran_amount + gstRate * values.tran_amount + serviceCharge);
  // debit org balance
  await tx.organization.update({
    where: {
      org_id: orgId,
    },
    data: {
      ac_balance: updatedBal,
    },
  });
  // credit payee balance
  // log the transaction
  return tx.transaction.create({
    data: {
      tran_mode: values.tran_mode,
      category: values.tran_cat,
      remarks: values.tran_remarks,
      amount: values.tran_amount,
      service_charge: serviceCharge,
      gst: values.tran_amount * gstRate,
      updated_balance: updatedBal,
      payer_id: orgId,
      payee_id: values.payee_id,
    },
  });
}

export async function initPayment(
  values: z.infer<typeof paymentFormSchema>,
  payeeData: Payee
): Promise<Transaction | Object | undefined> {
  const { userId, orgId } = auth();

  try {
    // throw Object.assign(new Error("Insuffient Balance"), { code: 25 });
    if (!userId) {
      throw Object.assign(new Error("No user logon"), { code: 401 });
    }
    if (!orgId) {
      throw Object.assign(new Error("No organization selected"), { code: 403 });
    }
    if (values.tran_amount < 0.1 || values.payee_id !== payeeData.payee_id) {
      throw Object.assign(new Error("Invalid Form Data"), { code: 400 });
    }

    let transData: Transaction | undefined, serviceCharge: number;
    if (values.tran_mode === "IMPS") serviceCharge = 0.1;
    else serviceCharge = 0.2;
    const gstRate = 0.18;

    await db.$transaction(async (tx) => {
      // retrieve org balance
      const orgData: Organization | null | undefined = await getOrgDetails();
      if (orgData === null || orgData === undefined) {
        throw Object.assign(new Error("No organization selected"), {
          code: 403,
        });
      }
      // validating data
      if (
        orgData.ac_balance <
        values.tran_amount + gstRate * values.tran_amount + serviceCharge
      ) {
        throw Object.assign(new Error("Insuffient Balance"), { code: 25 });
      }
      transData = await makePayment(
        tx,
        values,
        orgId,
        orgData.ac_balance,
        gstRate,
        serviceCharge
      );
    });
    revalidatePath(dashboardUrl);
    revalidatePath(transactionsUrl);
    revalidatePath(statementsUrl);
    return transData;
  } catch (error: any) {
    console.error(
      `\n[Server] Error ${error.code}: Unable to add payee\n ${error.message}\n`
    );
    if (error.code) {
      return Object.assign({ message: error.message }, { code: error.code });
    } else {
      return Object.assign({ message: error.message }, { code: 500 });
    }
  }
}
