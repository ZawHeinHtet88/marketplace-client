import SupportNavigator from "@/modules/supports/ui/components/navigator";
import { Outlet } from "react-router-dom";
import { Footer } from "../ui/footer";
import { Navbar } from "../ui/navbar";
import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "../ui/sidebar/index";
import WelcomeBar from "../ui/welcome-bar";

export const Layout = () => {
  return (
    <main className="bg-background">
      <WelcomeBar />
      <SidebarProvider>
        <AppSidebar />
        <Navbar />
      </SidebarProvider>
      <section className="w-full lg:max-w-7xl mx-auto px-5 lg:px-0">
        <Outlet />
        <SupportNavigator/>
      </section>
      <Footer />
    </main>
  );
};
