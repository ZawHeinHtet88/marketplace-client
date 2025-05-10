import { SidebarTrigger } from "../sidebar";
import Links from "./links";
import Logo from "./logo";
import NavSearch from "./search";

export const Navbar = () => {
  return (
    <main className="border-b-2 border-b-foreground bg-background">
      <nav className="px-5 lg:px-0 w-full lg:max-w-7xl mx-auto py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="lg:flex items-center gap-3 hidden">
            <NavSearch />
            <Links />
          </div>
          <div className="block lg:hidden">
            <SidebarTrigger/>
          </div>
        </div>
      </nav>
    </main>
  );
};
