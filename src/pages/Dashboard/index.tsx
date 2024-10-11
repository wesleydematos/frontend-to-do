import { useContext } from "react";

import { UserContext } from "../../contexts/userContext";
import { useProtectedRoutes } from "../../hooks/useProtectedRoutes";

export const Dashboard = () => {
  const { isLogged } = useContext(UserContext);
  useProtectedRoutes(isLogged, true);

  return <div>Home</div>;
};
