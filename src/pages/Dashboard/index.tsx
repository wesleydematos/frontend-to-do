import { useContext } from "react";
import { MdLogout } from "react-icons/md";

import { UserContext } from "../../contexts/userContext";
import { useProtectedRoutes } from "../../hooks/useProtectedRoutes";
import { DashboardMain } from "../../components/DashboardMain";
import { ModalDeleteTask } from "../../components/Modals/ModalDeleteTask";
import { ModalCreateTask } from "../../components/Modals/ModalCreateTask";
import { ModalEditTask } from "../../components/Modals/ModalEditTask";

export const Dashboard = () => {
  const { isLogged, Logout } = useContext(UserContext);
  useProtectedRoutes(isLogged, true);

  return (
    <div className="bg-gray-300 min-h-screen relative">
      <div className="bg-dashboard bg-cover min-h-screen w-full fixed opacity-10 shadow-[0_100px_100px_#070516]" />
      <div className="bg-transparent border-b-[3px] border-white border-opacity-50 w-full z-10">
        <div className="max-w-7xl m-auto px-4 py-5 flex items-center justify-center box-border">
          <p className="text-white text-2xl">GERENCIE SUAS TAREFAS</p>
        </div>
      </div>

      <DashboardMain />

      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition-all"
        onClick={() => Logout()}
      >
        <MdLogout size={24} />
      </button>

      <ModalCreateTask />
      <ModalEditTask />
      <ModalDeleteTask />
    </div>
  );
};
