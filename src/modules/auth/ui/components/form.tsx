"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/ui/password-input";

export const LoginForm = () => {
  const FormSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    return "f";
  }

  return (
    <section className="space-y-5">
      <header className="flex items-center">
        <img className="w-[100px] h-[100px]" src="./m-logo.png" />
        <h4 className="text-xl font-semibold capitalize">Ayeyar Marketplace</h4>
      </header>
      <p className="text-lg font-bold">Nice To See You Again</p>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[12px] font-semibold text-gray-700">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-gray-200 py-5 placeholder:text-gray-600"
                      placeholder="Pls enter mail..."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[12px] font-semibold text-gray-700 flex items-center justify-between">
                    <p className="">Password</p>
                    <Button
                      variant={"link"}
                      className="text-sm font-medium text-blue-400"
                    >
                      Forget Password?
                    </Button>
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      className="bg-gray-200 py-5"
                      placeholder="Pls enter mail..."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full py-6 font-bold" type="submit">
              Sign In
            </Button>
            <Button className="w-full py-6 bg-gray-800">
                <img className="w-[20px] h-[20px]" src="./google.png" alt="google" />
              or Sign in with Google
            </Button>
            <div className="flex items-center justify-center">
              <p className="text-[14px] font-semibold">Don't have an account?</p>
              <Button className="text-blue-400 text-[14px]" variant={"link"}>Sign up now</Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};
