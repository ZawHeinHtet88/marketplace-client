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
    form.clearErrors(); // 👈 important to clear old errors

    const validate = await validateStep();
    if (validate) setStep((prev) => prev + 1);
  };

  const handleBack = async () => {
    form.clearErrors(); // 👈 also clear when going back
    setStep((prev) => prev - 1);
  };

  return (
    <section className="space-y-5">
      <header className="flex items-center">
        <img className="w-[100px] h-[100px]" src="./m-logo.png" />
        <h4 className="text-xl font-semibold capitalize text-primary">
          Ayeyar Marketplace
        </h4>
      </header>
      <p className="text-lg font-bold text-foreground">
        <span className={cn(step === 1 && "text-green-600")}>Step 1</span> |
        <span className={cn(step === 2 && "text-green-600")}> Step 2</span>{" "}
      </p>
      <div>
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
                      </FormLabel>
                      <FormControl>
                        <PasswordInput placeholder="password..." {...field} />
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
                    className="justify-self-end"
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
                          className="bg-gray-200 py-5 text-foreground placeholder:text-foreground/50"
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
                    className="justify-self-end"
                  >
                    Back
                  </Button>
                  <Button disabled={isPending} type="submit">
                    {isPending ? <Loader className="animate-spin" /> : "Submit"}
                  </Button>
                </div>
              </>
            )}

            <div className="flex items-center justify-center gap-2">
              <p className="text-[14px] font-semibold text-foreground">
                Do you already have an account?
              </p>
              <Link to={"/login"} className="text-blue-400 text-[14px]">
                Sign In
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};
