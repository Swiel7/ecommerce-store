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
import { loginWithCredentials } from "@/actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LoginForm = ({ intercept = false }: { intercept?: boolean }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    defaultValues: { email: "", password: "", remember: false },
    resolver: zodResolver(loginSchema),
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const result = await loginWithCredentials(values);

    if (result.success) {
      toast.success("Success", {
        description: "You have successfully signed in.",
      });
      router.replace("/");
    } else {
      toast.error("Error", { description: result.error });
    }
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
                    <Input type="email" disabled={isSubmitting} {...field} />
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
                    <Input type="password" disabled={isSubmitting} {...field} />
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
                        disabled={isSubmitting}
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
          <Button
            type="submit"
            size="lg"
            className="w-full"
            loading={isSubmitting}
          >
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
