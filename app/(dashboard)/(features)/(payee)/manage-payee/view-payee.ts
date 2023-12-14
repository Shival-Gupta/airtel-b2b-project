"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { managePayeeUrl } from "@/app/routeData";

export async function getPayeeList() {
  const { userId, orgId } = auth();
  if (!userId) {
    throw new Error("No user logon");
  }
  if (!orgId) {
    throw new Error("No organization selected");
  }
  try {
    const payeeData = await db.payee.findMany({
      where: {
        payee_id: {
          in: await db.payeeOrganization
            .findMany({
              where: {
                org_id: {
                  equals: orgId,
                },
              },
              select: {
                payee_id: true,
              },
            })
            .then((payeeOrg) => payeeOrg.map((po) => po.payee_id)),
        },
      },
    });
    revalidatePath(managePayeeUrl);
    return payeeData;
  } catch (error: any) {
    if (error.code === "P2002") throw new Error("Record already exists");
    throw error;
  }
}
