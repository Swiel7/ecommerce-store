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
import Link from "next/link";

const inputs: { label: string; name: string; type: string }[] = [
  { label: "First Name", name: "firstName", type: "text" },
  { label: "Last Name", name: "lastName", type: "text" },
  { label: "Email Address", name: "email", type: "email" },
  { label: "Password", name: "password", type: "password" },
];

const RegisterForm = ({ intercept = false }: { intercept?: boolean }) => {
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

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    console.log(values);
    // TODO: "Login action"
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormControls>
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
                      <Input {...field} type={type} />
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
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-foreground text-base">
                    I Agree The{" "}
                    <Link href="#" className="underline hover:no-underline">
                      Terms & Conditions
                    </Link>
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormControls>
          <Button type="submit" size="lg" className="w-full">
            Register
          </Button>
        </form>
      </Form>
      <div className="mt-4 text-center">
        Already have an account?{" "}
        <AuthLink href="/login" intercept={intercept}>
          Sign in
        </AuthLink>
      </div>
    </div>
  );
};

export default RegisterForm;
