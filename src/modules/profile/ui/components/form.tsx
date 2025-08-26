import { useState } from "react";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Edit, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useUpdateProfileMutation } from "../../hooks/mutations";
import { profileSchema, ProfileSchemaType } from "../../schemas/index.schema";
import { Customer } from "../../types";
import FileUpload from "@/components/ui/file-upload";

export function ProfileEditForm({ customer }: { customer: Customer }) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useUpdateProfileMutation();
  const [open, setOpen] = useState(false);

  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: customer.name,
      city: customer.shippingAddresse?.city,
      state: customer.shippingAddresse?.state,
      country: customer.shippingAddresse?.country,
      street: customer.shippingAddresse?.street,
      // if your schema expects a number, keep this as number; otherwise cast to string
      postalCode: customer.shippingAddresse?.postalCode,
      image: undefined as unknown as File | undefined, // ensure type exists
    },
  });

  const onSubmit = async (values: ProfileSchemaType) => {
    const formData = new FormData();
    formData.set("name", values.name);
    formData.set("city", values.city);
    formData.set("state", values.state);
    formData.set("country", values.country);
    formData.set("street", values.street);
    formData.set("postalCode", values.postalCode.toString());
    if (values.image) {
      formData.set("image", values.image);
    }

    const res = await mutateAsync({ id: customer._id, data: formData });

    if (res?.isSuccess) {
      // fix: use the shared client and correct key
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success(t("profile_updated"));
      setOpen(false); // close the sheet after success
      
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <Edit />
        </Button>
      </SheetTrigger>

      {/* FIX: Put the form INSIDE the Sheet so the submit button submits */}
      <SheetContent className="sm:max-w-[500px] p-5 overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>{t("edit_profile") ?? "Edit profile"}</SheetTitle>
          <SheetDescription>
            {t("edit_profile_desc") ??
              "Make changes to your profile here. Click save when you're done."}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid auto-rows-min gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[12px] font-semibold text-foreground/50">
                      {t("username")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white/70 py-4 text-gray-700 placeholder:text-gray-400 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/30"
                        placeholder={t("enter_name") as string}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[12px] font-semibold text-foreground/50">
                        {t("street")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-white/70 py-4 text-gray-700 placeholder:text-gray-400 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/30"
                          placeholder={t("enter_street") as string}
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
                      <FormLabel className="text-[12px] font-semibold text-foreground/50">
                        {t("city")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-white/70 py-4 text-gray-700 placeholder:text-gray-400 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/30"
                          placeholder={t("enter_city") as string}
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
                      <FormLabel className="text-[12px] font-semibold text-foreground/50">
                        {t("state")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-white/70 py-4 text-gray-700 placeholder:text-gray-400 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/30"
                          placeholder={t("enter_state") as string}
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
                      <FormLabel className="text-[12px] font-semibold text-foreground/50">
                        {t("country")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-white/70 py-4 text-gray-700 placeholder:text-gray-400 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/30"
                          placeholder={t("enter_country") as string}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[12px] font-semibold text-foreground/50">
                      {t("postal_code")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="bg-white/70 py-4 text-gray-700 placeholder:text-gray-400 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/30"
                        placeholder={t("enter_postal_code") as string}
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const v = e.target.value;
                          // keep number in RHF state if your schema expects number
                          field.onChange(v === "" ? undefined : Number(v));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* File upload field */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[12px] font-semibold text-foreground/50">
                      {t("profile_image") ?? "Profile image"}
                    </FormLabel>
                    <FormControl>
                      <FileUpload
                        defaultImage={null}
                        onFileChange={field.onChange}
                        accept="image/*"
                        name="image"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <SheetFooter className="p-0">
              <Button
                disabled={isPending || !form.formState.isDirty}
                type="submit"
                className="rounded-xl"
                style={{
                  background:
                    "linear-gradient(90deg, var(--primary), var(--secondary))",
                  color: "#fff",
                }}
              >
                {isPending ? <Loader className="animate-spin" /> : t("submit")}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
