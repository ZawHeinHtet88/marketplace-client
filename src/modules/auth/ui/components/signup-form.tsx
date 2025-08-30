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
  SignupSchama,
  type SignupSchemaType,
  StepOneSchema,
  StepTwoSchema,
} from "@/modules/schemas/index.schema";
import { ForwardIcon, Loader, Store, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSignupMutation } from "../../hook/mutations";
import { useAuthStore } from "../../store/index.store";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export const SignupForm = () => {
  const [step, setStep] = useState<number>(1);

  const { mutateAsync, isPending } = useSignupMutation();
  const { login } = useAuthStore((state) => state);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(SignupSchama),
  });

  const onSubmit = async (values: SignupSchemaType) => {
    const res = await mutateAsync({ data: values });

    login({
      token: res.token,
      user: res.data.user,
    });
    toast.success(t("login_success"));
    navigate("/");
  };

  const validateStep = async () => {
    const values = form.getValues();
    const schema = step === 1 ? StepOneSchema : StepTwoSchema;

    const stepValues =
      step === 1
        ? {
            email: values.email,
            password: values.password,
            passwordConfirm: values.passwordConfirm,
          }
        : {
            name: values.name,
            street: values.street,
            city: values.city,
            state: values.state,
            country: values.country,
            postalCode: values.postalCode,
          };

    const result = await schema.safeParseAsync(stepValues);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        form.setError(issue.path[0] as keyof SignupSchemaType, {
          message: issue.message,
        });
      });
      return false;
    }

    return true;
  };

  const handleNext = async () => {
    form.clearErrors();
    const validate = await validateStep();
    if (validate) setStep((prev) => prev + 1);
  };

  const handleBack = async () => {
    form.clearErrors();
    setStep((prev) => prev - 1);
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 space-y-6 border border-white/20 animate-fade-in-up hover:shadow-3xl transition-all duration-500">
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

        <div className="flex items-center justify-center gap-4 py-2">
          <div
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300",
              step === 1
                ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg"
                : "bg-gray-100 dark:bg-gray-800 text-gray-500"
            )}
          >
            <span className="text-sm font-semibold">{t("step_1")}</span>
          </div>
          <div className="w-8 h-0.5 bg-gray-200 dark:bg-gray-700"></div>
          <div
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300",
              step === 2
                ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg"
                : "bg-gray-100 dark:bg-gray-800 text-gray-500"
            )}
          >
            <span className="text-sm font-semibold">{t("step_2")}</span>
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-5"
          >
            {step === 1 && (
              <div className="space-y-5 animate-slide-in-right">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {t("email")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-12 bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 hover:shadow-md"
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
                      <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {t("password")}
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="password..."
                          className="h-12 bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 hover:shadow-md"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="passwordConfirm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {t("confirm_password")}
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="Confirm password..."
                          className="h-12 bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 hover:shadow-md"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end pt-2">
                  <Button
                    onClick={handleNext}
                    type="button"
                    className="h-12 px-8 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    {t("next_step")} <ForwardIcon className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-5 animate-slide-in-left">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {t("username")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-12 bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 hover:shadow-md"
                          placeholder={t("enter_name")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          {t("phone")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="h-12 bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 hover:shadow-md"
                            placeholder={t("enter_phone")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          {t("postal_code")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="h-12 bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 hover:shadow-md"
                            placeholder={t("enter_postal_code")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          {t("street")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="h-12 bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 hover:shadow-md"
                            placeholder={t("enter_street")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          {t("city")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="h-12 bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 hover:shadow-md"
                            placeholder={t("enter_city")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          {t("state")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="h-12 bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 hover:shadow-md"
                            placeholder={t("enter_state")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          {t("country")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="h-12 bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 hover:shadow-md"
                            placeholder={t("enter_country")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center justify-between pt-4">
                  <Button
                    onClick={handleBack}
                    type="button"
                    className="h-12 px-6 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    {t("back")}
                  </Button>
                  <Button
                    disabled={isPending}
                    type="submit"
                    className="h-12 px-8 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isPending ? (
                      <Loader className="animate-spin w-4 h-4" />
                    ) : (
                      t("submit")
                    )}
                  </Button>
                </div>
              </div>
            )}
            <div className="flex items-center justify-center gap-2 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t("already_have_account")}
              </p>
              <Link
                to={"/login"}
                className="text-sm font-semibold text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 hover:underline transition-colors duration-300"
              >
                {t("sign_in")}
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};
