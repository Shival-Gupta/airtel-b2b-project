"use client"

import { Payee } from "@prisma/client"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, BadgeIndianRupee, Copy, MoreHorizontal, Trash, History, UserRoundCog } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deletePayee } from "./delete-payee"
import Link from "next/link"
import { payPayeeUrl } from "@/app/routeData"


export type DataType = Payee

export const columns: ColumnDef<DataType>[] = [
  // select - payee id
  {
    accessorKey: "payee_id",
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // bank type
  {
    accessorKey: "bank_type",
    header: "Bank Type",
    cell: ({ row }) => (
      <div className="uppercase text-center">{row.getValue("bank_type")}</div>
    ),
  },
  // account type
  {
    accessorKey: "ac_type",
    header: "Account Type",
    cell: ({ row }) => (
      <div className="uppercase text-center">{row.getValue("ac_type")}</div>
    ),
  },
  // bank ifsc
  {
    accessorKey: "bank_ifsc",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          IFSC Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-right mr-4">{row.getValue("bank_ifsc")}</div>
    ),
  },
  // account number
  {
    accessorKey: "ac_no",
    header: () => <div className="text-right">Account Number</div>,
    cell: ({ row }) => (
      <div className="text-right">{row.getValue("ac_no")}</div>
    ),
  },
  // payee name
  {
    accessorKey: "payee_name",
    header: "Payee Name",
  },
  // payee nickname
  {
    accessorKey: "payee_nickname",
    header: "Nickname",
  },
  // payee email
  {
    accessorKey: "payee_email",
    header: "Email",
  },
  // payee mobile no
  {
    accessorKey: "payee_mob_no",
    header: "Mobile Number",
  },
  // actions
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const rowData = row.original
      return (
        <div className="flex justify-center align-middle">
          {/* Initiate Payment */}
          <Button variant="ghost" className="h-8 w-8 p-0 hover:text-green-600" asChild>
            <Link href={{ pathname: `${payPayeeUrl}`, query: { id: rowData.payee_id } }}>
              <span className="sr-only">Initiate Payment</span>
              <BadgeIndianRupee className="h-5 w-5" />
            </Link>
          </Button>

          {/* Remove Payee */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 hover:text-primary">
                <span className="sr-only">Remove Payee</span>
                <Trash className="h-5 w-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently remove <b>{row.getValue("payee_name")}</b> from your organization&apos;s payee list.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={async () => {
                  try {
                    const status = await deletePayee(row.getValue("select"));
                    console.log(status)
                    if (status) {
                      // toast({
                      //   title: "Successfull",
                      //   description: "Payee removed"
                      // })
                    }
                    else {
                      // toast({
                      //   title: "Error",
                      //   description: "Payee not removed!"
                      // })
                    }
                  }
                  catch (error: any) {
                    console.log(error);
                    // toast({
                    //   title: "Server Error",
                    //   description: "Check console log!"
                    // })
                  }
                }}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* More Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>More Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(`Name: ${rowData.payee_name} \nAccount number: ${rowData.ac_no} \nIFSC: ${rowData.bank_ifsc} \n`)
                  // toast({
                  //   title: "Copied",
                  // })
                }}
              >
                <Copy className="mr-2 h-4 w-4" /> Copy Details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem><UserRoundCog className="mr-2 h-4 w-4" />View Payee</DropdownMenuItem>
              <DropdownMenuItem><History className="mr-2 h-4 w-4" />View Transaction History</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]