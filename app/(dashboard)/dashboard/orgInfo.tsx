"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";
import { Organization } from "@prisma/client";

export default function OrgInfoPanel({orgData}:{orgData: Organization | null | undefined}) {
  const { organization } = useOrganization();
  return (
    <Card className="lg:row-span-2">
      {orgData && organization ? (
        <>
          <CardHeader>
            <CardTitle>{organization.name}</CardTitle>
            <CardDescription>{orgData.nominee_name}</CardDescription>
          </CardHeader>
          <CardContent>
            <Card>
              <CardContent>
                <CardDescription>Account No.</CardDescription>
                <Label className="text-lg">{orgData.ac_no}</Label>
              </CardContent>
              <CardContent>
                <CardDescription>Available Balance</CardDescription>
                <Label className="text-lg">₹{orgData.ac_balance}</Label>
              </CardContent>
            </Card>
          </CardContent>
        </>
      ) : (
        <>
          <CardHeader>
            <CardTitle><Skeleton className="h-4 w-[250px]" /></CardTitle>
            <CardDescription><Skeleton className="h-4 w-[200px]" /></CardDescription>
          </CardHeader>
          <CardContent>
            <Card>
              <CardContent>
                <CardDescription>Account No.</CardDescription>
                <Skeleton className="h-4 w-[250px]" />
              </CardContent>
              <CardContent>
                <CardDescription>Available Balance</CardDescription>
                <Skeleton className="h-4 w-[250px]" />
              </CardContent>
            </Card>
          </CardContent>
        </>
      )}

    </Card>
  )
}