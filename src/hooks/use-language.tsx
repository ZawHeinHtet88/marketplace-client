import { useTranslation } from "react-i18next";

export const useIsMyanmar = () => {
  const { i18n } = useTranslation();

  const isMyanmar = () => i18n.language === "my";
  return { isMyanmar };
};
