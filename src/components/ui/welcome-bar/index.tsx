import { ModeToggle } from "@/components/mode-toggler";
import { LanguageSwitch } from "../language-toggler";

function WelcomeBar() {
  return (
    <main className="bg-gray-100 py-2 px-5 md-px-0">
      <nav className="max-w-6xl mx-auto flex items-center justify-between">
        <p className="capitalize text-gray-700 font-thin">
          Welcome <span className="hidden md:inline-block">to worldwide Mega Mark!</span>
        </p>
        <div className="flex items-center">
          <div className="px-5 border-r-2">
            <ModeToggle />
          </div>
          <div className="px-5">
            <LanguageSwitch />
          </div>
        </div>
      </nav>
    </main>
  );
}

export default WelcomeBar;
