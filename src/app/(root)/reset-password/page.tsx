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
    <section>
      <div className="wrapper">
        <Card className="mx-auto max-w-md">
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
