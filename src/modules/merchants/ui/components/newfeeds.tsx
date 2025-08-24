import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useNewFeedSidebarStore } from "../../store/index.store";
import { useTranslation } from "react-i18next";
function NewFeeds() {
  const { isNewFeedOpen } = useNewFeedSidebarStore();
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {isNewFeedOpen && (
        <motion.div
          className="flex-1"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Card className={cn("shadow rounded-2xl border")}>
            <CardHeader>
              <CardTitle className="text-lg">{t("feed_back")}</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="h-[475px] flex items-center justify-center flex-col text-center">
              <div className="w-[60px] bg-secondary h-[60px] rounded-full flex justify-center items-center">
                <MessageCircle />
              </div>
              <p className="text-xl font-semibold">{t("no_feed_back")}</p>
              <p className="font-semibold text-gray-500">
                {
                  t("this_seller_haven't_recive")
                }
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default NewFeeds;
