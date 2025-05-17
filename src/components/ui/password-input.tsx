import React from "react";
import { Input } from "./input";
import { EyeClosedIcon, EyeIcon, RotateCcw } from "lucide-react";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  random?: boolean;
  onValueChange?: (value: string) => void;
}

const PasswordInput = ({
  random = false,
  onValueChange,
  ...rest
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const ref = React.useRef<HTMLInputElement | null>(null);

  function generateRandomPassword() {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const password = Array.from(
      { length: 12 },
      () => charset[Math.floor(Math.random() * charset.length)],
    ).join("");
    return password;
  }

  const handleRandomize = React.useCallback(() => {
    const newPassword = generateRandomPassword();
    onValueChange?.(newPassword);
  }, [onValueChange]);

  return (
    <div className="relative">
      <Input
      
        {...rest}
        ref={ref}
        value={rest.value}
      
        onChange={(e) => {
          onValueChange?.(e.target.value);
          rest.onChange?.(e);
        }}
        placeholder="********"
        type={showPassword ? "text" : "password"}
        className="pr-10 bg-gray-200 py-5 text-foreground"
      />

      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
      >
        {showPassword ? (
          <EyeClosedIcon className="h-4 w-4" />
        ) : (
          <EyeIcon className="h-4 w-4" />
        )}
      </button>

      {random && (
        <button
          type="button"
          onClick={handleRandomize}
          className="absolute inset-y-0 right-8 flex cursor-pointer items-center pr-3"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default PasswordInput;
