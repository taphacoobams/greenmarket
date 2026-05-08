import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(4, "Mot de passe : au moins 4 caractères"),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "Nom requis"),
    email: z.string().email({ message: "Email invalide" }),
    phone: z.string().trim().min(9, "Numéro de téléphone requis"),
    password: z.string().min(4, "Au moins 4 caractères"),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, { path: ["confirm"], message: "Les mots de passe diffèrent" });

export const checkoutAddressSchema = z.object({
  address: z.string().min(8, "Adresse plus précise"),
  phone: z.string().min(9, "Numéro plausible"),
  deliveryMethod: z.enum(["standard", "express", "slot"]),
});

export const paymentSchema = z.object({
  paymentMethod: z.enum(["wave", "orange_money", "card", "cod"]),
});

export type CheckoutAddressValues = z.infer<typeof checkoutAddressSchema>;
export type PaymentValues = z.infer<typeof paymentSchema>;
export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
