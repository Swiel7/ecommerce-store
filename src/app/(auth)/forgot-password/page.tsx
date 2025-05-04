import { ForgotPasswordForm } from "@/components/store/Auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = { title: "Forgot password" };

const ForgotPasswordPage = () => {
  return (
    <section className="grid place-items-center">
      <div className="wrapper w-full">
        <Card className="mx-auto max-w-lg">
          <CardHeader>
            <CardTitle>Forgot Password</CardTitle>
            <CardDescription>
              Enter your registered email address. We’ll send you a code to
              reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ForgotPasswordForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
