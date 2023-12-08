import { orgUrl } from "@/app/routeData";
import { SignIn } from "@clerk/nextjs";
 
export default function LoginPage() {
  return <SignIn afterSignInUrl={orgUrl} />;
}