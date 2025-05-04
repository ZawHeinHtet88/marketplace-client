import { Banners } from "../ui/components/banners";
import LocalItems from "../ui/components/local-items";

export const WelcomePage = () => {
  return (
    <section className="space-y-20 mt-10">
      <Banners />
      <LocalItems/>
    </section>
  );
};
