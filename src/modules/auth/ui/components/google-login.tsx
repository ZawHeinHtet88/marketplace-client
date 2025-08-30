"use client";

import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Chrome } from "lucide-react";

export default function GoogleLogin() {
  const { t } = useTranslation();

  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <Button
      type="button"
      onClick={handleLogin}
      variant="outline"
      className="w-full h-12 bg-card/50 backdrop-blur-sm hover:bg-muted/70 border-2 border-border hover:border-primary/30 text-foreground font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <Chrome className="w-5 h-5 mr-3 text-primary group-hover:rotate-12 transition-transform duration-300" />
      <span className="relative z-10">{t("sign_in_google")}</span>
    </Button>
  );
}
