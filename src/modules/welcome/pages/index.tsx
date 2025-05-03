import { ModeToggle } from "@/components/mode-toggler";
import { Button } from "@/components/ui/button";
import { LanguageSwitch } from "@/components/ui/language-toggler";
import i18n from "@/lib/i18n";
import { useTranslation } from "react-i18next";

export const WelcomePage = () => {
  const {t} = useTranslation()
  return (
    <div className="">
      <div>
        <LanguageSwitch/>
        <ModeToggle/>
        <Button>click me</Button>
        <h1>{t("welcome")}</h1>
        <Button  onClick={() => i18n.changeLanguage("my")}>
          မြန်မာ
        </Button>
        <Button onClick={() => i18n.changeLanguage("en")}>English</Button>
      </div>
    </div>
  );
};
