import { Link } from "react-router-dom";
import { Order } from "../types";

function OrderCard({ order }: { order: Order }) {
  return (
    <Link to={`/orders/${order.code}`}>
      <div className="mb-4 rounded-xl p-5 flex justify-between items-center shadow dark:border dark:border-gray-700 dark:bg-background">
        <div className="">
          <div className="mb-4">
            <h4 className="text-primary text-lg font-semibold">{order.code}</h4>
          </div>
          {order.isDelivered ? (
            <p className="text-orange-600 font-semibold text-sm">
              Deliverd Finished
            </p>
          ) : (
            <p className="text-green-600 font-semibold text-sm">
              Stay on progress...
            </p>
          )}
        </div>
        <div>
          <img
            className="w-[100px] h-[100px] rounded-2xl"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTX4sPl8qfzRC7uZqlCP89rszr0mNCJaVUow&s"
            alt=""
          />
        </div>
      </div>
    </Link>
  );
}

export default OrderCard;
