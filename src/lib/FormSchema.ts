import {z, ZodError} from 'zod';
export const addsOnSchema = z.object({
  id: z.number(),
  name: z.string(),
  priceMonth: z.number(),
  priceYear: z.number(),
});

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
    plan: z.enum(['Arcade', 'Advanced', 'Pro']),
    paymentPlan: z.enum(['monthly', 'yearly']),
    addsOn: z.array(addsOnSchema),
  });

export const step1Schema = formSchema.required().pick({name: true, email: true, phoneNumber: true})
export const step2Schema = formSchema.pick({plan: true, paymentPlan: true});
export const step3Schema = formSchema.pick({addsOn: true});


export type AddsOn = z.infer<typeof addsOnSchema>;
export type FormSchema = z.infer<typeof formSchema>;
export type FormStep1Schema = z.infer<typeof step1Schema>
export type FormStep2Schema = z.infer<typeof step2Schema>
export type FormStep3Schema = z.infer<typeof step3Schema>

export const hasErrors = (errors: FormStep1Schema) => Object.values(errors).some((value) => value !== "");
export const validateWithZod = (data: unknown) => step1Schema.safeParse(data);
export const handleZodErrors = (error: ZodError<{ name: string; email: string; phoneNumber: string; }>, errors: FormStep1Schema) => {
  const formattedText = error.format();

  if (formattedText.email && formattedText.email._errors.length > 0) {
    errors.email = formattedText.email._errors[0] ?? "";
  }
  if (
    formattedText.phoneNumber &&
    formattedText.phoneNumber._errors.length > 0
  ) {
    errors.phoneNumber = formattedText.phoneNumber._errors[0] ?? "";
  }
};
export const checkForEmptyFields = (
  errors: FormStep1Schema,
  fields: { name: string; email: string; phoneNumber: string }
) => {
  if (!fields.name) errors.name = "Name is required";
  if (!fields.email) errors.email = "Email is required";
  if (!fields.phoneNumber) errors.phoneNumber = "Phone number is required";
};