"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControls,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateUserInfo } from "@/lib/actions/user";
import { updateProfileSchema } from "@/lib/validations";
import { TUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const inputs: { label: string; name: string; type: string }[] = [
  { label: "First Name", name: "firstName", type: "text" },
  { label: "Last Name", name: "lastName", type: "text" },
  { label: "Email Address", name: "email", type: "email" },
];

const PersonalInformationForm = ({ user }: { user: TUser }) => {
  const { data: session, update } = useSession();
  const router = useRouter();

  const { firstName, lastName, email } = user;

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    defaultValues: { firstName, lastName, email },
    resolver: zodResolver(updateProfileSchema),
  });

  const isSubmitting = form.formState.isSubmitting;

  const handleSubmit = async (values: z.infer<typeof updateProfileSchema>) => {
    const result = await updateUserInfo(values);

    if (result.success) {
      if (session?.user) {
        await update({ ...session, user: { ...session.user, ...result.data } });
      }

      router.refresh();
      toast.success("Success", { description: result.message });
    } else {
      toast.error("Error", { description: result.message });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormControls className="mb-8">
              {inputs.map(({ name, label, type }) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name as keyof z.infer<typeof updateProfileSchema>}
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
            </FormControls>
            <Button type="submit" size="lg" loading={isSubmitting}>
              Save Changes
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PersonalInformationForm;
