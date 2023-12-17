"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { dashboardUrl } from "@/app/routeData";

export async function getOrgDetails() {
  const { userId, orgId } = auth();
  if (!userId) {
    throw new Error("No user logon");
  }
  if (!orgId) {
    throw new Error("No organization selected");
  }
  try {
    const orgData = await db.organization.findFirst({
      where: {
        org_id: {
          equals: orgId,
        },
      },
    });
    revalidatePath(dashboardUrl);
    return orgData;
  } catch (error: any) {
    console.log("[Server] error", error.code, ": view-org");
    console.log(error.message);
    // throw error;
  }
}
