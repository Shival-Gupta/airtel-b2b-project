import { z } from "zod";

export const payeeFormSchema = z.object({
    bank_type: z.enum(["apb", "oth"], {
      required_error: "You need to select a bank",
    }),
    bank_ifsc: z.string().length(11, {
      message: "IFSC Code is of 11 digits",
    }).regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, {
      message: "Invalid IFSC Code",
    }).optional(),
    ac_type: z.enum(["sav", "wal", "cur"], {
      required_error: "You need to select an account type",
    }),
    ac_no: z.string().min(6, {
      message: "Account number is invalid",
    }),
    conf_ac_no: z.string().min(6, {
      message: "Confirm account number is invalid",
    }),
    payee_name: z.string().min(2, {
      message: "Payee name must be at least 2 characters",
    }),
    payee_nickname: z.string().min(2, {
      message: "Payee nickname must be at least 2 characters",
    }),
    payee_email: z.string().email({ message: "Invalid email address" }),
    payee_mob_no: z.string().length(10, {
      message: "Payee mobile number must be 10 digits",
    })
  }).refine((data) => data.conf_ac_no === data.ac_no, {
    message: "Account Numbers didn't match",
    path: ["conf_ac_no"],
  }).refine((data) => {
    if (data.bank_type === "apb") {
      data.bank_ifsc = "AIRP0000001";
    }
    return true;
  }, {
    message: "Setting IFSC Code for APB type",
    path: ["bank_ifsc"],
  }).refine((data) => data.bank_type !== "oth" || data.bank_ifsc !== undefined, {
    message: "IFSC Code is required",
    path: ["bank_ifsc"],
  });
  