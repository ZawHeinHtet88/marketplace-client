"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/ui/password-input";
import {
  LoginSchama,
  type LoginSchemaType,
} from "@/modules/schemas/index.schema";
import { useLoginMutation } from "../../hook/mutations";
import { useAuthStore } from "../../store/index.store";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const { mutateAsync, isPending } = useLoginMutation();
  const { login } = useAuthStore((state) => state);
  const navigate = useNavigate();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchama),
  });

  const onSubmit = async (values: LoginSchemaType) => {
    const res = await mutateAsync({ data: values });

    if (res.status === "fail") {
      toast.error(res.message);
    } else {
      login({
        token: res.token,
        user: res.data.user,
      });
      toast.success("login successfully");
      navigate("/");
    }
  };

  return (
    <section className="space-y-5 w-full">
      <header className="flex items-center">
        <img className="w-[100px] h-[100px]" src="./m-logo.png" />
        <h4 className="text-xl font-semibold capitalize text-primary">
          Ayeyar Marketplace
        </h4>
      </header>
      <p className="text-lg font-bold text-foreground">Nice To See You Again</p>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[12px] font-semibold text-foreground/50">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-gray-200 py-5 text-foreground placeholder:text-foreground/50"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[12px] font-semibold text-foreground/70 flex items-center justify-between">
                    <p className="">Password</p>
                    <Button
                      variant={"link"}
                      className="text-sm font-medium text-blue-400"
                    >
                      Forget Password?
                    </Button>
                  </FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="password..." {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full py-6 font-bold"
              disabled={isPending}
              type="submit"
            >
              {isPending ? <Loader className="animate-spin" /> : "Sign In"}
            </Button>
            <Button className="w-full py-6 bg-secondary text-foreground">
              <img
                className="w-[20px] h-[20px]"
                src="./google.png"
                alt="google"
              />
              or Sign in with Google
            </Button>
            <div className="flex items-center justify-center gap-2">
              <p className="text-[14px] font-semibold text-foreground">
                Don't have an account?
              </p>
              <Link to={"/signup"} className="text-blue-400 text-[14px]" >
                Sign up now
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};
