import { OrganizationSwitcher, auth } from "@clerk/nextjs";

const OrganizationIdPage = () => {
  const { userId, orgId } = auth();
  return (
    <div>
      User: {userId} <br />
      Organization: {orgId}
      <OrganizationSwitcher
        hidePersonal
        afterSelectOrganizationUrl={process.env.DASHBOARD + "/:id"}
        afterCreateOrganizationUrl={process.env.DASHBOARD + "/:id"}
        afterLeaveOrganizationUrl={process.env.ORG + ""}
      />
    </div>
  );
};

export default OrganizationIdPage;