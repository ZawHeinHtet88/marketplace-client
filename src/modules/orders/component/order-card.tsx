import { Link } from "react-router-dom";
import { Order } from "../types";
import { formatDate } from "@/utils/format-date";
import { getImageUrl } from "@/utils/images";
import { useTranslation } from "react-i18next";

function OrderCard({ order }: { order: Order }) {
  const {t} = useTranslation()
  return (
    <Link to={`/orders/${order.code}`}>
      <div className="mb-4 rounded-xl p-5 flex justify-between items-center shadow dark:border dark:border-gray-700 dark:bg-background">
        <div className="">
          <div className="mb-1">
            <h4 className="text-primary text-lg font-semibold">{order.code}</h4>
          </div>
          {order.isDelivered ? (
            <p className="text-orange-600 font-semibold text-sm">
              {t("delivery_finished")}
            </p>
          ) : (
            <p className="text-green-600 font-semibold text-sm">
              {t("still_on_progress")}
            </p>
          )}
          <div className="mt-1 font-semibold text-foreground/70">{formatDate(order.createdAt)}</div>
        </div>
        <div>
          <img
            className="w-[100px] h-[100px] rounded-2xl"
            src={getImageUrl({resource:"images",fileName:order.image})}
            alt=""
          />
        </div>
      </div>
    </Link>
  );
}

export default OrderCard;
