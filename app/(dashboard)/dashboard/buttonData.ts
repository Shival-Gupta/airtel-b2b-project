const paymentLink = "/payment";
const addPayeeLink = "/add-payee";
const payeeLink = "/payee";
const transactionsLink = "/transactions";
const statementsLink = "/statements";

export const dashboardButtons = [
  { text: "Initiate Payment", href: paymentLink },
  { text: "Add Payee", href: addPayeeLink },
  { text: "Manage Payee", href: payeeLink },
  { text: "Recent Transactions", href: transactionsLink },
  { text: "Detailed Statements", href: statementsLink },
];

export const paymentButtons = [
  { text: "Initiate Payment", href: paymentLink },
  { text: "Add Payee", href: addPayeeLink },
  { text: "Manage Payee", href: payeeLink },
];

export const accountsButtons = [
  { text: "Recent Transactions", href: transactionsLink },
  { text: "Detailed Statements", href: statementsLink },
];
