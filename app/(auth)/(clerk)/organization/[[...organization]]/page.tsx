import React from "react";
import { OrganizationList } from "@clerk/nextjs";
import { dashboardUrl } from "@/app/routeData";

export default function CreateOrganizationPage() {
    return (
        <OrganizationList
            hidePersonal
            afterSelectOrganizationUrl={dashboardUrl}
            afterCreateOrganizationUrl={dashboardUrl}
        />
    )
}