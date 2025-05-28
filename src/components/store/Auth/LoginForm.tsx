"use client";

import { Button } from "@/components/ui/button";
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
import { loginWithCredentials } from "@/lib/actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = { intercept?: boolean; onSuccess?: () => void };

const LoginForm = ({ intercept = false, onSuccess }: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    defaultValues: { email: "", password: "", remember: false },
    resolver: zodResolver(loginSchema),
  });

  const isSubmitting = form.formState.isSubmitting;

  const handleSubmit = async (values: z.infer<typeof loginSchema>) => {
    const { success, message } = await loginWithCredentials(values);

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
      <div className="text-foreground mt-3 text-center">
        Don&apos;t have an account?{" "}
        <AuthLink href="/register" intercept={intercept}>
          Sign up
        </AuthLink>
      </div>
    </div>
  );
};

export default LoginForm;
