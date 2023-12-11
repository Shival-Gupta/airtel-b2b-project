import { paymentUrl, addPayeeUrl, transactionsUrl, statementsUrl, managePayeeUrl } from "@/app/routeData";

export const dashboardButtons = [
  { text: "Initiate Payment", href: paymentUrl },
  { text: "Add Payee", href: addPayeeUrl },
  { text: "Manage Payee", href: managePayeeUrl },
  { text: "Recent Transactions", href: transactionsUrl },
  { text: "Detailed Statements", href: statementsUrl },
];

export const paymentButtons = [
  { text: "Initiate Payment", href: paymentUrl },
  { text: "Add Payee", href: addPayeeUrl },
  { text: "Manage Payee", href: managePayeeUrl },
];

export const accountsButtons = [
  { text: "Recent Transactions", href: transactionsUrl },
  { text: "Detailed Statements", href: statementsUrl },
];
