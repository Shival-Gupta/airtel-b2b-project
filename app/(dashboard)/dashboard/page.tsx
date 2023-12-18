import { Metadata } from "next"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { Overview } from "../_components/overview"
import { RecentSales } from "../_components/recent-sales"
import TeamSwitcher from "../_components/team-switcher"
import CardButton from "../_components/card-button"
import { accountsButtons, dashboardButtons, paymentButtons } from "./buttonData"
import { ClerkLoaded, ClerkLoading, OrganizationSwitcher } from "@clerk/nextjs";
import { dashboardUrl, orgCompleteUrl, orgUrl } from "@/app/routeData"
import OrgInfoPanel from "./orgInfo"
import { Skeleton } from "@/components/ui/skeleton"
import { Suspense } from "react"
import { getOrgDetails } from "../_actions/view-org"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "B2B Dashboard",
  description: "Example dashboard app built using the components.",
}

export default async function DashboardPage() {
  const organizationData = await getOrgDetails();
  if (organizationData == null) redirect(orgCompleteUrl)
  return (
    <>
      {/* Tabs */}
      <Tabs defaultValue="dashboard" className="">

        {/* Tab Navbar */}
        <div className="px-4 h-16 border-b flex items-center justify-between gap-6">

          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="accounts">Accounts</TabsTrigger>
          </TabsList>
          <div>
            <ClerkLoading>
              <TeamSwitcher />
            </ClerkLoading>
            <ClerkLoaded>
              <OrganizationSwitcher
                hidePersonal
                afterLeaveOrganizationUrl={orgUrl}
                afterCreateOrganizationUrl={orgCompleteUrl}
                afterSelectOrganizationUrl={dashboardUrl}
              />
            </ClerkLoaded>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8">
          {/* Tab Content */}
          <>
            {/* Dashboard Tab content */}
            <TabsContent value="dashboard" className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
              <div className="grid gap-4 grid-cols-2 h-max w-max md:grid-cols-4 lg:grid-cols-6">
                <>
                  {dashboardButtons.map((button, index) => (
                    <CardButton key={index} href={button.href}>
                      <div className="flex justify-center text-sm font-bold hover:text-primary">
                        {button.text}
                      </div>
                    </CardButton>
                  ))}
                </>
              </div>
              {/* Overview */}
              {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"> */}
              <div className="grid gap-4 lg:grid-rows-5 lg:grid-flow-col">
                {/* Organization Info */}
                <Suspense fallback={
                  <Card className="lg:row-span-2">
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
                  </Card>
                }>
                  <ClerkLoaded>
                    <OrgInfoPanel orgData={organizationData} />
                  </ClerkLoaded>
                </Suspense>

                {/* Recent Transactions */}
                <Card className="lg:row-span-3">
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>
                      You made 265 Transactions this month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentSales />
                  </CardContent>
                </Card>

                {/* Overview graph */}
                <Card className="lg:row-span-3 lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Monthly Balance</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>

              </div>
            </TabsContent>

            {/* Payment Tab content */}
            <TabsContent value="payment" className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Payment</h2>
              <div className="grid gap-4 grid-cols-2 h-max w-max md:grid-cols-4 lg:grid-cols-6">
                <>
                  {paymentButtons.map((button, index) => (
                    <CardButton key={index} href={button.href}>
                      <div className="flex justify-center text-sm font-bold hover:text-primary">
                        {button.text}
                      </div>
                    </CardButton>
                  ))}
                </>
              </div>
            </TabsContent>

            {/* Accounts Tab content */}
            <TabsContent value="accounts" className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Accounts</h2>
              <div className="grid gap-4 grid-cols-2 h-max w-max md:grid-cols-4 lg:grid-cols-6">
                <>
                  {accountsButtons.map((button, index) => (
                    <CardButton key={index} href={button.href}>
                      <div className="flex justify-center text-sm font-bold hover:text-primary">
                        {button.text}
                      </div>
                    </CardButton>
                  ))}
                </>
              </div>
            </TabsContent>
          </>
        </div>
      </Tabs>
    </>
  )
}
