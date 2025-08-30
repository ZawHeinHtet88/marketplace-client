import { SignupForm } from "../ui/components/signup-form";

export default function SignupPage() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-cyan-100 via-purple-100 to-blue-100 animate-gradient-shift">
      <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-cyan-400/30 to-purple-400/30 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/30 to-blue-400/30 rounded-full blur-3xl animate-float-delayed"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse-slow"></div>

      <SignupForm />
    </div>
  );
}
