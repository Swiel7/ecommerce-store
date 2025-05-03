import { RegisterForm } from "@/components/store/Auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = { title: "Register" };

const RegisterPage = () => {
  return (
    <section>
      <div className="wrapper">
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle>Create New Account</CardTitle>
            <CardDescription>Please Enter Details</CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RegisterPage;
