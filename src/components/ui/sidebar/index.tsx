import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuthStore } from "@/modules/auth/store/index.store";
import { Home, LogOut, Menu, ShoppingCart, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function AppSidebar() {
  const isMobile = useIsMobile();
  const {logout} = useAuthStore(state=>state)
  const {t} = useTranslation()

  const handleLogout = () => {
    // Add your logout logic here (e.g., clear tokens, call API)
    logout();
  };

  if (!isMobile) return null;

  return (
    <Sidebar className="block md:hidden">
      <SidebarHeader>
        <div className="text-lg font-bold px-4 py-2">{t("menu")}</div>
      </SidebarHeader>
      <SidebarContent>
        <nav className="flex flex-col gap-4 px-4 py-2">
          <Link to="/" className="flex items-center gap-2">
            <Home className="w-5 h-5" /> {t("home")}
          </Link>
          <Link to="/products" className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" /> {t("products")}
          </Link>
          <Link to="/merchants" className="flex items-center gap-2">
            <User className="w-5 h-5" /> {t("merchants")}
          </Link>
          <Link to="/orders" className="flex items-center gap-2">
            <Menu className="w-5 h-5" /> {t("order")}
          </Link>
          <Link to="/profile" className="flex items-center gap-2">
            <User className="w-5 h-5" /> {t("profile")}
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-left px-0 py-0 bg-transparent border-none outline-none text-red-500"
          >
            <LogOut className="w-5 h-5" /> {t("logout")}
          </button>
        </nav>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-4 py-2 text-sm text-gray-500">
          © 2025 Marketplace
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
