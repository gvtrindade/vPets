import { authenticateToken } from "@/app/lib/action/auth";
import Heading from "@/app/ui/heading";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import NewPasswordForm from "./newPasswordForm";

export default async function Page({ params }: { params: { token: string } }) {
  const { token } = params;
  const isEmailValidated = await authenticateToken(token);

  return (
    <div className="flex flex-col gap-8">
      <Heading>Forgot Password</Heading>

      <Suspense fallback={<p>Loading...</p>}>
        {isEmailValidated ? (
          <NewPasswordForm token={token} />
        ) : (
          <div className="flex flex-col gap-6 items-center">
            <p>There was a problem validating your token</p>
            <Button>Resend token</Button>
          </div>
        )}
      </Suspense>
    </div>
  );
}
