import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useProtectedRoutes = (isLogged: boolean, isPrivate: boolean) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged && isPrivate === false) {
      navigate("/dashboard");
    } else if (isLogged === false && isPrivate) {
      navigate("/");
    }
  }, [isLogged, isPrivate, navigate]);
};
