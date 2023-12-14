"use server";

import { managePayeeUrl } from "@/app/routeData";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export async function deletePayee(
  payee_id: string
): Promise<boolean | Object | undefined> {
  const { userId, orgId } = auth();
  try {
    if (!userId) {
      throw Object.assign(new Error("No user logon"), { code: 401 });
    }

    if (!orgId) {
      throw Object.assign(new Error("No organization selected"), { code: 403 });
    }

    await db.$transaction(async (tx) => {
      await tx.payeeOrganization.delete({
        where: {
          PayeeOrganizationRelation: {
            payee_id: payee_id,
            org_id: orgId,
          },
        },
      });

      const payeeOrgCount = await tx.payeeOrganization.count({
        where: {
          payee_id: payee_id,
        },
      });

      if (!payeeOrgCount) {
        await tx.payee.delete({
          where: {
            payee_id: payee_id,
          },
        });
      }
    });
    revalidatePath(managePayeeUrl);
    return true;
  } catch (error: any) {
    console.error(`\n[Server] Error ${error.code}: Unable to delete payee\n ${error.message}\n`);
    return Object.assign({message: error.message}, { code: error.code });
  }
}
