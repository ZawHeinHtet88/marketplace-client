// components/language-switch.tsx

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export const LanguageSwitch = () => {
  const { i18n } = useTranslation();
  const [isMyanmar, setIsMyanmar] = useState(i18n.language === "my");

  const toggleLanguage = (checked: boolean) => {
    const lang = checked ? "my" : "en";
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
    setIsMyanmar(checked);
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("i18nextLng");
    if (savedLang) {
      setIsMyanmar(savedLang === "my");
      i18n?.changeLanguage(savedLang);
    }
  }, []);

  return (
    <div className="flex items-center space-x-2 text-primary">
      <Label htmlFor="language-switch">EN</Label>
      <Switch
        id="language-switch"
        checked={isMyanmar}
        onCheckedChange={toggleLanguage}
      />
      <Label>မြန်</Label>
    </div>
  );
};
