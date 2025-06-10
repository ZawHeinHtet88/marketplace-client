import { useAuthStore } from "@/modules/auth/store/index.store";
import { Truck, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Button } from "../button";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Separator } from "../separator";
import { toast } from "sonner";
import { Link } from "react-router-dom";

function Navprofile() {
  const { isAuthenticated, logout, user } = useAuthStore((state) => state);

  if (!isAuthenticated) return;

  const handleLogout = () => {
    logout();
    toast.success("Logout Successfully");
  };
  return (
    <div className="flex items-center gap-2  px-10">
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://githb.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback className="text-foreground">
                {user && user!.email.slice(0, 3)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h4 className="capitalize text-primary font-semibold">
                {user && user!.name}
              </h4>
              <h5 className="text-sm text-foreground/70 font-semibold">
                {user && user!.email}
              </h5>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] space-y-2">
          <div className="flex items-center gap-2">
            <User />
            Profile
          </div>
          <Separator />
          <Link to="/orders" className="flex items-center px-4 gap-2 bg-primary/5  hover:bg-primary/10 py-2  rounded-lg">
            <Truck />
            Orders List
          </Link>
          <Button onClick={handleLogout} className="w-full">
            Logout
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default Navprofile;
