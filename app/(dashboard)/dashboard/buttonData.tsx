import { paymentUrl, addPayeeUrl, transactionsUrl, statementsUrl, managePayeeUrl } from "@/app/routeData";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, BadgeIndianRupee, UserRoundCog, UserRoundPlus } from "lucide-react";

export const dashboardButtons = [
  { text: <div className="flex justify-center items-center gap-2 hover:text-primary"><BadgeIndianRupee className="h-8 w-8"/> Initiate Payment</div>, href: paymentUrl },
  { text: <div className="flex justify-center items-center gap-2 hover:text-primary"><UserRoundPlus />Add Payee</div>, href: addPayeeUrl },
  { text: <div className="flex justify-center items-center gap-2 hover:text-primary"><UserRoundCog />Manage Payee</div>, href: managePayeeUrl },
  { text: <div className="flex justify-center items-center gap-2 hover:text-primary"><ArrowRightLeft />Recent Transactions</div>, href: transactionsUrl },
  // { text: "Detailed Statements", href: statementsUrl },
];

export const paymentButtons = [
  { text: "Initiate Payment", href: paymentUrl },
  { text: "Add Payee", href: addPayeeUrl },
  { text: "Manage Payee", href: managePayeeUrl },
];

export const accountsButtons = [
  { text: "Recent Transactions", href: transactionsUrl },
  // { text: "Detailed Statements", href: statementsUrl },
];
