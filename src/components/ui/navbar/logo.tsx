import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Logo() {
  const {t} = useTranslation();
  return (
    <div className="">
      <Link to="/" className="font-mono text-2xl uppercase">
        <span className="text-primary font-extrabold">{t("ayeyar")}</span>
        <span className="text-foreground">{t("mart")}</span>
      </Link>
    </div>
  );
}

export default Logo;
