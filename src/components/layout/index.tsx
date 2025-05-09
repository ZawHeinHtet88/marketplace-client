import { Outlet } from "react-router-dom";
import { Navbar } from "../ui/navbar";
import WelcomeBar from "../ui/welcome-bar";
import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "../ui/sidebar/index";
import { Footer } from "../ui/footer";

export const Layout = () => {
  return (
    <main className="bg-background">
      <WelcomeBar />
      <SidebarProvider>
        <AppSidebar/>
        <Navbar />
      </SidebarProvider>
      <section className="w-full lg:max-w-7xl mx-auto px-5 lg:px-0">
        <Outlet />
      </section>
      <Footer/>
    </main>
  );
};
