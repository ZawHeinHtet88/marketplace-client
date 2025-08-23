import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuthStore } from "@/modules/auth/store/index.store";
import { Home, LogOut, Menu, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";

export function AppSidebar() {
  const isMobile = useIsMobile();
  const {logout} = useAuthStore(state=>state)

  const handleLogout = () => {
    // Add your logout logic here (e.g., clear tokens, call API)
    logout();
  };

  if (!isMobile) return null;

  return (
    <Sidebar className="block md:hidden">
      <SidebarHeader>
        <div className="text-lg font-bold px-4 py-2">Menu</div>
      </SidebarHeader>
      <SidebarContent>
        <nav className="flex flex-col gap-4 px-4 py-2">
          <Link to="/" className="flex items-center gap-2">
            <Home className="w-5 h-5" /> Home
          </Link>
          <Link to="/products" className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" /> Products
          </Link>
          <Link to="/merchants" className="flex items-center gap-2">
            <User className="w-5 h-5" /> Merchants
          </Link>
          <Link to="/orders" className="flex items-center gap-2">
            <Menu className="w-5 h-5" /> Orders
          </Link>
          <Link to="/profile" className="flex items-center gap-2">
            <User className="w-5 h-5" /> Profile
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-left px-0 py-0 bg-transparent border-none outline-none text-red-500"
          >
            <LogOut className="w-5 h-5" /> Logout
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
