"use client";

import { forgotPassword } from "@/app/lib/action/auth";
import { TextField } from "@/app/ui/FormFields/TextField";
import Heading from "@/app/ui/heading";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  usernameOrEmail: z.string(),
});

type SchemaProps = z.infer<typeof formSchema>;

export default function Page() {
  const [messageSent, setMessageSent] = useState(false);

  const form = useForm<SchemaProps>({
    resolver: zodResolver(formSchema),
  });

  const submitForm = async (values: SchemaProps) => {
    await forgotPassword(values);
    form.reset();
    setMessageSent(true);
  };

  return (
    <div className="flex flex-col gap-8">
      <Heading>Forgot Password</Heading>

      {messageSent ? (
        <p className="text-green-500">
          Check your email to reset your password!
        </p>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitForm)}>
            <div className="flex flex-col gap-6 md:w-96 md:mx-auto">
              <TextField
                form={form}
                name="usernameOrEmail"
                label="Username or Email"
                placeholder="Enter your username or email"
              />

              <Button type="submit" className="mt-6">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
