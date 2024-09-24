"use client";

import { getNewPet } from "@/app/lib/action/pet";
import { PetType } from "@/app/lib/definitions";
import { TextField } from "@/app/ui/FormFields/TextField";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  type: z.number(),
});
type SchemaProps = z.infer<typeof formSchema>;

export default function NewPetForm({
  petTypes,
  userId,
}: {
  petTypes: PetType[];
  userId: string;
}) {
  const router = useRouter();
  const form = useForm<SchemaProps>({
    resolver: zodResolver(formSchema),
  });

  const submitForm = async (values: SchemaProps) => {
    await getNewPet(values, userId);
    router.push("/pets");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitForm)}>
        <div className="flex flex-col gap-6 md:w-96 md:mx-auto">
          <TextField
            form={form}
            name="name"
            label="Name"
            placeholder="Pet's Name"
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pet's Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    className="flex flex-col space-y-1"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {petTypes.map((type) => (
                        <FormItem key={type.id} className="flex flex-col gap-2">
                          <img src={"test"} className="size-48 mx-auto" />
                          <div className="flex gap-2">
                            <FormControl>
                              <RadioGroupItem value={type.id} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {type.name}
                            </FormLabel>
                          </div>
                        </FormItem>
                      ))}
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Get Pet!</Button>
        </div>
      </form>
    </Form>
  );
}
