import { LoginForm } from "@/components/store/Auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = { title: "Login" };

const LoginPage = () => {
  return (
    <section>
      <div className="wrapper">
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>Please login here</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LoginPage;
