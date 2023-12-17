import { z } from "zod";

export const paymentFormSchema = z.object({
  payee_id: z.string().optional(),
  payee_name: z.string().optional(),
  ac_no: z.string().optional(),
  bank_name: z.string().optional(),
  bank_ifsc: z.string().optional(),
  tran_mode: z.enum(["IMPS", "NEFT"], {
    required_error: "Select transaction mode",
  }),
  tran_cat: z.enum(["VEN", "SAL", "INC", "RBT", "OTH"], {
    required_error: "Select Category",
  }),
  tran_remarks: z.string().optional(),
  tran_amount: z.string().transform((value) => parseFloat(value))
  .refine((value) => !isNaN(value), {
    message: "Invalid amount",
  }).refine((value) => value >= 10, {
    message: "Minimum transaction amount is Rs 10",
  }),
});

export default paymentFormSchema;
