"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { transactionsUrl } from "@/app/routeData";

export async function getTransactionRecords() {
  const { userId, orgId } = auth();
  if (!userId) {
    throw new Error("No user logon");
  }
  if (!orgId) {
    throw new Error("No organization selected");
  }
  try {
    const tranData = await db.transaction.findMany({
      where: {
        payer_id: orgId,
      },
    });
    revalidatePath(transactionsUrl);
    if (tranData) return tranData;
    throw new Error('Data not found');
  } catch (error: any) {
    console.log("[Server] error", error.code, ": view-transaction");
    console.log(error.message);
    // throw error;
  }
}
