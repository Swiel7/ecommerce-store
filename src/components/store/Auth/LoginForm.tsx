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
import { loginSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AuthLink from "./AuthLink";

const LoginForm = ({ intercept = false }: { intercept?: boolean }) => {
  const form = useForm<z.infer<typeof loginSchema>>({
    defaultValues: { email: "", password: "", remember: false },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    console.log(values);
    // TODO: "Login action"
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormControls>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between gap-2">
              <FormField
                control={form.control}
                name="remember"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-foreground text-base">
                      Remember me
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AuthLink href="/forgot-password" intercept={intercept}>
                Forgot Password?
              </AuthLink>
            </div>
          </FormControls>
          <Button type="submit" size="lg" className="w-full">
            Login
          </Button>
        </form>
      </Form>
      <div className="mt-4 text-center">
        Don&apos;t have an account?{" "}
        <AuthLink href="/register" intercept={intercept}>
          Sign up
        </AuthLink>
      </div>
    </div>
  );
};

export default LoginForm;
