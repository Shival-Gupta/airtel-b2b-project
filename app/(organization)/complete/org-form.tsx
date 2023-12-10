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

import { orgFormSchema } from "./org-form-schema";
import { addOrganization } from "./db-action";
import { Textarea } from "@/components/ui/textarea";

export const AddOrganizationForm = () => {

  const { toast } = useToast();

  const form = useForm<z.infer<typeof orgFormSchema>>({
    resolver: zodResolver(orgFormSchema),
    defaultValues: {
      bank_type: "apb",
      ac_balance: 0,
      ac_type: "cur",
    },
  });

  async function onSubmit(values: z.infer<typeof orgFormSchema>) {
    try {
      const status = await addOrganization(values);
      if (status === 0) {
        toast({
          title: "Successfully added Organization!",
        })
      } else if (status === 1) {
        toast({
          title: "Error",
          description: "Organization already exists!",
        })
      } else if (status === 2) {
        toast({
          title: "Unauthorized",
          description: "No user logon!",
        })
      } else if (status === 3) {
        toast({
          title: "Unauthorized",
          description: "No organization selected!",
        })
      } else {
        toast({
          title: "Error",
          description: "Internal Error!",
        })
      }
    } catch (error) {
      console.error("Error adding org:", error);
      toast({
        title: "Application error!",
        description: "Reload website",
      })
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

          {/* Account Balance */}
          <FormField control={form.control}
            name="ac_balance"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Account Balance</FormLabel>
                <FormControl>
                  <Input {...field} type="number"/>
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )} />
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
                        <SelectItem value="cur">Current</SelectItem>
                        <SelectItem value="sav">Savings</SelectItem>
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
            {/* Nominee Name */}
            <FormField control={form.control}
              name="nominee_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Nominee Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )} />

            {/* Organization Email */}
            <FormField control={form.control}
              name="org_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Organization Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )} />

            {/* Organization Mobile */}
            <FormField control={form.control}
              name="org_mob_no"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Organization Mobile</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )} />
          </div>
        </div>

        {/* Organization Address */}
        <FormField control={form.control}
          name="org_address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Organization Address</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )} />

        {/* Proceed Button */}
        <Button type="submit">Proceed</Button>
      </form>
    </Form >
  )
}
