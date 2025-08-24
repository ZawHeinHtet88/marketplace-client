import { useTranslation } from "react-i18next";
import { ModeToggle } from "@/components/mode-toggler";
import { LanguageSwitch } from "../language-toggler";

function WelcomeBar() {
  const { t } = useTranslation();

  return (
    <main className="bg-secondary py-2 px-5 lg:px-0">
      <nav className="w-full lg:max-w-7xl mx-auto flex items-center justify-between">
        <p className="capitalize text-secondary-foreground font-thin">
          {t("welcome")}
          <span className="hidden md:inline-block">
            {t("to_worldwide_mega_mark")}
          </span>
        </p>
        <div className="flex items-center">
          <div className="px-5 border-r-2">
            <ModeToggle />
          </div>
          <div className="px-5">
            <LanguageSwitch />
          </div>
        </div>
      </nav>
    </main>
  );
}

export default WelcomeBar;
