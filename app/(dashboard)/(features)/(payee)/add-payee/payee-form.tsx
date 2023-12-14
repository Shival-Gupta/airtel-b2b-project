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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast"

import { payeeFormSchema } from "./payee-form-schema";
import { addPayee } from "./add-payee";

export const AddPayeeForm = () => {

  const { toast } = useToast();

  const form = useForm<z.infer<typeof payeeFormSchema>>({
    resolver: zodResolver(payeeFormSchema),
    defaultValues: {
      bank_type: "apb",
    },
  });

  async function onSubmit(values: z.infer<typeof payeeFormSchema>) {
    try {
      if (values.bank_ifsc) {
        const status = await addPayee(values)
        if (status) {
          if (status === true) {
            toast({
              title: "Successfully added Payee!",
            })
          }
          else {
            throw status;
          }
        } else {
          throw Object.assign(new Error("No response from server"), { code: 500 });
        }
      }
      else {
        throw Object.assign(new Error("IFSC code is null"), { code: 400 });
      }
    } catch (error: any) {
      toast({
        title: `Error ${error.code}`,
        description: error.message,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="bank_type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-base">Select Bank</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                    {["apb", "oth"].map((value) => (
                      <FormItem key={value} className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={value} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {value === "apb" ? "Airtel Payment Banks" : "Other"}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-12">
          <div className="grid grid-flow-row gap-4">
            {/* IFSC Code */}
            {form.watch("bank_type") === "oth" && (
              <FormField control={form.control}
                name="bank_ifsc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">IFSC Code</FormLabel>
                    <FormControl>
                      <Input placeholder="AIRP0000001" {...field} onChange={(e) => field.onChange(e.target.value.toUpperCase())} />
                    </FormControl>
                    <FormDescription>
                      Check your bank's passbook for IFSC code
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Account Type */}
            <FormField control={form.control}
              name="ac_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Account Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormItem>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Account Type" />
                          </SelectTrigger>
                        </FormControl>
                      </FormItem>
                      <SelectContent>
                        <SelectItem value="sav">Savings</SelectItem>
                        <SelectItem value="cur">Current</SelectItem>
                        <SelectItem value="wal">Wallet</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl >
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )} />

            {/* Account Number */}
            <FormField control={form.control}
              name="ac_no"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Account Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )} />

            {/* Confirm Account Number */}
            <FormField control={form.control}
              name="conf_ac_no"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Confirm Account Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )} />
          </div>
          <div className="grid grid-flow-row gap-4">
            {/* Payee Name */}
            <FormField control={form.control}
              name="payee_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Payee Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )} />

            {/* Payee Nickname */}
            <FormField control={form.control}
              name="payee_nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Payee Nickname</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )} />

            {/* Payee Email */}
            <FormField control={form.control}
              name="payee_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Payee Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )} />

            {/* Payee Mobile */}
            <FormField control={form.control}
              name="payee_mob_no"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Payee Mobile</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )} />
          </div>
        </div>

        {/* Proceed Button */}
        <Button type="submit">Proceed</Button>
      </form>
    </Form >
  )
}
