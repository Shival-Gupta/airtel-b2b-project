"useClient"
import { Metadata } from "next"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { CalendarDateRangePicker } from "../../_components/date-range-picker"
import { MainNav } from "../../_components/main-nav"
import { Overview } from "../../_components/overview"
import { RecentSales } from "../../_components/recent-sales"
import { Search } from "../../_components/search"
import TeamSwitcher from "../../_components/team-switcher"
import { UserNav } from "../../_components/user-nav"

import CardButton from "../../_components/card-button"
import { accountsButtons, dashboardButtons, paymentButtons } from "../../_components/buttonData"


import { ClerkLoaded, ClerkLoading, OrganizationSwitcher, auth } from "@clerk/nextjs";
import Link from "next/link"

export const metadata: Metadata = {
    title: "B2B Dashboard",
    description: "Example dashboard app built using the components.",
}

export default function DashboardPage() {
    const { userId, orgId } = auth();
    return (
        <>
            {/* Tabs */}
            <Tabs defaultValue="dashboard" className="space-y-4">

                <div className="px-4 flex items-center gap-6">
                    {/* Tab Navbar */}
                    <>
                        <ClerkLoading>
                            <TeamSwitcher />
                        </ClerkLoading>
                        <ClerkLoaded>
                            <OrganizationSwitcher
                                hidePersonal
                                afterSelectOrganizationUrl={process.env.DASHBOARD + "/:id"}
                                afterCreateOrganizationUrl={process.env.DASHBOARD + "/:id"}
                                afterLeaveOrganizationUrl={process.env.ORG + ""}
                            />
                        </ClerkLoaded>
                    </>
                    <TabsList>
                        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                        <TabsTrigger value="payment">Payment</TabsTrigger>
                        <TabsTrigger value="accounts">Accounts</TabsTrigger>
                    </TabsList>
                </div>
                <div className="flex-1 space-y-4 p-8 pt-6">
                    {/* Tab Content */}
                    <>
                        {/* Dashboard Tab content */}
                        <TabsContent value="dashboard" className="space-y-4">
                            <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                                <>
                                    {dashboardButtons.map((button, index) => (
                                        <CardButton key={index} href={button.href}>
                                            <div className="flex justify-center text-sm font-bold">
                                                {button.text}
                                            </div>
                                        </CardButton>
                                    ))}
                                </>
                            </div>
                        </TabsContent>

                        {/* Payment Tab content */}
                        <TabsContent value="payment" className="space-y-4">
                            <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                                <>
                                    {paymentButtons.map((button, index) => (
                                        <CardButton key={index} href={button.href}>
                                            <div className="flex justify-center text-sm font-bold">
                                                {button.text}
                                            </div>
                                        </CardButton>
                                    ))}
                                </>
                            </div>
                        </TabsContent>

                        {/* Accounts Tab content */}
                        <TabsContent value="accounts" className="space-y-4">
                            <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                                <>
                                    {accountsButtons.map((button, index) => (
                                        <CardButton key={index} href={button.href}>
                                            <div className="flex justify-center text-sm font-bold">
                                                {button.text}
                                            </div>
                                        </CardButton>
                                    ))}
                                </>
                            </div>
                        </TabsContent>
                    </>

                    {/* Overview */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        {/* Overview graph */}
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Overview</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <Overview />
                            </CardContent>
                        </Card>
                        {/* Recent Transactions */}
                        <Card className="col-span-3">
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
                    </div>
                </div>
            </Tabs>
        </>
    )
}