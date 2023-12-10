"use server";
import { OrganizationList } from "@clerk/nextjs";
import { dashboardUrl, orgCompleteUrl } from "@/app/routeData";

const CreateOrganizationPage = () => {
    return (
        <OrganizationList
            hidePersonal
            skipInvitationScreen
            afterCreateOrganizationUrl={orgCompleteUrl}
            afterSelectOrganizationUrl={dashboardUrl}
        />
    );
}

export default CreateOrganizationPage;