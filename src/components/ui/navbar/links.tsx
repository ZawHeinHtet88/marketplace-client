import CartModal from "@/modules/cart/ui/components/cart-modal";
import { ShoppingBasket, User } from "lucide-react";
import { Link } from "react-router-dom";

function Links() {
  return (
    <div className="flex items-center">
      <div className="flex items-center gap-2 border-r-2 px-10">
        <User className="text-red-600" />
        <Link className="font-semibold text-gray-600" to={"/login"}>
          Sign Up/Sign In
        </Link>
      </div>
      <div className="flex items-center gap-2 px-10">
        <CartModal />
      </div>
    </div>
  );
}

export default Links;
