import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export function useLoginForm() {
  return useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });
}

const registerSchema = loginSchema.extend({
  name: z.string().min(2),
});

export function useRegisterForm() {
  return useForm<RegisterCredentials>({
    resolver: zodResolver(registerSchema),
  });
}

const flightSchema = z.object({
  code: z.string().min(5),
  capacity: z.string().min(2),
  departureDate: z.string(),
});

export function useFlightForm(initialData?: Partial<FlightCreateInput>) {
  console.log(initialData);
  return useForm<FlightCreateInput>({
    resolver: zodResolver(flightSchema),
    defaultValues: {
      ...initialData,
      departureDate: initialData?.departureDate
        ? new Date(initialData.departureDate).toISOString().slice(0, 16) 
        : "",
    },
  });
}
