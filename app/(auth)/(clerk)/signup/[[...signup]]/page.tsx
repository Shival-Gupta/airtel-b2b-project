import { orgUrl } from "@/app/routeData";
import { SignUp } from "@clerk/nextjs";
 
export default function SignupPage() {
  return <SignUp afterSignUpUrl={orgUrl}/>;
}