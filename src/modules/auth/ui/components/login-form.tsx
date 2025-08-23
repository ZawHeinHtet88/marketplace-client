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
import GoogleLogin from "./google-login";

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
    <section
      className="min-h-screen w-full flex items-center justify-center px-2"
      style={{
        background:
          "linear-gradient(135deg, var(--primary), var(--primary), var(--secondary))",
      }}
    >
      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-10 space-y-8 border border-white/30 mx-auto">
        <header className="flex flex-col items-center gap-3">
          <div
            className="p-1 rounded-full"
            style={{
              background:
                "linear-gradient(135deg, var(--secondary), var(--primary))",
            }}
          >
            <img
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-lg"
              src="./m-logo.png"
            />
          </div>
          <h4
            className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text"
            style={{
              backgroundImage:
                "linear-gradient(90deg, var(--primary), var(--secondary))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Ayeyar Marketplace
          </h4>
          <p className="text-base font-semibold text-gray-700">
            Welcome Back 👋
          </p>
        </header>
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
                      className="bg-white/70 py-5 text-gray-700 placeholder:text-gray-400 "
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
                      className="text-sm font-medium"
                      style={{ color: "var(--primary)" }}
                    >
                      Forget Password?
                    </Button>
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="password..."
                      className="bg-white/70 py-4 text-gray-700 placeholder:text-gray-400 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/30"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full py-4 font-bold rounded-xl text-white transition"
              style={{
                background:
                  "linear-gradient(90deg, var(--primary), var(--secondary))",
              }}
              disabled={isPending}
              type="submit"
            >
              {isPending ? <Loader className="animate-spin" /> : "Sign In"}
            </Button>
            <GoogleLogin />
            <div className="flex items-center justify-center gap-2 pt-2">
              <p className="text-[14px] font-semibold text-foreground">
                Don't have an account?
              </p>
              <Link
                to={"/signup"}
                className="text-[14px] hover:underline font-semibold"
                style={{ color: "var(--primary)" }}
              >
                Sign up now
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};
