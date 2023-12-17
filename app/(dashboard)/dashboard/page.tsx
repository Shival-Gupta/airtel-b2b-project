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

export const metadata: Metadata = {
    title: "B2B Dashboard",
    description: "Example dashboard app built using the components.",
}

export default function DashboardPage() {
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
                        </TabsContent>

                        {/* Payment Tab content */}
                        <TabsContent value="payment" className="space-y-4">
                            <h2 className="text-3xl font-bold tracking-tight">Payment</h2>
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
                            <h2 className="text-3xl font-bold tracking-tight">Accounts</h2>
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
                </div>
            </Tabs>
        </>
    )
}
