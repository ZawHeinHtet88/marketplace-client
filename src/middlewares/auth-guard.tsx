import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const AuthGuard = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string>();
  const isLogin = true;

  useEffect(
    function () {
      setUser("zaw");
      console.log(user);
      
    },
    [isLogin]
  );

  return isLogin ? children : <Navigate to={"/login"} />;
};
