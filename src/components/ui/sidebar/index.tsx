import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuthStore } from "@/modules/auth/store/index.store";
import { Home, LogOut, Menu, ShoppingCart, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import NavSearch from "../navbar/search";
import Logo from "../navbar/logo";

export function AppSidebar() {
  const isMobile = useIsMobile();
  const { logout } = useAuthStore((state) => state);
  const { setOpen,toggleSidebar } = useSidebar();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    setOpen(false); // ✅ close sidebar after logout
  };

  if (!isMobile) return null;

  return (
    <Sidebar className="block md:hidden bg-gradient-to-b from-background to-muted border-r shadow-lg">
      {/* --- HEADER --- */}
      <SidebarHeader className="border-b px-4 py-3">
        <Logo/>
      </SidebarHeader>

      {/* --- CONTENT --- */}
      <SidebarContent>
        <nav className="flex flex-col gap-4 px-4 py-4">
          {/* --- Search --- */}
          <div className="bg-card rounded-xl shadow-sm p-2">
            <NavSearch />
            {/* ✅ close when selecting search result */}
          </div>

          {/* --- Links --- */}
          <div className="flex flex-col gap-2 pt-2">
            <Link
              to="/"
              onClick={() => toggleSidebar()} // ✅ close sidebar
              className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent hover:text-accent-foreground transition"
            >
              <Home className="w-5 h-5" /> {t("home")}
            </Link>
            <Link
              to="/products"
              onClick={() => toggleSidebar()}
              className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent hover:text-accent-foreground transition"
            >
              <ShoppingCart className="w-5 h-5" /> {t("products")}
            </Link>
            <Link
              to="/merchants"
              onClick={() => toggleSidebar()}
              className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent hover:text-accent-foreground transition"
            >
              <User className="w-5 h-5" /> {t("merchants")}
            </Link>
            <Link
              to="/orders"
              onClick={() => toggleSidebar()}
              className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent hover:text-accent-foreground transition"
            >
              <Menu className="w-5 h-5" /> {t("order")}
            </Link>
            <Link
              to="/profile"
              onClick={() => toggleSidebar()}
              className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent hover:text-accent-foreground transition"
            >
              <User className="w-5 h-5" /> {t("profile")}
            </Link>
          </div>

          {/* --- Logout --- */}
          <button
            onClick={handleLogout}
            className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-red-500 hover:bg-red-100 hover:dark:bg-red-900/40 transition"
          >
            <LogOut className="w-5 h-5" /> {t("logout")}
          </button>
        </nav>
      </SidebarContent>

      {/* --- FOOTER --- */}
      <SidebarFooter className="border-t px-4 py-3 text-sm text-muted-foreground">
        © 2025 Marketplace
      </SidebarFooter>
    </Sidebar>
  );
}
