import React from "react";
import { OrganizationList } from "@clerk/nextjs";

export default function CreateOrganizationPage() {
    return (
        <OrganizationList
            hidePersonal
            afterSelectOrganizationUrl={process.env.DASHBOARD}
            afterCreateOrganizationUrl={process.env.DASHBOARD}
        />
    )
}