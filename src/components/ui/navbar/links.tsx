import { useAuthStore } from "@/modules/auth/store/index.store";
import CartModal from "@/modules/cart/ui/components/cart-modal";
import { Boxes, User } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "./../../../lib/utils";
import Navprofile from "./nav-profile";

function Links() {
  const { isAuthenticated } = useAuthStore((state) => state);

  
  return (
    <div className="flex items-center">
      <div className="flex items-center gap-2 border-r-2 px-10">
        <Boxes className="text-primary" />
        <Link
          className="font-semibold text-secondary-foreground"
          to={"/products"}
        >
          Products
        </Link>
      </div>
      {!isAuthenticated && (
        <div className="flex items-center gap-2 border-r-2 px-10">
          <User className="text-primary" />
          <Link
            className="font-semibold text-secondary-foreground"
            to={"/login"}
          >
            Sign Up/Sign In
          </Link>
        </div>
      )}

      <div
        className={cn(
          "flex items-center gap-2 px-10",
          isAuthenticated && "border-r-2"
        )}
      >
        <CartModal />
      </div>
        <Navprofile/>
    </div>
  );
}

export default Links;
