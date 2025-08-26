import { decryptAES } from "@/utils/decrypt";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "../store/index.store";
import { LoginForm } from "../ui/components/login-form";

function LoginPage() {
  const [searhParams] = useSearchParams();
  const { login } = useAuthStore((state) => state);
  const navigate = useNavigate();

  const decryptToken = searhParams.get("token")?.trim();

  useEffect(() => {
    if (decryptToken) {
      const decodedUri = decodeURIComponent(decryptToken);
      const data = decryptAES(decodedUri);

      if (data.isSuccess) {
        toast.success("Login Successfully");
        login({
          user: data.data.user,
          token: data.token,
        });
        navigate("/");
      }
    }
  }, [decryptToken, navigate, login]);
  return (
    <section className="w-screen h-screen flex">
      <div className="w-[60%] h-full hidden lg:block">
        <img
          className="w-full h-full object-cover"
          alt="Login Image"
          src="./login_image.jpg"
        />
      </div>
      <div className="flex-1">
        <LoginForm />
      </div>
    </section>
  );
}

export default LoginPage;
