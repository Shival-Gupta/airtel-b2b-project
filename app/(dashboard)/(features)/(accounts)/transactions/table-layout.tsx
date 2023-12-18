"use client"

import { Transaction } from "@prisma/client"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Copy, MoreHorizontal, UserRoundCog } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


export type DataType = Transaction

export const columns: ColumnDef<DataType>[] = [
  // select
  {
    accessorKey: "select",
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
  // transaction id
  {
    accessorKey: 'tran_id',
    header: 'ID',
  },
  // transaction date
  {
    accessorKey: "tran_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  // transaction mode
  {
    accessorKey: "tran_mode",
    header: "Mode",
  },
  // transaction category
  {
    accessorKey: "category",
    header: "Category",
  },
  // remarks
  {
    accessorKey: "remarks",
    header: "Remarks",
  },
  // service charge
  {
    accessorKey: "service_charge",
    header: "Service Charge",
  },
  // gst
  {
    accessorKey: "gst",
    header: "GST",
  },
  // balance
  {
    accessorKey: "updated_balance",
    header: "Balance",
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
              <DropdownMenuSeparator />
              {/* Copy Details */}
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(`Transaction ID: ${rowData.tran_id} \nTransaction Date: ${rowData.tran_date} \nMode: ${rowData.tran_mode} \nCategory: ${rowData.category} \nAmount: ${rowData.amount}`)
                  // toast({
                  //   title: "Copied",
                  // })
                }}
              >
                <Copy className="mr-2 h-4 w-4" /> Copy Details
              </DropdownMenuItem>
              <DropdownMenuItem><UserRoundCog className="mr-2 h-4 w-4" />View Payee</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]