"use client"
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  bank_name: z.enum(["apb", "other"], {
    required_error: "You need to select a bank",
  }),
  bank_ifsc: z.string().length(11, {
    message: "IFSC Code is of 11 digits",
  }).regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, {
    message: "Invalid IFSC Code",
  }),
  ac_type: z.enum(["savings", "wallet"], {
    required_error: "You need to select an account type",
  }),
  ac_no: z.string().refine((value) => !isNaN(Number(value)), {
    message: "Account number must be a valid number",
  }).transform((value) => Number(value)), // Convert string to number
  conf_ac_no: z.string().refine((value) => !isNaN(Number(value)), {
    message: "Account number must be a valid number",
  }).transform((value) => Number(value)), // Convert string to number
  payee_name: z.string().min(2, {
    message: "Payee name must be at least 2 characters",
  }),
  payee_nickname: z.string().min(2, {
    message: "Payee nickname must be at least 2 characters",
  }),
  payee_email: z.string().email({ message: "Invalid email address" }),
  payee_mob_no: z.string().min(10, {
    message: "Payee mobile number must be 10 digits",
  }),
}).refine((data) => data.ac_no === data.conf_ac_no, {
  message: "Account Numbers didn't match",
  path: ["conf_ac_no"],
});

export function AddPayeeForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bank_name: "apb",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="bank_name"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-base">Select Bank</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                    {["apb", "other"].map((value) => (
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
            {form.watch("bank_name") === "other" && (
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
                        <SelectItem value="savings">Savings</SelectItem>
                        <SelectItem value="wallet">Wallet</SelectItem>
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
