"use client";

import { authenticate } from "@/app/lib/action/auth";
import { TextField } from "@/app/ui/FormFields/TextField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
});
type SchemaProps = z.infer<typeof formSchema>;

export default function LoginForm() {
  const form = useForm<SchemaProps>({
    resolver: zodResolver(formSchema),
  });

  const submitForm = async (values: SchemaProps) => {
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("password", values.password);
    await authenticate(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitForm)}>
        <div className="flex flex-col gap-6 md:w-96 md:mx-auto">
          <TextField
            form={form}
            name="username"
            label="Username"
            placeholder="Enter your username"
          />
          <TextField
            form={form}
            name="password"
            label="Password"
            placeholder="Enter password"
          />

          <Button type="submit" className="mt-6">
            Login
          </Button>
        </div>
      </form>
    </Form>
  );
}
