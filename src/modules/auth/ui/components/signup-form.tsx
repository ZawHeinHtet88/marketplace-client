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
  SignupSchemaType,
  StepOneSchema,
  StepTwoSchema,
} from "@/modules/schemas/index.schema";
import { ForwardIcon, Loader } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSignupMutation } from "../../hook/mutations";
import { useAuthStore } from "../../store/index.store";
import { cn } from "@/lib/utils";

export const SignupForm = () => {
  const [step, setStep] = useState<number>(1);

  const { mutateAsync, isPending } = useSignupMutation();
  const { login } = useAuthStore((state) => state);
  const navigate = useNavigate();

  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(SignupSchama),
  });

  const onSubmit = async (values: SignupSchemaType) => {
    const res = await mutateAsync({ data: values });

    login({
      token: res.token,
      user: res.data.user,
    });
    toast.success("login successfully");
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
        : { name: values.name };

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
            Create your account
          </p>
        </header>
        <p className="text-lg font-bold text-foreground text-center">
          <span className={cn(step === 1 && "text-green-600")}>Step 1</span> |{" "}
          <span className={cn(step === 2 && "text-green-600")}>Step 2</span>
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            {step === 1 && (
              <>
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
                          className="bg-white/70 py-4 text-gray-700 placeholder:text-gray-400 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/30"
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
                <FormField
                  control={form.control}
                  name="passwordConfirm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[12px] font-semibold text-foreground/70 flex items-center justify-between">
                        <p className="">Confirm Password</p>
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="Confirm password..."
                          className="bg-white/70 py-4 text-gray-700 placeholder:text-gray-400 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/30"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  <Button
                    onClick={handleNext}
                    type="button"
                    className="rounded-xl"
                    style={{
                      background:
                        "linear-gradient(90deg, var(--primary), var(--secondary))",
                      color: "#fff",
                    }}
                  >
                    Next Step <ForwardIcon />
                  </Button>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[12px] font-semibold text-foreground/50">
                        Username
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-white/70 py-4 text-gray-700 placeholder:text-gray-400 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/30"
                          placeholder="Pls enter name..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-between">
                  <Button
                    onClick={handleBack}
                    type="button"
                    className="rounded-xl"
                    style={{
                      background:
                        "linear-gradient(90deg, var(--primary), var(--secondary))",
                      color: "#fff",
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    disabled={isPending}
                    type="submit"
                    className="rounded-xl"
                    style={{
                      background:
                        "linear-gradient(90deg, var(--primary), var(--secondary))",
                      color: "#fff",
                    }}
                  >
                    {isPending ? <Loader className="animate-spin" /> : "Submit"}
                  </Button>
                </div>
              </>
            )}
            <div className="flex items-center justify-center gap-2 pt-2">
              <p className="text-[14px] font-semibold text-foreground">
                Do you already have an account?
              </p>
              <Link
                to={"/login"}
                className="text-[14px] hover:underline font-semibold"
                style={{ color: "var(--primary)" }}
              >
                Sign In
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};
