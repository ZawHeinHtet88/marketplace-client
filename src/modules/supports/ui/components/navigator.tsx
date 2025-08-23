import { EarIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function SupportNavigator() {
  return (
    <Link to={"/supports"}>
      <div className="z-50 fixed bottom-16 right-5 w-[50px] h-[50px] rounded-full bg-primary flex items-center justify-center text-white">
        <EarIcon className="dark:text-neutral-950"/>
      </div>
    </Link>
  );
}
