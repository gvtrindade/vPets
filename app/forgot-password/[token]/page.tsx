"use client";

import { authenticateToken, resetPassword } from "@/app/lib/action/auth";
import { passwordValidationRegex } from "@/app/lib/util";
import { TextField } from "@/app/ui/FormFields/TextField";
import Heading from "@/app/ui/heading";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(20, { message: "Password must be at most 20 characters long" })
      .regex(passwordValidationRegex, {
        message:
          "Password must contain at least: one uppercase letter, one lowercase letter, one number, and one special character",
      }),
    passwordConfirm: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.passwordConfirm;
    },
    { message: "Passwords do not match", path: ["confirmPassword"] }
  );

type SchemaProps = z.infer<typeof formSchema>;

export default function Page({ params }: { params: { token: string } }) {
  const { token } = params;
  const router = useRouter();

  const form = useForm<SchemaProps>({
    resolver: zodResolver(formSchema),
  });

  const [isEmailValidated, setIsEmailValidated] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await authenticateToken(token);
        setIsEmailValidated(true);
      } catch (err) {
        // do nothing
      }
    })();
  }, []);

  const submitForm = async (values: SchemaProps) => {
    try {
      await resetPassword(values, token);
      router.push("/login");
    } catch (err) {
      // do nothing
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <Heading>Forgot Password</Heading>

      {isEmailValidated ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitForm)}>
            <div className="flex flex-col gap-6 md:w-96 md:mx-auto">
              <TextField
                form={form}
                name="password"
                label="Password"
                placeholder="Enter password"
              />
              <TextField
                form={form}
                name="passwordConfirm"
                label="Confirm Password"
                placeholder="Confirm your password"
              />

              <Button type="submit" className="mt-6">
                Reset password
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <>
          <p>There was a problem validating your token</p>
          <Button>Resend token</Button>
        </>
      )}
    </div>
  );
}
