import { Search } from "lucide-react";
import { Input } from "../input";

function NavSearch() {
  return (
    <div className="relative w-[500px] max-w-sm bg-red-50 dark:bg-background rounded-xl hidden md:block">
      <Search className="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2  text-primary" />
      <Input
        type="search"
        placeholder="Search essentials,groceris and more..."
        className="pl-15 py-5"
      />
    </div>
  );
}

export default NavSearch;
