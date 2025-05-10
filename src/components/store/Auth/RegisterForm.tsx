"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormControls,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AuthLink from "./AuthLink";
import { useRouter } from "next/navigation";
import { register } from "@/lib/actions/auth";
import { toast } from "sonner";

const inputs: { label: string; name: string; type: string }[] = [
  { label: "First Name", name: "firstName", type: "text" },
  { label: "Last Name", name: "lastName", type: "text" },
  { label: "Email Address", name: "email", type: "email" },
  { label: "Password", name: "password", type: "password" },
];

type Props = { intercept?: boolean; onSuccess?: () => void };

const RegisterForm = ({ intercept = false, onSuccess }: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof registerSchema>>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      terms: false,
    },
    resolver: zodResolver(registerSchema),
  });

  const isSubmitting = form.formState.isSubmitting;

  const handleSubmit = async (values: z.infer<typeof registerSchema>) => {
    const { success, message } = await register(values);

    if (success) {
      if (onSuccess) onSuccess?.();
      else router.replace("/");

      toast.success("Success", { description: message });
    } else {
      toast.error("Error", { description: message });
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormControls className="mb-4 space-y-2">
            {inputs.map(({ name, label, type }) => (
              <FormField
                key={name}
                control={form.control}
                name={
                  name as Exclude<keyof z.infer<typeof registerSchema>, "terms">
                }
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Input type={type} disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormLabel className="text-foreground text-base">
                      I Agree The{" "}
                      <AuthLink href="#">Terms & Conditions</AuthLink>
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormControls>
          <Button
            type="submit"
            size="lg"
            className="w-full"
            loading={isSubmitting}
          >
            Register
          </Button>
        </form>
      </Form>
      <div className="text-foreground mt-3 text-center">
        Already have an account?{" "}
        <AuthLink href="/login" intercept={intercept}>
          Sign in
        </AuthLink>
      </div>
    </div>
  );
};

export default RegisterForm;
