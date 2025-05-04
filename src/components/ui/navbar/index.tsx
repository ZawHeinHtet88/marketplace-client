import { SidebarTrigger } from "../sidebar";
import Links from "./links";
import Logo from "./logo";
import NavSearch from "./search";

export const Navbar = () => {
  return (
    <main className="border-b-2">
      <nav className="px-5 md:px-0 max-w-6xl mx-auto py-3 md:py-5">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="md:flex items-center gap-3 hidden">
            <NavSearch />
            <Links />
          </div>
          <div className="block md:hidden">
            <SidebarTrigger/>
          </div>
        </div>
      </nav>
    </main>
  );
};
