import {z} from 'zod';
const formSchema = z.object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .regex(/^[^\d]+$/, { message: "Name must not contain numeric values" }),
    email: z.string().email({ message: "Invalid email address" }),
    phoneNumber: z
      .string()
      .min(10, { message: "Phone number must be at least 10 characters long" })
      .max(14, { message: "Phone number must be at most 14 characters long" })
      .regex(/^\+\d+$/, { message: "Phone number must be numeric and start with +" }),
    plan: z.enum(['arcade', 'advanced', 'pro']),
    paymentPlan: z.enum(['monthly', 'yearly']),
    addsOn: z.array(
      z.object({
        name: z.string(),
        price: z.number(),
      })
    )
  });

export const step1Schema = formSchema.required().pick({name: true, email: true, phoneNumber: true})
export const step2Schema = formSchema.pick({plan: true, paymentPlan: true});
export const step3Schema = formSchema.pick({addsOn: true});


export type FormSchema = z.infer<typeof formSchema>;
export type FormStep1Schema = z.infer<typeof step1Schema>
export type FormStep2Schema = z.infer<typeof step2Schema>
export type FormStep3Schema = z.infer<typeof step3Schema>