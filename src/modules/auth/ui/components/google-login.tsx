import { Button } from "@/components/ui/button";
export default function GoogleLogin() {

  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  }
  return (
    <Button type="button" onClick={handleLogin} className="w-full py-6 bg-secondary text-foreground">
      <img className="w-[20px] h-[20px]" src="./google.png" alt="google" />
      or Sign in with Google
    </Button>
  );
}
