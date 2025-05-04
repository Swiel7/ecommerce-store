import { ResetPasswordForm } from "@/components/store/Auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = { title: "Reset password" };

const ResetPasswordPage = () => {
  return (
    <section className="grid place-items-center">
      <div className="wrapper w-full">
        <Card className="mx-auto max-w-lg">
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>Please Enter Your New Password</CardDescription>
          </CardHeader>
          <CardContent>
            <ResetPasswordForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
