import { ChangePasswordForm } from "@/components/store/Account";
import PersonalInformationForm from "@/components/store/Account/PersonalInformationForm";
import { getUserById } from "@/lib/services/user";
import { auth } from "auth";

export const metadata = { title: "Account" };

const AccountPage = async () => {
  const session = await auth();
  if (!session) return null;

  const user = await getUserById(session.user?.id as string);
  if (!user) return null;

  return (
    <section>
      <div className="wrapper">
        <div className="space-y-8 lg:space-y-10">
          <PersonalInformationForm user={user} />
          <ChangePasswordForm />
        </div>
      </div>
    </section>
  );
};

export default AccountPage;
