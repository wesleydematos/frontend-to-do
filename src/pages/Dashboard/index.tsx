import { useContext } from "react";
import { MdLogout } from "react-icons/md";

import { UserContext } from "../../contexts/userContext";
import { useProtectedRoutes } from "../../hooks/useProtectedRoutes";

export const Dashboard = () => {
  const { isLogged, Logout } = useContext(UserContext);
  useProtectedRoutes(isLogged, true);

  return (
    <div className="bg-gray-300 h-screen relative">
      <div className="bg-dashboard bg-cover h-screen w-full absolute opacity-10 shadow-[0_100px_100px_#070516]" />

      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition-all"
        onClick={() => Logout()}
      >
        <MdLogout size={24} />
      </button>
    </div>
  );
};
