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
import { Loader, Store } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "./google-login";
import { useTranslation } from "react-i18next";

export const LoginForm = () => {
  const { mutateAsync, isPending } = useLoginMutation();
  const { login } = useAuthStore((state) => state);
  const navigate = useNavigate();
  const { t } = useTranslation("");

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
      toast.success(t("login_success"));
      navigate("/");
    }
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center px-4 bg-gradient-to-br from-cyan-100 via-purple-100 via-blue-100 to-indigo-100 animate-gradient-x relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-300/40 to-purple-300/40 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-300/40 to-blue-300/40 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-200/30 to-cyan-200/30 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="w-full max-w-md bg-card/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-border/50 p-8 space-y-8 relative z-10 animate-in fade-in-0 zoom-in-95 duration-500">
        <header className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-lg opacity-75 animate-pulse-slow"></div>
            <div className="relative p-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full shadow-lg">
              <Store className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent text-center">
            {t("ayeyar_marketplace")}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 font-medium text-center">
            {t("create_account")}
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
                  <FormLabel className="text-sm font-semibold text-foreground">
                    {t("email")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-12 bg-input/50 backdrop-blur-sm border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-300 hover:bg-input/70"
                      placeholder={t("pls_enter_email")}
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
                  <FormLabel className="text-sm font-semibold text-foreground">
                    {t("password")}
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Enter your password"
                      className="h-12 bg-input/50 backdrop-blur-sm border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-300 hover:bg-input/70"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="h-12 px-8 w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={isPending}
              type="submit"
            >
              {isPending ? (
                <Loader className="animate-spin w-5 h-5" />
              ) : (
                t("sign_in")
              )}
            </Button>

            <GoogleLogin />

            <div className="flex items-center justify-center gap-2 pt-4">
              <p className="text-sm text-muted-foreground">
                {t("don't_have_account")}
              </p>
              <Link
                to={"/signup"}
                className="text-sm font-semibold text-primary hover:text-primary/80 hover:underline transition-all duration-200 hover:scale-105"
              >
                {t("sign_up")}
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};
