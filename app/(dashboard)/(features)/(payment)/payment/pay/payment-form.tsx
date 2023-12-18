"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea";

import { paymentFormSchema } from "./payment-form-schema";
import { initPayment } from "./payment";
import { Payee } from "@prisma/client";
import { IndianRupee } from "lucide-react";

export const PaymentForm = ({ data }: { data: Payee }) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof paymentFormSchema>>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      payee_id: data.payee_id,
      payee_name: data.payee_name.toUpperCase(),
      ac_no: data.ac_no,
      bank_name: data.bank_type.toUpperCase(),
      bank_ifsc: data.bank_ifsc,
      tran_remarks: '',
    },
  });

  async function onSubmit(values: z.infer<typeof paymentFormSchema>) {
    try {
      const status = await initPayment(values, data)
      if (!status) throw Object.assign(new Error("No response from server"), { code: 500 });
      if ('tran_id' in status) {
        toast({
          title: "Transaction Succesfull",
          description: <div>Paid <b>{status.amount}</b> to <b>{values.payee_name}</b><br /><br /><p className="text-xs">Transaction Id: {status.tran_id}</p></div>,
        })
      }
      else {
        throw status
      }
    } catch (error: any) {
      toast({
        title: `Error ${error.code}`,
        description: error.message,
      });
    }
  }


  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-4">
          <div className="grid gap-12">

            {/* --Payee details-- */}
            <div className="grid grid-cols-2 gap-4">

              {/* Payee Name */}
              <FormField control={form.control}
                name="payee_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Payee Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Account Number */}
              <FormField control={form.control}
                name="ac_no"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Account number</FormLabel>
                    <FormControl>
                      <Input {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Bank Name */}
              <FormField control={form.control}
                name="bank_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Bank Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Bank IFSC */}
              <FormField control={form.control}
                name="bank_ifsc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">IFSC</FormLabel>
                    <FormControl>
                      <Input {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>

            {/* --Transaction details-- */}
            <div className="grid grid-cols-2 gap-4">

              {/* Transaction Mode */}
              <FormField control={form.control}
                name="tran_mode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Transaction Mode</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormItem>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                        </FormItem>
                        <SelectContent>
                          <SelectItem value="IMPS">IMPS</SelectItem>
                          <SelectItem value="NEFT">NEFT</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl >
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )} />

              {/* Transaction category */}
              <FormField control={form.control}
                name="tran_cat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Category</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormItem>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                        </FormItem>
                        <SelectContent>
                          <SelectItem value="VEN">Vendor Payment</SelectItem>
                          <SelectItem value="SAL">Salary Payment</SelectItem>
                          <SelectItem value="INC">Incentive Payment</SelectItem>
                          <SelectItem value="RBT">Reimbursement</SelectItem>
                          <SelectItem value="OTH">Others</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl >
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )} />

              {/* Remarks */}
              <div className="row-span-2">
                <FormField control={form.control}
                  name="tran_remarks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Remarks</FormLabel>
                      <FormControl>
                        <Textarea className="h-28" placeholder="Tell about this transaction" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )} />
              </div>

              {/* Amount */}
              <FormField control={form.control}
                name="tran_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex text-base items-center">Amount (<IndianRupee className="h-4 w-4" />)</FormLabel>
                    <FormControl>
                      <Input placeholder="INR" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )} />

              {/* Proceed Button */}
              <Button type="submit">Pay</Button>
            </div>

          </div>
        </form>
      </Form >
    </div>
  )
}
