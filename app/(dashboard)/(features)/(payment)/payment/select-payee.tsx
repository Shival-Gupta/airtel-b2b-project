"use client"

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataType } from "../../(payee)/manage-payee/table-layout";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { payPayeeUrl } from "@/app/routeData";
import { BadgeIndianRupee } from "lucide-react";
import { useState } from "react";

export default function SelectPayee({ data }: { data: DataType[] | undefined }) {
  const [payeeId, setPayeeId] = useState<string>('');

  return (
    <div>
      <div className="flex items-center mb-4">
        <Label className="w-24 mr-2">Select Payee:</Label>
        <Select onValueChange={(value) => setPayeeId(value)}>
          <SelectTrigger className=" w-48">
            <SelectValue placeholder="Payee List" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {!data ? (
                <SelectLabel>No Payee record found</SelectLabel>
              ) : (
                <>
                  {data.map((payee, index) => (
                    <SelectItem id={`${index}`} key={index} value={payee.payee_id}>{payee.payee_nickname}</SelectItem>
                  ))}
                </>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <>
        {(payeeId !== '') ? (
          <Button variant="default" className="w-full px-2 font-semibold" asChild>
            <Link href={{ pathname: `${payPayeeUrl}`, query: { id: payeeId } }}>
              <BadgeIndianRupee className="h-5 w-5 mr-1" /> Initiate Payment
            </Link>
          </Button>
        ) : (
          <Button variant="default" className="w-full px-2 font-semibold" disabled>
              <BadgeIndianRupee className="h-5 w-5 mr-1" /> Initiate Payment
          </Button>
        )
        }
      </>
    </div>
  );
}
