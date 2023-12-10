import { z } from "zod";

export const orgFormSchema = z
  .object({

    nominee_name: z.string().min(2, {
      message: "Name should be at least 2 characters long!",
    }),
    
    bank_type: z.enum(["apb", "oth"], {
      required_error: "You need to select a bank",
    }),

    bank_ifsc: z.string()
      .length(11, {
        message: "IFSC Code is of 11 digits",
      })
      .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, {
        message: "Invalid IFSC Code",
      })
      .optional(),

    ac_type: z.enum(["sav", "cur", "wal"], {
      required_error: "You need to select an account type",
    }),

    ac_no: z.string().min(6, {
      message: "Account number is invalid",
    }),

    conf_ac_no: z.string().min(6, {
      message: "Confirm account number is invalid",
    }),

    ac_balance: z.string().transform(parseFloat),

    org_address: z.string().min(6, {
      message: "Address must be at least 6 characters",
    }),

    org_email: z.string().email({ message: "Invalid email address" }),

    org_mob_no: z.string()
      .transform((value) => parseInt(value, 10))
      .refine((value) => Number.isInteger(value), {
        message: "Not a valid number",
      })
      .refine((value) => value.toString().length === 10, {
        message: "Mobile number must be 10 digits",
      }),
  })
  .refine((data) => data.conf_ac_no === data.ac_no, {
    message: "Account Numbers didn't match",
    path: ["conf_ac_no"],
  })
  .refine((data) => {
      if (data.bank_type === "apb") {
        data.bank_ifsc = "AIRP0000001";
      }
      return true;
    },
    {
      message: "Setting IFSC Code for APB type",
      path: ["bank_ifsc"],
    }
  )
  .refine((data) => data.bank_type !== "oth" || data.bank_ifsc !== undefined, {
    message: "IFSC Code is required",
    path: ["bank_ifsc"],
  });
