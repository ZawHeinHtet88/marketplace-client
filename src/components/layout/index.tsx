import { Outlet } from "react-router-dom";
import { Navbar } from "../ui/navbar";
import WelcomeBar from "../ui/welcome-bar";
import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "../ui/sidebar/index";

export const Layout = () => {
  return (
    <main>
      <WelcomeBar />
      <SidebarProvider>
        <AppSidebar/>
        <Navbar />
      </SidebarProvider>
      <section className="w-full lg:max-w-7xl mx-auto px-5 lg:px-0">
        <Outlet />
      </section>
    </main>
  );
};
