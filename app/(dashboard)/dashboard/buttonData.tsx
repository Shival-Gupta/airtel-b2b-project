import { paymentUrl, addPayeeUrl, transactionsUrl, statementsUrl, managePayeeUrl } from "@/app/routeData";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, BadgeIndianRupee, UserRoundCog, UserRoundPlus } from "lucide-react";

export const dashboardButtons = [
  { text: <div className="flex justify-center items-center gap-2"><BadgeIndianRupee className="h-6 w-6" /> Initiate Payment</div>, href: paymentUrl },
  { text: <div className="flex justify-center items-center gap-2"><UserRoundPlus className="h-6 w-6" />Add Payee</div>, href: addPayeeUrl },
  { text: <div className="flex justify-center items-center gap-2"><UserRoundCog className="h-6 w-6" />Manage Payee</div>, href: managePayeeUrl },
  { text: <div className="flex justify-center items-center gap-2"><ArrowRightLeft className="h-6 w-6" />Recent Transactions</div>, href: transactionsUrl },
  // { text: "Detailed Statements", href: statementsUrl },
];

export const paymentButtons = [
  { text: <div className="flex justify-center items-center gap-2"><BadgeIndianRupee className="h-6 w-6" /> Initiate Payment</div>, href: paymentUrl },
  { text: <div className="flex justify-center items-center gap-2"><UserRoundPlus className="h-6 w-6" />Add Payee</div>, href: addPayeeUrl },
  { text: <div className="flex justify-center items-center gap-2"><UserRoundCog className="h-6 w-6" />Manage Payee</div>, href: managePayeeUrl },
];

export const accountsButtons = [
  { text: <div className="flex justify-center items-center gap-2"><ArrowRightLeft className="h-6 w-6" />Recent Transactions</div>, href: transactionsUrl },
  // { text: "Detailed Statements", href: statementsUrl },
];
